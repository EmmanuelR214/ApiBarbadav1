import {Router} from 'express'
import {validateSchema} from '../middlewares/validator.middleware.js'
import { LoginSchema, RegisterSchema, SendMail, SearchPhoneSchema, RecoverPasswordSchema } from '../schemas/auth.schema.js'
import { AlertUser, InsertarDireccion, LoginUser, RecoverPasswordEmail, RegisterFirebase, RegisterUser, SearchNumberPhoneRegister, sendEmail, TraerDireccionUser, verifYToken } from '../controllers/user.controllers.js'
import {  ActualizarDatosUsuario, EliminarCuenta, EliminarDireccion, TraerPublicidad, userProfile } from '../controllers/datauser.controllers.js'

const router = Router()

//Login 
router.post('/login', validateSchema(LoginSchema), LoginUser)

router.post('/facegoo', RegisterFirebase)

router.post('/register', validateSchema(RegisterSchema), RegisterUser)

router.post('/recoverPass', validateSchema(RecoverPasswordSchema), RecoverPasswordEmail)

router.post('/searchPhone', validateSchema(SearchPhoneSchema), SearchNumberPhoneRegister)

router.post('/sendCodeEmail', validateSchema(SendMail), sendEmail)

router.get('/verify', verifYToken)

router.get('/alert', AlertUser)

router.get('/direcciones/:idUser', TraerDireccionUser)

router.post('/insertarDireccion', InsertarDireccion)

router.get('/publicidad', TraerPublicidad)

router.get('/data-user/:id', userProfile)

router.post('/actualizar-datos-usuario', ActualizarDatosUsuario)

router.get('/delete-user/:id', EliminarCuenta)

router.get('/eliminar-direccion/:id', EliminarDireccion)

export default router