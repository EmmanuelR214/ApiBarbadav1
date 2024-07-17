import { z } from "zod";

export const LoginSchema = z.object({
  param: z.string()
    .refine(data => data.trim() !== '', {
      message: 'El correo o Telefono es requerido',
    })
    .refine(data => data.length >= 10 && data.length <= 90, {
      message: 'El correo o Telefono debe ser entre de al menos 10 caracteres',
    }),
    password: z.string()
    .refine(data => data.trim() !== '', {
      message: 'La contraseña es requerida',
    })
    .refine(data => data.length >= 8, {
      message: 'La contraseña debe tener al menos 8 caracteres',
    })
    .refine(data => /[A-Z]/.test(data), {
      message: 'La contraseña debe contener al menos una letra mayúscula',
    })
    .refine(data => /[a-z]/.test(data), {
      message: 'La contraseña debe contener al menos una letra minúscula',
    })
    .refine(data => /\d/.test(data), {
      message: 'La contraseña debe contener al menos un número',
    })
    .refine(data => /[!@#$%^&*]/.test(data), {
      message: 'La contraseña debe contener al menos uno de los siguientes caracteres especiales: !, @, #, $, %, ^, &, *',
    }),
})

export const SearchPhoneSchema = z.object({
  telefono: z.string()
    .refine(data => data.trim() !== '', {
      message: 'El Telefono es requerido',
    })
    .refine(data => data.length === 10, {
      message: 'El Telefono debe ser de 10 digitos',
    })
    .refine(data => /\d/.test(data), {
      message: 'El Telefono debe contener solo números',
    }),
})

export const SendMail = z.object({
  mail: z.string()
    .refine(data => data.trim() !== '', {
      message: 'El correo es requerido',
    })
    .refine(data => data.length >= 10 && data.length <= 90, {
      message: 'El correo debe contener al menos 10 caracteres',
    })
    .refine(data => /\S+@\S+\.\S+/.test(data), {
      message: 'El correo debe ser valido',
    }),
})

export const RegisterSchema = z.object({
  uid: z.string()
    .refine(data => data.trim() !== '', {
      message: 'El Id es requerido',
    }),
  correo: z.string()
    .refine(data => data.trim() !== '', {
      message: 'El correo es requerido',
    })
    .refine(data => data.length >= 10 && data.length <= 90, {
      message: 'El correo debe contener al menos 10 caracteres',
    })
    .refine(data => /\S+@\S+\.\S+/.test(data), {
      message: 'El correo debe ser valido',
    }),
  telefono: z.string()
    .refine(data => data.trim() !== '', {
      message: 'El Telefono es requerido',
    })
    .refine(data => data.length === 10, {
      message: 'El Telefono debe ser de 10 digitos',
    })
    .refine(data => /\d/.test(data), {
      message: 'El Telefono debe contener solo números',
    }),
  password: z.string()
    .refine(data => data.trim() !== '', {
      message: 'La contraseña es requerida',
    })
    .refine(data => data.length >= 8, {
      message: 'La contraseña debe tener al menos 8 caracteres',
    })
    .refine(data => /[A-Z]/.test(data), {
      message: 'La contraseña debe contener al menos una letra mayúscula',
    })
    .refine(data => /[a-z]/.test(data), {
      message: 'La contraseña debe contener al menos una letra minúscula',
    })
    .refine(data => /\d/.test(data), {
      message: 'La contraseña debe contener al menos un número',
    })
    .refine(data => /[!@#$%^&*]/.test(data), {
      message: 'La contraseña debe contener al menos uno de los siguientes caracteres especiales: !, @, #, $, %, ^, &, *',
    })
})

export const RecoverPasswordSchema = z.object({
  email: z.string()
    .refine(data => data.trim() !== '', {
      message: 'El correo es requerido',
    })
    .refine(data => data.length >= 10 && data.length <= 90, {
      message: 'El correo debe contener al menos 10 caracteres',
    })
    .refine(data => /\S+@\S+\.\S+/.test(data), {
      message: 'El correo debe ser valido',
    }), 
  password: z.string()
    .refine(data => data.trim() !== '', {
      message: 'La contraseña es requerida',
    })
    .refine(data => data.length >= 8, {
      message: 'La contraseña debe tener al menos 8 caracteres',
    })
    .refine(data => /[A-Z]/.test(data), {
      message: 'La contraseña debe contener al menos una letra mayúscula',
    })
    .refine(data => /[a-z]/.test(data), {
      message: 'La contraseña debe contener al menos una letra minúscula',
    })
    .refine(data => /\d/.test(data), {
      message: 'La contraseña debe contener al menos un número',
    })
    .refine(data => /[!@#$%^&*]/.test(data), {
      message: 'La contraseña debe contener al menos uno de los siguientes caracteres especiales: !, @, #, $, %, ^, &, *',
    })
  
})