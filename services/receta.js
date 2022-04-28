const db = require('./db');
const helper = require('../helper');
const config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const configClave = require('../config/config.json')[env]


async function getRecetaPorUsuario(receta){

  try{
    const rows = await db.query(
      `select R.idReceta, R.idUsuario, usr.nickname as alias, R.nombre, R.descripcion, R.foto, R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion as descTipo, RA.fecAlta, RA.SnAutorizada
      FROM recetas r , tipos t , usuarios usr , recetasAdicional RA
      WHERE t.idTipo=r.idTipo 
      and usr.idUsuario=r.idUsuario 
      and R.idReceta=RA.idReceta
      and r.idUsuario='${receta.idUsuario}' and RA.snAutorizada ='S' `
    );
    const data = helper.emptyOrRows(rows);
    
    return {code: 201, receta:data};

  }catch(e){

    return {code: 400, message: e.message};
  }
  

}

async function valorarReceta(receta){

  try{
    const rows = await db.query(
      `insert into calificaciones 
      (idUsuario,idReceta,calificacion,comentarios)
      values
      (${receta.idUsuario},${receta.idReceta},${receta.calificacion},'${receta.comentarios}');`
    );

    let message = 'Error creando una valoracion';
    
      if (rows.affectedRows) {
        message = 'Valoracion creada correctamente';
      }
    
      return {code: 201, message:message};

  }catch(e){
    return {code: 400, message:e.message};
  }
  
}

async function getRecetaPorNombre(receta){

  try {

    const rows = await db.query(

      `select R.IdReceta as IdReceta, R.IdUsuario as IdUsuario, U.nickname as Alias, U.nombre as Nombre,
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as Foto, R.porciones as Porciones,
      R.cantidadPersonas as CantidadPersonas, RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada
      from recetas R, usuarios U, recetasadicional RA, tipos T
      where R.IdReceta=RA.IdReceta and
      R.IdUsuario=U.IdUsuario and
      T.IdTipo=R.IdTipo
      and UPPER(R.nombre)  like UPPER('% '${receta.nombre}' %') and RA.snAutorizada ='S'`
    );
    const data = helper.emptyOrRows(rows);

    return {code: 201, receta:data};

  }catch(e){
    return {code: 400, message: e.message};
  }
  

}

async function buscarRecetaPorUsuarioyNombre(nombre,idUsuario){

  try{
    const rows = await db.query(
      `select idReceta from recetas
      where UPPER(nombre) like  UPPER('%${nombre}%') and idUsuario = ${idUsuario}`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }  catch(e){
    return -1;
  }
 

}


async function eliminarReceta(receta){

  try{
    
    data = await buscarRecetaPorUsuarioyNombre(receta,idUsuario);


    idReceta =data.data[0].idReceta;


    const rowsDelete = await db.query(`delete from utilizados
      where idReceta =${idReceta}`)

      if (rowsDelete.affectedRows){

        const rows = await db.query(
          `delete from recetas 
          where idReceta =${idReceta}`
        
        );

        if (rows.affectedRows) {
          message = 'Receta eliminada correctamente';
        }


      }

    let message = 'Error al eliminar la receta';
    

    return {code: 201, message};

  }catch(e){

    return {code: 400, message: e.message};
  }
  

}





async function getRecetaPorIngrediente(receta){

  try {

    const rows = await db.query(

      `select R.idReceta as IdReceta, R.idUsuario as IdUsuario, usr.nickname as Alias, 
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as Foto, R.porciones as Porciones, 
      R.cantidadPersonas as CantidadPersonas, R.idTipo as IdTipo, t.descripcion as DescTipo, 
      RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada
        from recetas R, utilizados U, ingredientes I, recetasAdicional RA, usuarios usr, tipos t
            where R.idReceta=U.idReceta and
            U.idIngrediente=I.idIngrediente and
            R.idReceta=RA.idReceta
            and usr.idUsuario = R.idUsuario
            and t.idTipo=R.idTipo
            and UPPER(i.nombre)  like UPPER('% ${receta.idIngrediente} %') and RA.snAutorizada ='S'`
    );
    const data = helper.emptyOrRows(rows);

    return {code: 201, receta:data};

  }catch(e){
    return {code: 400, message: e.message};
  }
  

}

async function getRecetaSinIngrediente(receta){

  try{
    
    const rows = await db.query(
      `select R.idReceta as IdReceta, R.idUsuario as IdUsuario, usr.nickname as Alias, 
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as Foto, R.porciones as Porciones, 
      R.cantidadPersonas as CantidadPersonas, R.idTipo as IdTipo, t.descripcion as DescTipo, 
      RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada
        from recetas R, utilizados U, ingredientes I, recetasAdicional RA, usuarios usr, tipos t
            where R.idReceta=U.idReceta and
            U.idIngrediente=I.idIngrediente and
            R.idReceta=RA.idReceta
            and usr.idUsuario = R.idUsuario
            and t.idTipo=R.idTipo
            and UPPER(i.nombre)  not like UPPER('% ${receta.idIngrediente} %') and RA.snAutorizada ='S'`
    );
    const data = helper.emptyOrRows(rows);

    return {code: 201, receta:data};

  }catch(e){
    return {code: 400, message: e.message};
  }
  

}

async function getRecetaPorTipo(receta){
  try{

    const rows = await db.query(
      `select R.idReceta, R.idUsuario, usr.nickname as alias, R.nombre, R.descripcion, R.foto, R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion as descTipo, RA.fecAlta, RA.SnAutorizada
      from recetas R, recetasAdicional RA, tipos T , usuarios usr
      where R.idReceta=RA.idReceta
      and R.idTipo=T.idTipo
      and usr.idUsuario=R.idUsuario
      and UPPER(T.idTipo) like UPPER('%${receta.idTipo}%') and RA.snAutorizada ='S'`
    );
    const data = helper.emptyOrRows(rows);


    return {code: 201, receta:data};

  }catch(e){

    return {code: 400, message: e.message};

  }

}


async function getValoracionesByReceta(receta){

  try{
    const rows = await db.query(
      `select c.idUsuario , usr.nickname, c.comentarios , c.calificacion, c.idReceta
      from calificaciones c 
      inner join usuarios usr on usr.idUsuario = c.idUsuario
      where idReceta =${receta.idReceta}`
    );
    const data = helper.emptyOrRows(rows);
    
    return {code: 201, receta:data};

  }catch(e){

    return {code: 400, message: e.message};
  }
  

}

async function getValoracionPromedio(receta){

  try{
    const rows = await db.query(
      `select AVG(calificacion) from calificaciones where idReceta =${receta.idReceta}`
    );
    const data = helper.emptyOrRows(rows);
    
    return {code: 201, receta:data};

  }catch(e){

    return {code: 400, message: e.message};
  }
  

}

async function guardarFoto(receta) {


  try {
      const result = await db.query(
          `insert into fotos (idReceta,urlFoto,extension) 
          VALUES 
          (${receta.idReceta}, '${receta.url}', '${receta.extension}')`
      );


      let message = 'Error guardando los datos multimedia de la receta';

      if (result.affectedRows) {
          message = 'Multimedia guardada correctamente para : ';
      }

      return { code: 201, message: message }

  } catch (e) {

      return { code: 400, message: e.message };
  }

}


async function getFoto(receta) {


  try {
      // Find the User 

      const result = await db.query(
          `select idReceta,urlFoto,extension from fotos
          where idReceta=${receta.idReceta}`
      );

      const data = helper.emptyOrRows(result);

      return { code: 201, foto: data };

  } catch (e) {
      // return a Error message describing the reason     
      return { code: 400, message: e.message };
  }

}




module.exports = {
  getRecetaPorUsuario,
  getRecetaPorIngrediente,
  getRecetaSinIngrediente,
  getRecetaPorNombre,
  getRecetaPorTipo,
  valorarReceta,
  guardarFoto,
  getValoracionesByReceta,
  getValoracionPromedio,
  getFoto
}