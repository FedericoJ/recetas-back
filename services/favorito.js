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
      `select avg(c.calificacion) as CalificacionPromedio, r.nombre as NombreReceta, 
        u.nickname as NickNameUsuarioReceta, c.idreceta as IdReceta, f.idfavorito as IdFavorito
      from favoritos f
      join calificaciones c on f.idreceta = c.idreceta
      join recetas r on f.idreceta = r.idreceta
      join usuarios u on r.idusuario = u.idusuario 
      where f.idusuario ='${usuario.idUsuario}'
      group by c.idreceta, r.nombre, u.nickname,f.idfavorito`
    );
    const data = helper.emptyOrRows(rows);
    
    return {code: 201, favorito:data};

  }catch(e){

    return {code: 400, message: e.message};
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

   let message = 'Error al guardar en favorito';
    
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
  eliminarFavorito
}