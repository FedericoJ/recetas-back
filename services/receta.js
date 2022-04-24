const db = require('./db');
const helper = require('../helper');
const config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const configClave = require('../config/config.json')[env]

console.log(configClave.SECRET);

async function getRecetaPorUsuario(receta){
  const rows = await db.query(
    `SELECT * FROM recetas
    WHERE idUsuario='${receta.idUsuario}'`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }

}

async function getRecetaPorIngrediente(receta){
  const rows = await db.query(
    `select R.idReceta, R.idUsuario, R.nombre, R.descripcion, R.foto, R.porciones, R.cantidadPersonas,
    R.idTipo, (select descripcion from tipos T where T.idTipo=R.idTipo) as descTipo, RA.fecAlta, RA.SnAutorizada
    from recetas R, utilizados U, ingredientes I, recetasAdicional RA
    where R.idReceta=U.idReceta and
    U.idIngrediente=I.idIngrediente and
    R.idReceta=RA.idReceta
    and I.idIngrediente='${receta.idIngrediente}'`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }

}

async function getRecetaSinIngrediente(receta){
  const rows = await db.query(
    `select R.idReceta, R.idUsuario, R.nombre, R.descripcion, R.foto, R.porciones, R.cantidadPersonas,
    R.idTipo, (select descripcion from tipos T where T.idTipo=R.idTipo) as descTipo, RA.fecAlta, RA.SnAutorizada
    from recetas R, utilizados U, ingredientes I, recetasAdicional RA
    where R.idReceta=U.idReceta and
    U.idIngrediente=I.idIngrediente and
    R.idReceta=RA.idReceta
    and I.idIngrediente<>'${receta.idIngrediente}'`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }

}

async function getRecetaPorTipo(receta){
  const rows = await db.query(
    `select R.idReceta, R.idUsuario, R.nombre, R.descripcion, R.foto, R.porciones, R.cantidadPersonas,
    R.idTipo, (select descripcion from tipos T where T.idTipo=R.idTipo) as descTipo, RA.fecAlta, RA.SnAutorizada
    from recetas R, recetasAdicional RA, tipos T
    where R.idReceta=RA.idReceta
    and R.idTipo=T.idTipo
    and T.idTipo='${receta.idTipo}'`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }

}


module.exports = {
  getRecetaPorUsuario,
  getRecetaPorIngrediente,
  getRecetaSinIngrediente,
  getRecetaPorTipo
}