"use strict";
const nodemailer = require("nodemailer");


module.exports = {

  async sendEmailToRecoveryPass(email, token) {

        let linkRecuperador =Math.round(Math.random()*999999);//`http://localhost:3000/recoverypassword/?token=${token}&mail=${email}`

        console.log(linkRecuperador);

        try{

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                secure: false, // use SSL
                port: 25,
                auth: {
                user: 'apigrupo9@gmail.com',
                pass: 'uade2021'
                },
                tls: {
                rejectUnauthorized: false
                } 
            });
        
            let info = await transporter.sendMail({
                from: '"Recetas" <apigrupo9@gmail.com>', // sender address
                to: email,
                subject: "Recuperar Contraseña ✔", // Subject line
                text: "Recuperar Contraseña", // plain text body
                html: `<b>Usted ha solicitado recuperar su contraseña, por favor ingrese el siguiente codigo ${linkRecuperador}</b>`, // html body
            });

            //Agregar Insert del codigo enviado

        }catch(e){

            return {code: 404, message: e.message};


        }

    
    }

} 