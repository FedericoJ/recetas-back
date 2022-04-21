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

router.post('/create', async function(req, res, next) {
    try {
      res.json(await usuario.create(req.body));
    } catch (err) {
      console.error(`Error creando un usuario`, err.message);
      next(err);
    }
  });

  
  router.post('/crearInvitado', async function(req, res, next) {
    try {
      res.json(await usuario.crearInvitado(req.body));
    } catch (err) {
      console.error(`Error creando un usuario invitado`, err.message);
      next(err);
    }
  });


  router.get('/login', async function(req, res, next) {
    try {

      const result= await usuario.loginUser(req.body)  
      
      res.status(result.code).json({result});

    } catch (err) {
      console.error(`Error creando un usuario`, err.message);
      next(err);
    }
  });

  router.get('/SendRecoveryPassword', async function(req, res, next) {
    try {

      const result= await mailSender.sendEmailToRecoveryPass(req.body);  
      
      res.status(result.code).json({result});

    } catch (err) {
      console.error(`Error creando un usuario`, err.message);
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

module.exports = router;