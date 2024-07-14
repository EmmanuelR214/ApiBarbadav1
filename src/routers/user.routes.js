import {Router} from 'express'
import {validateSchema} from '../middlewares/validator.middleware.js'
import { LoginSchema } from '../schemas/auth.schema.js'
import { AlertUser, LoginUser, verifYToken } from '../controllers/user.controllers.js'

const router = Router()

//Login 
router.post('/login', validateSchema(LoginSchema), LoginUser)

router.get('/verify', verifYToken)

router.get('/alert', AlertUser)


export default router