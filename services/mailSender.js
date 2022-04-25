"use strict";
const nodemailer = require("nodemailer");


module.exports = {

  async sendEmailToRecoveryPass(email) {

        let linkRecuperador =Math.round(Math.random()*999999);//`http://localhost:3000/recoverypassword/?token=${token}&mail=${email}`

        console.log(linkRecuperador);

        try{

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                secure: false, // use SSL
                port: 25,
                auth: {
                user: 'recetapp1@gmail.com',
                pass: 'uade2021'
                },
                tls: {
                rejectUnauthorized: false
                } 
            });
            
            console.log('llegue hasta amigo');

            let info = await transporter.sendMail({
                from: '"Recetas" <recetapp1@gmail.com>', // sender address
                to: email,
                subject: "Recuperar Contraseña ✔", // Subject line
                text: "Recuperar Contraseña", // plain text body
                html: `<b>Usted ha solicitado recuperar su contraseña, por favor ingrese el siguiente codigo ${linkRecuperador}</b>`, // html body
            });

            //Agregar Insert del codigo enviado

            return {code: 200, message: 'Mail de recuperación enviado'}; 

        }catch(e){

            return {code: 404, message: e.message};


        }

    
    }

} 