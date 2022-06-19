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

      const result= await multimedia.getMultimedia(req.query)  
      
      res.status(result.code).json(result.multimedia);

    } catch (err) {
      console.error(`Error obteniendo multimedia`, err.message);
      next(err);
    }
  });

  router.get('/getTiposReceta', async function(req, res, next) {
    try {

      const result= await multimedia.getTiposreceta(req.body);  
      
      res.status(result.code).json(result.multimedia);

    } catch (err) {
      console.error(`Error obteniendo los tipos de receta`, err.message);
      next(err);
    }
  });

  router.get('/getIngredientes', async function(req, res, next) {
    try {

      const result= await multimedia.getIngredientes(req.body);  
      
      res.status(result.code).json({result});

    } catch (err) {
      console.error(`Error obteniendo los ingredientes`, err.message);
      next(err);
    }
  });

  router.post('/postIngredientes', async function(req, res, next) {
    try {

      const result= await multimedia.postIngredientes(req.body);  
      
      res.status(result.code).json({result});

    } catch (err) {
      console.error(`Error obteniendo los ingredientes`, err.message);
      next(err);
    }
  });

  router.get('/getFactorConversion', async function(req, res, next) {
    try {

      const result= await multimedia.getConversiones(req.query);  
      
      res.status(result.code).json(result.factorConversion);

    } catch (err) {
      console.error(`Error obteniendo los tipos de receta`, err.message);
      next(err);
    }
  });

  router.get('/getUnidades', async function(req, res, next) {
    try {

      const result= await multimedia.getUnidades();  
      
      res.status(result.code).json(result.unidades);

    } catch (err) {
      console.error(`Error obteniendo los tipos de receta`, err.message);
      next(err);
    }
  });

  // Utilizados
router.post('/postIngredienteUtilizadoPorReceta', async function(req, res, next) {
  try {
    res.json(await multimedia.postIngredienteUtilizadoPorReceta(req.body));
  } catch (err) {
    console.error(`Error creando el ingrediente utilizado.`, err.message);
    next(err);
  }
});

router.get('/getIngredienteUtilizadoPorReceta', async function(req, res, next) {
  try {

    const result= await multimedia.getIngredienteUtilizadoPorReceta(req.query);  
    
    res.status(result.code).json(result.ingredientes);

  } catch (err) {
    console.error(`Error obteniendo los ingredientes por receta`, err.message);
    next(err);
  }
});

  module.exports = router;