const db = require('./db');
const helper = require('../helper');
const config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const configClave = require('../config/config.json')[env]


async function getFavoritos(usuario){

  try{
    const rows = await db.query(
      `select distinct R.idReceta as IdReceta, R.idUsuario as IdUsuario, usr.nickname as alias, 
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as foto, R.porciones as Porciones, 
      R.cantidadPersonas as CantidadPersonas, R.idTipo as IdTipo, t.descripcion as DescTipo, TRUNCATE(avg(C.calificacion),1) as CalificacionProm,RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada
      from favoritos f
      join recetas R on R.idreceta = f.idreceta
      join Calificaciones C on C.IdReceta=R.IdReceta
      join recetasAdicional RA on RA.IdReceta=R.IdReceta
      join usuarios usr on usr.idUsuario = R.idUsuario
      join Tipos t on t.idTipo=R.idTipo
      where f.idusuario =${usuario.idUsuario}
      group by  R.idReceta, R.idUsuario, R.nombre,R.descripcion , R.foto , R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion, RA.fecAlta, RA.SnAutorizada`
    );
    const data = helper.emptyOrRows(rows);
    
    return {code: 201, favorito:data};

  }catch(e){

    return {code: 400, message: e.message};
  }
  

}

async function isFavorito(usuario){

  try{
    const rows = await db.query(
      `select 1
      from favoritos f
      where f.idusuario =${usuario.idUsuario}
      and f.idReceta =${usuario.idReceta}`
    );
    const data = helper.emptyOrRows(rows);

    if (data.length==0){
      return {code: 202, favorito:2};
    }
    
    return {code: 201, favorito:1};

  }catch(e){

    return {code: 400, favorito: e.message};
  }
  

}




async function cargarFavorito(favorito){

  try{
    const rows = await db.query(
      `insert into favoritos
      (idReceta,idUsuario)
      VALUES
      (${favorito.idReceta},${favorito.idUsuario});`
    );

    let message = 'Error al guardar en favorito';
    
      if (rows.affectedRows) {
        message = 'Favorito guardado correctamente';
      }
    
      return {code: 201, message:message};

  }catch(e){
    return {code: 400, message:e.message};
  }
  
}

async function eliminarFavorito(favorito){

  try{
    const rows = await db.query(
      `delete from favoritos 
      where idUsuario =${favorito.idUsuario}
      and idReceta =${favorito.idReceta} `
    );

   let message = 'Error al eliminar el favorito';
    
    if (rows.affectedRows) {
      message = 'Favorito eliminado correctamente';
      
    }
    return {code: 201, message:message};
    
  }catch(e){

    return {code: 400, message: e.message};
  }
  

}


module.exports = {
  getFavoritos,
  cargarFavorito,
  eliminarFavorito,
  isFavorito
}