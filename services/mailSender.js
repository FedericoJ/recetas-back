"use strict";
const nodemailer = require("nodemailer");
const usuario = require('../services/usuario');


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
            
            const result = await usuario.crearCodigoVerificacion(linkRecuperador,email);

            if (result.code != 201){

                return {code: 404, message: {result}};

            } 



            return {code: 200, message: 'Mail de recuperación enviado'}; 

        }catch(e){
            console.log(e.message);
            return {code: 404, message: e.message};


        }

    
    },
    
    async sendEmailToCompleteRegistration(email) {

        try{

            let linkRecuperador =Math.round(Math.random()*999999);//`http://localhost:3000/recoverypassword/?token=${token}&mail=${email}`


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

            let info = await transporter.sendMail({
                from: '"Recetas" <recetapp1@gmail.com>', // sender address
                to: email,
                subject: "Complete su Login ✔", // Subject line
                text: "Completar Login", // plain text body
                //MRV (08/05): El link lo tiene que llevar a la pagina "Finalizar creacion Usuario"
                html: `<b>Usted se ha registrado en la App, por favor haga click en el siguinte link para finalizar su registración: ${linkRecuperador}</b>`, // html body
            });

            //Agregar Insert del codigo enviado

            if (result.code != 201){

                return {code: 404, message: {result}};

            } 

            return {code: 200, message: 'Mail de recuperación enviado'}; 

        }catch(e){

            return {code: 404, message: e.message};


        }

    
    }

} 