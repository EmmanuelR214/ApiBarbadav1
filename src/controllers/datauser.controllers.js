import { Coonexion } from "../db"

export const TraerDireccionUser = async(req, res) =>{
  try {
      const id = req.params.idUser
      const [[result]] = await Coonexion.execute('CALL ObtenerDirecciones(?)', [id])
      const [result2] = await Coonexion.execute('SELECT ad.id_apodo, ad.apodo_direccion, i.url_icono FROM apodos_direcciones ad INNER JOIN iconos i ON ad.id_icono = i.id_icono')
      res.status(200).json([result, result2])
  } catch (error) {
      console.log(error)
      res.status(500).json(['Error al traer direcciones'])
  }
}

export const InsertarDireccion = async(req, res) => {
  try {
      const {direccion, descripcion, id_usuario, id_apodo } = req.body
      await Coonexion.execute('CALL InsertarDireccion(?, ?, ?, ?)', [direccion, descripcion, id_usuario, id_apodo])
      res.status(200).json(['Dirección agregada'])
  } catch (error) {
      console.log(error)
      res.status(500).json(['Error al insertar la dirección'])
  }
}