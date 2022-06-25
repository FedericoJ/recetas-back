const express = require('express');
const router = express.Router();
const receta = require('../services/receta');
const favorito =require('../services/favorito');

router.delete('/eliminarReceta', async function(req, res, next) {
  try {

    res.json(await receta.eliminarReceta(req.body));

  } catch (err) {
    console.error(`Error eliminando la receta.`, err.message);
    next(err);
  }
});

router.post('/postReceta', async function(req, res, next) {
  try {
    const result = await receta.postReceta(req.body);
    res.status(result.code).json({result});
  } catch (err) {
    console.error(`Error dando de alta la receta. `, err.message);
    next(err);
  }
});

router.get('/recetaPorUsuario', async function(req, res, next) {
  try {
    const result = await receta.getRecetaPorUsuario(req.query);
    res.status(result.code).json(result.receta);
  } catch (err) {
    console.error(`Error obteniendo recetas por usuarios `, err.message);
    next(err);
  }
});

router.get('/recetaPorId', async function(req, res, next) {
  try {
    const result = await receta.getRecetaPorId(req.body);
    res.status(result.code).json({result});
  } catch (err) {
    console.error(`Error obteniendo la receta `, err.message);
    next(err);
  }
});

router.get('/recetasSemana', async function(req, res, next) {
  try {
    const result = await receta.getRecetasSemana();
    res.status(result.code).json(result.receta);
  } catch (err) {
    console.error(`Error obteniendo las recetas destacadas de la semana`, err.message);
    next(err);
  }
});

router.get('/recetaPorNombre', async function(req, res, next) {
  try {
    const result = await receta.getRecetaPorNombre(req.query);
    res.status(result.code).json(result.receta);
  } catch (err) {
    console.error(`Error obteniendo receta por nombre `, err.message);
    next(err);
  }
});

router.get('/recetaPorIngrediente', async function(req, res, next) {
  try {
    const result = await receta.getRecetaPorIngrediente(req.query);

    res.status(result.code).json(result.receta);

  } catch (err) {
    console.error(`Error obteniendo recetas por ingrediente`, err.message);
    next(err);
  }
});

router.get('/recetaSinIngrediente', async function(req, res, next) {
  try {
    const result = await receta.getRecetaSinIngrediente(req.query);
    res.status(result.code).json(result.receta);
  } catch (err) {
    console.error(`Error obteniendo recetas sin un ingrediente especifico`, err.message);
    next(err);
  }
});

router.get('/recetaPorTipo', async function(req, res, next) {
  try {
    const result = await receta.getRecetaPorTipo(req.query);
    res.status(result.code).json(result.receta);
  } catch (err) {
    console.error(`Error obteniendo las recetas por tipo`, err.message);
    next(err);
  }
});

router.get('/recetaPorNombreTipo', async function(req, res, next) {
  try {
    const result = await receta.getRecetaPorNombreTipo(req.query);
    res.status(result.code).json(result.receta);
  } catch (err) {
    console.error(`Error obteniendo las recetas por tipo`, err.message);
    next(err);
  }
});

router.get('/buscarRecetaPorUsuarioyNombre', async function(req, res, next) {
  try {
    const result = await receta.buscarRecetaPorUsuarioyNombre(req.query);
    res.status(result.code).json(result.receta);
  } catch (err) {
    console.error(`Error obteniendo las recetas por usuario y nombre de receta`, err.message);
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
    const result = await receta.getValoracionesByReceta(req.query);
    res.status(result.code).json(result.receta);
  } catch (err) {
    console.error(`Error obteniendo las valoraciones y comentarios de la receta`, err.message);
    next(err);
  }
});

router.get('/getValoracionPromedio', async function(req, res, next) {
  try {
    const result = await receta.getValoracionPromedio(req.query);
    res.status(result.code).json({result});
  } catch (err) {
    console.error(`Error obteniendo las valoraciones promedio`, err.message);
    next(err);
  }
});

// Agrego sección de favoritos 

router.post('/cargarFavorito', async function(req, res, next) {
  try {
    res.json(await favorito.cargarFavorito(req.body));
  } catch (err) {
    console.error(`Error guardando una receta favorita`, err.message);
    next(err);
  }
});

router.get('/getFavorito', async function(req, res, next) {
  try {
    const result = await favorito.getFavoritos(req.query);
    res.status(result.code).json(result.favorito);
  } catch (err) {
    console.error(`Error obteniendo los favoritos por usuario`, err.message);
    next(err);
  }
});

router.get('/isFavorito', async function(req, res, next) {
  try {
    const result = await favorito.isFavorito(req.query);
    res.status(result.code).json(result.favorito);
  } catch (err) {
    console.error(`Error obteniendo los favoritos por usuario`, err.message);
    next(err);
  }
});

router.post('/eliminarFavorito', async function(req, res, next) {
  try {
    res.json(await favorito.eliminarFavorito(req.body));
  } catch (err) {
    console.error(`Error eliminando favorito`, err.message);
    next(err);
  }
});


// Seccion de Fotos

router.post('/guardarFoto', async function(req, res, next) {
  try {
    res.json(await receta.guardarFoto(req.body));
  } catch (err) {
    console.error(`Error valorando receta`, err.message);
    next(err);
  }
});

router.get('/getFoto', async function(req, res, next) {
  try {
    const result = await receta.getFoto(req.body);
    res.status(result.code).json({result});
  } catch (err) {
    console.error(`Error obteniendo los favoritos por usuario`, err.message);
    next(err);
  }
});

// Pasos
router.post('/postPaso', async function(req, res, next) {
  try {

    res.json(await receta.postPaso(req.body));

  } catch (err) {
    console.error(`Error creando el paso.`, err.message);
    next(err);
  }
});

router.get('/getPasos', async function(req, res, next) {
  try {
    const result = await receta.getPasos(req.query);
    res.status(result.code).json(result.pasos);
  } catch (err) {
    console.error(`Error obteniendo los pasos`, err.message);
    next(err);
  }
});


module.exports = router;