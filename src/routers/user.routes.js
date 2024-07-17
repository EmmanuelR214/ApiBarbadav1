import {Router} from 'express'
import {validateSchema} from '../middlewares/validator.middleware.js'
import { LoginSchema, RegisterSchema, SendMail, SearchPhoneSchema, RecoverPasswordSchema } from '../schemas/auth.schema.js'
import { AlertUser, LoginUser, RecoverPasswordEmail, RegisterFirebase, RegisterUser, SearchNumberPhoneRegister, sendEmail, verifYToken } from '../controllers/user.controllers.js'

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


export default router