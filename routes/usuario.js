const express = require('express');
const router = express.Router();
const usuario = require('../services/usuario');
const mailSender=require('../services/mailSender');


/* GET programming languages. */
router.get('/consultarUsuario', async function(req, res, next) {
  try {
    res.json(await usuario.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.get('/getUsuario', async function(req, res, next) {
  try {
    res.json(await usuario.getUsuario(req.body));
  } catch (err) {
    console.error(`Error al obtener el usuario`, err.message);
    next(err);
  }
});
router.get('/validarAlias', async function(req, res, next) {
  try {
    res.json(await usuario.recomendarAlias(req.body));
  } catch (err) {
    console.error(`Error al obtener alias`, err.message);
    next(err);
  }
});

router.get('/buscarUsuarioByMail', async function(req, res, next) {
  try {
    res.json(await usuario.buscarUsuarioByMail(req.body));
  } catch (err) {
    console.error(`Error al obtener el usuario`, err.message);
    next(err);
  }
});

router.post('/create', async function(req, res, next) {
    try {
      res.json(await usuario.create(req.body));
    } catch (err) {
      console.error(`Error creando un usuario`, err.message);
      next(err);
    }
  });

  router.post('/modificarPass', async function(req, res, next) {
    try {
      const result= await usuario.modificarPass(req.body);
      res.status(result.code).json({result});
      
    } catch (err) {
      console.error(`Error modificando la Pass`, err.message);
      next(err);
    }
  });

  router.post('/modificarUsuario', async function(req, res, next) {
    try {
      res.json(await usuario.postUsuario(req.body));
    } catch (err) {
      console.error(`Error actualizando al Usuario`, err.message);
      next(err);
    }
  });

  
  router.post('/crearInvitado', async function(req, res, next) {
    try {
      const result= await usuario.crearInvitado(req.body);
      res.status(result.code).json({result});
    } catch (err) {
      console.error(`Error creando un usuario invitado`, err.message);
      next(err);
    }
  });

  router.post('/crearInvitadoUpdate', async function(req, res, next) {
    try {
      const result= await usuario.crearInvitadoUpdate(req.body);
      res.status(result.code).json({result});
    } catch (err) {
      console.error(`Error actualizando información del usuario`, err.message);
      next(err);
    }
  });


  router.post('/login', async function(req, res, next) {
    try {

      const result= await usuario.loginUser(req.body)  
      
      res.status(result.code).json({result});

    } catch (err) {
      console.error(`Error creando un usuario`, err.message);
      next(err);
    }
  });

  router.post('/SendRecoveryPassword', async function(req, res, next) {
    try {

      let linkRecuperador =Math.round(Math.random()*999999);

      const result= await mailSender.sendEmailToRecoveryPass(req.body.mail,linkRecuperador);  
      
      if (result.code ==200){
       const  result2 = await usuario.crearCodigoVerificacion(linkRecuperador,req.body.mail);

       res.status(result2.code).json({result2});

      } else{

        res.status(result.code).json({result});
      }
      
      

    } catch (err) {
      console.error(`Error recuperando password `, err.message);
      next(err);
    }
  });

  router.get('/validarCodigoRecuperacion', async function(req, res, next) {
    try {

      const result= await usuario.consultarCodigoVigente(req.query);  
      
      res.status(result.code).json({result});

    } catch (err) {
      console.error(`Error validando codigo de recuperacion de usuario`, err.message);
      next(err);
    }
  });


  router.put('/modificarUsuario', async function(req, res, next) {
    try {

      const result= await usuario.updateUser(req.body)  
      
      res.status(result.code).json({result});

    } catch (err) {
      console.error(`Error modificando un usuario`, err.message);
      next(err);
    }
  });

  router.get('/helloWorld', async function (req, res, next) {
    try {
      res.status(201).json({message: 'Hola Mundo Heroku'});
    } catch (err) {
      console.error(`Error Hola Mundo`, err.message);
      next(err);
    }
  });

module.exports = router;