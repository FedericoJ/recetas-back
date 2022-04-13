const express = require('express');
const router = express.Router();
const usuario = require('../services/usuario');

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

  router.get('/login', async function(req, res, next) {
    try {

      const result= await usuario.loginUser(req.body)  
      
      res.status(result.code).json({result});

    } catch (err) {
      console.error(`Error creando un usuario`, err.message);
      next(err);
    }
  });

module.exports = router;