const express = require('express');
const router = express.Router();
const receta = require('../services/receta');


/* GET programming languages. */
router.get('/recetaPorUsuario', async function(req, res, next) {
  try {
    res.json(await receta.getRecetaPorUsuario(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.get('/recetaPorIngrediente', async function(req, res, next) {
  try {
    res.json(await receta.getRecetaPorIngrediente(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.get('/recetaSinIngrediente', async function(req, res, next) {
  try {
    res.json(await receta.getRecetaSinIngrediente(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.get('/recetaPorTipo', async function(req, res, next) {
  try {
    res.json(await receta.getRecetaPorTipo(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;