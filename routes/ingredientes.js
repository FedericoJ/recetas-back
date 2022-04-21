const express = require('express');
const router = express.Router();
const multimedia = require('../services/ingredientes');



router.post('/guardarMultimedia', async function(req, res, next) {
    try {
      res.json(await multimedia.guardarMultimedia(req.body));
    } catch (err) {
      console.error(`Error guardando los archivos multimedia del paso`, err.message);
      next(err);
    }
  });


  router.get('/getMultimedia', async function(req, res, next) {
    try {

      const result= await multimedia.getMultimedia(req.body)  
      
      res.status(result.code).json({result});

    } catch (err) {
      console.error(`Error obteniendo multimedia`, err.message);
      next(err);
    }
  });

  router.get('/getTiposReceta', async function(req, res, next) {
    try {

      const result= await multimedia.getTiposreceta();  
      
      res.status(result.code).json({result});

    } catch (err) {
      console.error(`Error obteniendo los tipos de receta`, err.message);
      next(err);
    }
  });

  module.exports = router;