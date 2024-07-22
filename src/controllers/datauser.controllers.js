import { Coonexion } from "../db.js"

export const TraerPublicidad = async(req, res) =>{
  try {
    const [[publicidad]] = await Coonexion.execute('CALL ObtenerPublicidad()')
    res.status(200).json(publicidad)
  } catch (error) {
    res.status(500).json(['Error al traer publicidad'])
  }
}