import { Coonexion } from "../db.js"

export const TraerPublicidad = async(req, res) =>{
  try {
    const [[publicidad]] = await Coonexion.execute('CALL ObtenerPublicidad()')
    res.status(200).json(publicidad)
  } catch (error) {
    res.status(500).json(['Error al traer publicidad'])
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
    await Coonexion.execute('UPDATE usuarios SET id_estado = 2 WHERE id_usuario = ?', [id])
    res.status(200).json(['Cuenta eliminada'])
  } catch (error) {
    res.status(500).json(['Error al eliminar la cuenta'])
  }
}