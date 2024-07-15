import { transporter } from "../libs/mailConfig.js";

export const verifyMail = async (email, codigoSecreto) => {
  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: '"Codigo de Verificación" <labarbada23@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Codigo de verificacion", // plain text body
        html: `
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verificación de Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: rgb(32, 31, 31);
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #101010;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                }
                .header img {
                    max-width: 100px;
                }
                .content {
                    text-align: center;
                    padding: 20px 0;
                    color: #aaaaaa;
                }
                .content h1 {
                    font-size: 24px;
                }
                .content p {
                    font-size: 16px;
                }
                .verification-code {
                    display: inline-block;
                    font-size: 24px;
                    color: #007bff;
                    background-color: #f6f6f6;
                    padding: 10px 20px;
                    letter-spacing: 5px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin: 20px 0;
                    font-size: 16px;
                    color: #ffffff;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    padding: 20px 0;
                    font-size: 14px;
                    color: #aaaaaa;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://labarbada.store/imagenes/emblema.png" alt="Logo">
                </div>
                <div class="content">
                    <h1>Verificación de Email</h1>
                    <p>Este código es válido por un solo intento, no compartas este código con nadie.</p>
                    <div class="verification-code">${codigoSecreto}</div>
                    <p>Si no solicitaste esta verificación, puedes ignorar este correo electrónico.</p>
                </div>
                <div class="footer">
                  <p>Si tienes alguna pregunta, no dudes en <a href="https://api.whatsapp.com/send?phone=7712451795" style="color: #E20714;" >contactarnos</a>.</p>
                  <p>&copy; 2024 La Barbada. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
        `, // html body
      },
      (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
          return err;
        } else {
          console.log(info);
          resolve(info);
          return info;
        }
      }
    );
  });
};

export const MessageMail = async (email) => {
    await new Promise((resolve, reject) => {
    transporter.sendMail(
        {
        from: `"La Barbada" <labarbada23@gmail.com>`, // sender address
        to: email, // list of receivers
        subject: `Hola de nuevo!`, // plain text body
        html: `
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: rgb(32, 31, 31);
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #101010;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                }
                .header img {
                    max-width: 100px;
                }
                .content {
                    text-align: center;
                    padding: 20px 0;
                    color: #aaaaaa;
                }
                .content h1 {
                    font-size: 24px;
                }
                .content p {
                    font-size: 16px;
                }
                .content a:hover{
                    background-color: #a70e18;
                    font-size: large;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin: 20px 0;
                    font-size: 16px;
                    color: #ffffff;
                    background-color: #E20714;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .image-section {
                    display: flex-columns;
                    justify-content: center;
                    padding: 20px 0;
                }
                .image-section img {
                    max-width: 100%;
                    margin: 10px;
                    border-radius: 10px;
                }
                .footer {
                    text-align: center;
                    padding: 20px 0;
                    font-size: 14px;
                    color: #aaaaaa;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://labarbada.store/imagenes/emblema.png" alt="Logo">
                </div>
                <div class="content">
                    <h1>Iniciaste sesion en La Barbada</h1>
                    <p>Hola de ${email}, estamos felices de tenerte de nuevo.</p>
                    <p>Descubre un mundo nuevo de sabores y mantente al tanto de las novedades.</p>
                    <a href="https://labarbada.store/" class="button">Explorar</a>
                </div>
                <div class="image-section">
                    <img src="https://labarbada.store/imagenes/IMG_5002-Editar.jpg" alt="Imagen 1">
                    <img src="https://labarbada.store/imagenes/IMG_4994-Editar.jpg" alt="Imagen 2">
                    <img src="https://labarbada.store/imagenes/IMG_5027.jpg" alt="Imagen 3">
                </div>
                <div class="footer">
                    <p>Si tienes alguna pregunta, no dudes en <a href="https://api.whatsapp.com/send?phone=7712451795" style="color: #E20714;" >contactarnos</a>.</p>
                    <p>&copy; 2024 La Barbada. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
        `, // html body
      },
      (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
          return err;
        } else {
          console.log(info);
          resolve(info);
          return info;
        }
      }
    );
  });
};

export const RegisterMail = async (email) => {
    await new Promise((resolve, reject) => {
    transporter.sendMail(
        {
        from: `"La Barbada" <labarbada23@gmail.com>`, // sender address
        to: email, // list of receivers
        subject: `Bienvenido abordo`, // plain text body
        html: `
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: rgb(32, 31, 31);
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #101010;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                }
                .header img {
                    max-width: 100px;
                }
                .content {
                    text-align: center;
                    padding: 20px 0;
                    color: #aaaaaa;
                }
                .content h1 {
                    font-size: 24px;
                }
                .content p {
                    font-size: 16px;
                }
                .content a:hover{
                    background-color: #a70e18;
                    font-size: large;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin: 20px 0;
                    font-size: 16px;
                    color: #ffffff;
                    background-color: #E20714;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .image-section {
                    display: flex-columns;
                    justify-content: center;
                    padding: 20px 0;
                }
                .image-section img {
                    max-width: 100%;
                    margin: 10px;
                    border-radius: 10px;
                }
                .footer {
                    text-align: center;
                    padding: 20px 0;
                    font-size: 14px;
                    color: #aaaaaa;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://labarbada.store/imagenes/emblema.png" alt="Logo">
                </div>
                <div class="content">
                    <h1>Bienvenido abordo</h1>
                    <p>Gracias por unirte a nosotros. Estamos emocionados de tenerte aquí.</p>
                    <p>Descubre un mundo nuevo de sabores y mantente al tanto de las novedades.</p>
                    <a href="https://labarbada.store/" class="button">Explorar</a>
                </div>
                <div class="image-section">
                    <img src="https://labarbada.store/imagenes/IMG_5002-Editar.jpg" alt="Imagen 1">
                    <img src="https://labarbada.store/imagenes/IMG_4994-Editar.jpg" alt="Imagen 2">
                    <img src="https://labarbada.store/imagenes/IMG_5027.jpg" alt="Imagen 3">
                </div>
                <div class="footer">
                    <p>Si tienes alguna pregunta, no dudes en <a href="https://api.whatsapp.com/send?phone=7712451795" style="color: #E20714;" >contactarnos</a>.</p>
                    <p>&copy; 2024 La Barbada. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
        `, // html body
      },
      (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
          return err;
        } else {
          console.log(info);
          resolve(info);
          return info;
        }
      }
    );
  });
};

export const AlertMail = async (email, direccion, fecha, ip) => {
  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: `"La Barbada alerta!" <labarbada23@gmail.com>`, // sender address
        to: email, // list of receivers
        subject: `se ha detectado un inicio de sesión sospechoso`, // plain text body
        html: `
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Alerta de Inicio de Sesión Sospechoso</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: rgb(32, 31, 31);
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #101010;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                }
                .header img {
                    max-width: 100px;
                }
                .content {
                    padding: 20px 0;
                    text-align: center;
                }
                .content h1 {
                    font-size: 24px;
                    color: #d9534f;
                }
                .content p {
                    font-size: 16px;
                    color: #aaaaaa;
                }
                .details {
                    background-color: rgb(32, 31, 31);
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 5px;
                    text-align: left;
                }
                .details p {
                    margin: 5px 0;
                    color: #aaaaaa;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin: 20px 0;
                    font-size: 16px;
                    color: #ffffff;
                    background-color: #d9534f;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    padding: 20px 0;
                    font-size: 14px;
                    color: #aaaaaa;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://labarbada.store/imagenes/emblema.png" alt="Logo">
                </div>
                <div class="content">
                    <h1>Alerta de Seguridad</h1>
                    <p>Hemos detectado un inicio de sesión sospechoso en tu cuenta. Si fuiste tú, puedes ignorar este mensaje. De lo contrario, te recomendamos que tomes medidas inmediatas para asegurar tu cuenta.</p>
                </div>
                <div class="details">
                    <p><strong>Detalles del inicio de sesión:</strong></p>
                    <p><strong>Ubicación:</strong> ${direccion}</p>
                    <p><strong>Fecha y Hora:</strong> ${fecha}</p>
                    <p><strong>Dirección IP:</strong> ${ip}</p>
                </div>
                <div class="content">
                    <a href="#" class="button">Asegurar mi Cuenta</a>
                </div>
                <div class="footer">
                    <p>Si tienes alguna pregunta, no dudes en <a href="https://api.whatsapp.com/send?phone=7712451795" style="color: #E20714;" >contactarnos</a>.</p>
                    <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
        `, // html body
      },
      (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
          return err;
        } else {
          console.log(info);
          resolve(info);
          return info;
        }
      }
    );
  });
};
