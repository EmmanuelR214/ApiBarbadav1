import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET

export function CreateAccessToken (payload){
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: '180d',
      },
      (err, token) =>{
        if(err) reject(err)
        resolve(token)
      }
    )
  })
}