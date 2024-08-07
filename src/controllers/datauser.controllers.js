import { Coonexion } from "../db.js"

export const TraerPublicidad = async(req, res) =>{
  try {
    const [[publicidad]] = await Coonexion.execute('CALL ObtenerPublicidad()')
    res.status(200).json(publicidad)
  } catch (error) {
    res.status(500).json(['Error al traer publicidad'])
  }
}

export const userProfile = async(req, res) =>{
  try {
    const {id} = req.params
    const [result] = await Coonexion.execute('CALL ObtenerDireccionesYVentas(?)', [id])
    const direcciones = result[0];
    const ventas = result[1];
    console.log(direcciones, ventas)
    res.status(200).json([direcciones, ventas])
  } catch (error) {
    res.status(500).json(['Error al traer datos del usuario'])
  }
}

export const EliminarDireccion = async(req, res) => {
  try {
    const {id} = req.params
    await Coonexion.execute('UPDATE direcciones SET disponible = FALSE WHERE id_direccion = ?', [id]);
    res.status(200).json(['Dirección eliminada'])
  } catch (error) {
    console.log(error)
    res.status(500).json(['Error al eliminar la dirección'])
  }
}

export const ActualizarDatosUsuario = async(req, res) =>{
  try {
    const { id_usuario, correo, telefono } = req.body;
    await Coonexion.execute('UPDATE usuarios SET correo = ?, telefono = ? WHERE id_usuario = ?',[correo, telefono, id_usuario])
    res.status(200).json(['Información actualizada'])
  } catch (error) {
    res.status(500).json(['Error al actualizar la información'])
  }
}

export const EliminarCuenta = async(req, res) =>{
  try {
    const {id} = req.params
    console.log(id)
    await Coonexion.execute('UPDATE usuarios SET id_estado = 2 WHERE id_usuario = ?', [id])
    res.status(200).json(['Cuenta eliminada'])
  } catch (error) {
    console.log(error)
    res.status(500).json(['Error al eliminar la cuenta'])
  }
}