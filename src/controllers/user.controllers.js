import { Coonexion } from "../db.js";
import { v4 as uuidv4 } from "uuid";
import { CreateAccessToken } from "../libs/jwt.js";
import { AlertMail, MessageMail, verifyMail } from "../middlewares/authMail.js";
import { getLocationFromIP } from "../middlewares/LocationIp.js";
import requestIp  from 'request-ip'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const TokenSecret = process.env.TOKEN_SECRET


const hashData = async (data) => {
  try {
      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      const Encrypt = await bcrypt.hash(data, salt)
      return Encrypt
  } catch (error) {
      console.error('Error encriptar datos:', error)
      throw error 
  }
}

const compareData = async (data, hash) => {
  return await bcrypt.compare(data, hash)
}

export const verifYToken = async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]; 
    if (!token) return res.status(401).json(['No hay token']);
    jwt.verify(token, TokenSecret, async (err, user) => {
      if (err) return res.status(401).json(['token venido']);
      try {
        const [userFound] = await Coonexion.query('CALL obtenerUsuarioID(?)', [user.id]);
        if (!userFound || !userFound[0]) return res.status(401).json(['No en la base de datos']);
        const [dataUser] = userFound;
        return res.json({
          id: dataUser[0].id_usuario,
          rol: dataUser[0].roles,
          email: dataUser[0].correo
        });
      } catch (dbError) {
        console.log(dbError);
        return res.status(500).json(['Database Error']);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(['Server Error']);
  }
};


//Actualiza contraseña por correo
export const RecoverPasswordEmail = async(req, res) => {
  try {
      const {email, password, id} = req.body
      const ip = req.ip
      const pass = await hashData(password)
      console.log('chi')
      const [update] = await Coonexion.execute('CALL ActualizarPassword(?,?,?,?)',[pass, email, id, ip])
      
      if(update.affectedRows <= 0) return res.status(400).json(['No se pudo actualizar la contraseña'])
      
      const [[result]] = await Coonexion.execute('CALL ObtenerUsuarioCorreo(?)', [email])
      
      if(result.length > 0){
          const token = await CreateAccessToken({id: result[0].id_usuario})
          res.cookie('token', token)
          res.status(200).json([result[0]])
      }else{
          res.status(200).json(['si'])
      }
  } catch (error) {
      console.log(error)
      res.status(500).json(['Error al actualizar la contraseña'])
  }
}

//Enviar email de verificación
export const sendEmail = async(req, res) =>{
  try {
      const {mail} = req.body
      
      const [[result]] = await Coonexion.execute('CALL ObtenerUsuarioCorreo(?)',[mail])
      
      if(!result[0]) return res.status(400).json(['El correo no esta registrado'])
      
      let caracteres = '0123456789';
      let codigoSecreto = '';
      for (let i = 0; i < 6; i++) {
          codigoSecreto += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      
      await verifyMail(mail, codigoSecreto);
      
      res.status(200).json([codigoSecreto, result[0].id_usuario])
  } catch (error) {
      res.status(500).json(['Error al enviar el código'])
  }
} 

//Login de facebook y google
export const RegisterFirebase = async (req, res) =>{
  try {   
      const {uid, correo, telefono, message } =  req.body
      const ip = req.ip
      const tel = telefono ? telefono : ''
      const rol = 1
      const estado = 1
      const [[result]] = await Coonexion.execute('CALL ObtenerUsuarioID(?)',[uid])
      if(result.length > 0){
          let mensaje = `El usuario ${correo} inicio sésion con ${message}`
          await Coonexion.execute('RegistroBitacoraUsuario(?,?,?)', [uid, ip, mensaje ])
          const token = await CreateAccessToken({id: uid})
          res.cookie('token', token)
          res.status(200).json([result[0], 'login'])
          return
      }else{
          
          const [[repeaterMail]] = await Coonexion.execute('CALL ObtenerUsuarioCorreo(?)',[correo])
          if (repeaterMail.length > 0) return res.status(400).json(['El correo ya está en uso'])
          
          let mensaje = `Nuevo usuario registrado con ${message}`
          const pass = await  hashData(uid)
          await Coonexion.execute('CALL RegistroUsuario(?,?,?,?,?,?,?,?)',[uid, correo, tel, pass, estado, rol, ip, mensaje])
          const [[lookUser]] = await Coonexion.execute('CALL ObtenerUsuarioID(?)', [uid])
          const token = await CreateAccessToken({id: uid})
          res.cookie('token', token)
          res.status(200).json([lookUser, 'register'])
      }
  } catch (error) {
      console.error('Error al buscar usuario en la base de datos', error)
      res.status(500).json(['Error interno del servidor'])
  }
}

//login usuarios
export const LoginUser = async(req, res) => {
  try {
      const {param, password} = req.body
      const ip = req.ip
      
      const [[result]] = await Coonexion.execute('CALL LoginCliente(?)',[param])
      
      if(!result[0]) return res.status(400).json(['El usuario no existe'])
      
      const user = result[0]
      const PasswordValid = await compareData(password, user.passwordUs)
      
      if (!PasswordValid) return res.status(400).json( ["Contraseña incorrecta"] )
      
      const [[bitacora]] = await Coonexion.execute('CALL ObtenerBitacoraUsuario(?)',[user.id_usuario])
      
      const mensaje = ip === bitacora[0].direccion_ip ? `El usuario ${user.correo} inició sesión desde la misma plataforma` : `El usuario ${user.correo} inició sesión desde otro dispositivo`;
      
      await Coonexion.execute('CALL RegistroBitacoraUsuario(?,?,?)', [user.id_usuario, ip, mensaje ])
      
      await MessageMail(user.correo)
      
      
      const token = await CreateAccessToken({id: user.id_usuario})
      res.json({user, token})
      
  } catch (error) {
      console.log(error)
      res.status(500).json(['Error al intentar iniciar sesion'])
  }
}

//Registrar usuario nuevo
export const RegisterUser = async(req, res) =>{
  try {
      const {uid, correo, telefono, password} = req.body
      const ip = req.ip
      const rol = 1
      const estado = 1
      const newId = uid ? uid : uuidv4()
      let mensaje = `Nuevo usuario registrado`
      
      const [[repeaterMail]] = await Coonexion.execute('CALL ObtenerUsuarioCorreo(?)',[correo])
      if (repeaterMail.length > 0) return res.status(400).json(['El correo ya está en uso'])
      
      const pass = await hashData(password)
      await Coonexion.execute('CALL RegistroUsuario(?,?,?,?,?,?,?,?)',[newId, correo, telefono, pass, estado, rol, ip, mensaje])
      
      const [[[dataUser]]] = await Coonexion.execute('CALL obtenerUsuarioID(?)',[newId])
      
      const token = await CreateAccessToken({ id: newId })
      res.cookie('token', token)
      res.json({
          dataUser
      })
  } catch (error) {
      res.status(500).json(['Error al crear usuario'])
  }
}

//Buscar usuario por numero de telefono
export const SearchNumberPhoneRegister = async(req, res) =>{
  try {
      const {telefono} = req.body
      
      const [[result]] = await Coonexion.execute('CALL ObtenerUsuarioTelefono(?)',[telefono])
      if(result.length > 0) return res.status(400).json(['El número de teléfono ya esta registrado'])
      res.status(200).json(['El número esta disponible'])
  } catch (error) {
      res.status(500).json(['Error al buscar el télefono'])
  }
}

//Alerta 
export const AlertUser = async(req, res) =>{
  try {
      const {alertUser} = req.cookies
      const clientIp = requestIp.getClientIp(req)
      const locationData = await getLocationFromIP(clientIp)
      const currentDate = new Date()
      const options = {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric' 
      }
      const formatter = new Intl.DateTimeFormat('es-ES', options);
      const formattedDate = formatter.format(currentDate)
      
      const [[result]] = await Coonexion.execute('CALL LoginCliente(?)', [alertUser])

      console.log(result[0].correo, locationData, formattedDate, clientIp)
      if (result && result[0] && result[0].correo) {
        await AlertMail(result[0].correo, `${locationData.city} ${locationData.region}`, formattedDate, clientIp);
      }      
      
      let mensaje = `usuario ${result[0].correo} ha intentado iniciar sésion repetitivamente, la IP ${clientIp} se encuentra en la ubicación ${locationData.loc}`
      console.log(result[0].id_usuario) 
      await Coonexion.execute('CALL RegistroBitacoraUsuario(?,?,?)', [result[0].id_usuario, clientIp, mensaje ])
      res.status(200).json(['Informe'])
  } catch (error) {
      console.log(error)
      res.status(500).json(['Error al informar'])
  }
}