const express = require('express');
const router = express.Router();
const receta = require('../services/receta');


/* GET programming languages. */
router.get('/recetaPorUsuario', async function(req, res, next) {
  try {
    const result = await receta.getRecetaPorUsuario(req.body);
    res.status(result.code).json({result});
  } catch (err) {
    console.error(`Error obteniendo recetas por usuarios `, err.message);
    next(err);
  }
});

router.get('/recetaPorIngrediente', async function(req, res, next) {
  try {
    const result = await receta.getRecetaPorIngrediente(req.body);

    res.status(result.code).json({result});

  } catch (err) {
    console.error(`Error obteniendo recetas por ingrediente`, err.message);
    next(err);
  }
});

router.get('/recetaSinIngrediente', async function(req, res, next) {
  try {
    const result = await receta.getRecetaSinIngrediente(req.body);
    res.status(result.code).json({result});
  } catch (err) {
    console.error(`Error obteniendo recetas sin un ingrediente especifico`, err.message);
    next(err);
  }
});

router.get('/recetaPorTipo', async function(req, res, next) {
  try {
    const result = await receta.getRecetaPorTipo(req.body);
    res.status(result.code).json({result});
  } catch (err) {
    console.error(`Error obteniendo las recetas por tipo`, err.message);
    next(err);
  }
});

router.post('/valorarReceta', async function(req, res, next) {
  try {
    res.json(await receta.valorarReceta(req.body));
  } catch (err) {
    console.error(`Error valorando receta`, err.message);
    next(err);
  }
});

router.get('/getValoracionesByReceta', async function(req, res, next) {
  try {
    const result = await receta.getValoracionesByReceta(req.body);
    res.status(result.code).json({result});
  } catch (err) {
    console.error(`Error obteniendo las valoraciones y comentarios de la receta`, err.message);
    next(err);
  }
});

router.get('/getValoracionPromedio', async function(req, res, next) {
  try {
    const result = await receta.getValoracionPromedio(req.body);
    res.status(result.code).json({result});
  } catch (err) {
    console.error(`Error obteniendo las valoraciones promedio`, err.message);
    next(err);
  }
});

module.exports = router;