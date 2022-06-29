const db = require('./db');
const helper = require('../helper');
const config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const configClave = require('../config/config.json')[env]

async function postReceta(receta){

  try{

    const result = await db.query(
      `INSERT INTO recetas 
      (idUsuario,nombre,descripcion,foto,porciones,cantidadPersonas,idTipo) 
      VALUES 
      ('${receta.idUsuario}', '${receta.nombre}', '${receta.descripcion}', '${receta.foto}',
        '${receta.porciones}','${receta.cantidadPersonas}', '${receta.idTipo}');`
    );

  
    let message = 'Error creando la receta';
  
    if (result.affectedRows) {
      message = 'Receta creada correctamente';
      db.query(
        `INSERT INTO recetasadicional (idReceta,fecAlta,SnAutorizada)
      VALUES(${result.insertId},'${receta.fecAlta}', 'N');`
      );
    }
  
    return {code: 201, message:message, IdRecetaCreado:result.insertId};


}catch(e){
  return {code: 400, message:e.message};

}

}

async function getRecetasSemana(receta){

  try{
    const rows = await db.query(
      `select distinct R.idReceta as IdReceta, R.idUsuario as IdUsuario, usr.nickname as alias, 
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as foto, R.porciones as Porciones, 
      R.cantidadPersonas as CantidadPersonas, R.idTipo as IdTipo, t.descripcion as DescTipo, TRUNCATE(avg(C.calificacion),1) as CalificacionProm,RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada
      from recetas R
      left join Calificaciones C on C.IdReceta=R.IdReceta
      join recetasAdicional RA on RA.IdReceta=R.IdReceta
      join usuarios usr on usr.idUsuario = R.idUsuario
      join Tipos t on t.idTipo=R.idTipo
      where RA.SnAutorizada='S'
      group by  R.idReceta, R.idUsuario, R.nombre,R.descripcion , R.foto , R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion, RA.fecAlta, RA.SnAutorizada
      order by CalificacionProm desc
      limit 5`
    );
    const data = helper.emptyOrRows(rows);
    
    return {code: 201, receta:data};

  }catch(e){

    return {code: 400, message: e.message};
  }
  

}

async function getRecetaPorUsuario(receta){

  var order;

  if (receta.order ==="Abc") order = " order by R.nombre"
  
  if(receta.order ==="User") order =" order by usr.nickname"

  if(receta.order =="Date") order =" order by RA.fecAlta"

  try{
    const rows = await db.query(
      `select distinct R.idReceta as IdReceta, R.idUsuario as IdUsuario, usr.nickname as alias, 
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as foto, R.porciones as Porciones, 
      R.cantidadPersonas as CantidadPersonas, R.idTipo as IdTipo, t.descripcion as DescTipo, TRUNCATE(avg(C.calificacion),1) as CalificacionProm,RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada
      from recetas R
      join recetasAdicional RA on R.idReceta=RA.idReceta
      join usuarios usr on usr.idUsuario = R.idUsuario
      join tipos t on t.idTipo=R.idTipo
      left join calificaciones C on C.IdReceta=R.IdReceta
      where UPPER(usr.nickname) like UPPER('%${receta.nombre}%')
      group by  R.idReceta, R.idUsuario, R.nombre,R.descripcion , R.foto , R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion, RA.fecAlta, RA.SnAutorizada
      ${order}`

    );
    const data = helper.emptyOrRows(rows);
    
    return {code: 201, receta:data};

  }catch(e){

    return {code: 400, message: e.message};
  }
  

}

async function getRecetaPorId(receta){

  try{
    const rows = await db.query(
      `select distinct R.idReceta as IdReceta, R.idUsuario as IdUsuario, usr.nickname as alias, 
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as foto, R.porciones as Porciones, 
      R.cantidadPersonas as CantidadPersonas, R.idTipo as IdTipo, t.descripcion as DescTipo, TRUNCATE(avg(C.calificacion),1) as CalificacionProm,RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada,1 as numero 
      from recetas R 
      join recetasAdicional RA on R.idReceta=RA.idReceta
      join usuarios usr on usr.idUsuario = R.idUsuario
      join tipos t on t.idTipo=R.idTipo
      left join calificaciones C on C.IdReceta=R.IdReceta 
      where R.idreceta=${receta.idReceta}
      group by  R.idReceta, R.idUsuario, R.nombre,R.descripcion , R.foto , R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion, RA.fecAlta, RA.SnAutorizada,numero`
    );
    const data = helper.emptyOrRows(rows);
    
    return {code: 201, receta:data};

  }catch(e){

    return {code: 400, receta: e.message};
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

  var order;

  if (receta.order ==="Abc") order = " order by R.nombre"
  
  if(receta.order ==="User") order =" order by usr.nickname"

  if(receta.order =="Date") order =" order by RA.fecAlta"

  try {

    const rows = await db.query(

      `select distinct R.idReceta as IdReceta, R.idUsuario as IdUsuario, U.nickname as alias, 
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as foto, R.porciones as Porciones, 
      R.cantidadPersonas as CantidadPersonas, R.idTipo as IdTipo, t.descripcion as DescTipo, TRUNCATE(avg(C.calificacion),1) as CalificacionProm,RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada      
      from recetas R
      join usuarios U on R.IdUsuario=U.IdUsuario
      join recetasadicional RA on R.IdReceta=RA.IdReceta
      join tipos T on T.IdTipo=R.IdTipo
      left join calificaciones C on C.idReceta = R.idReceta
      where UPPER(R.nombre)  like UPPER('%${receta.nombre}%') and RA.snAutorizada ='S'
      group by  R.idReceta, R.idUsuario, R.nombre,R.descripcion , R.foto , R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion, RA.fecAlta, RA.SnAutorizada
      ${order}`
    );
    const data = helper.emptyOrRows(rows);

    return {code: 201, receta:data};

  }catch(e){
    return {code: 400, message: e.message};
  }
  

}

async function buscarRecetaPorUsuarioyNombre(receta){

  try{
    const rows = await db.query(
      `select idReceta from recetas
      where UPPER(nombre) like  UPPER('${receta.nombre}') and idUsuario = ('${receta.idUsuario}')`
    );
    const data = helper.emptyOrRows(rows);
  
    return {code: 201, receta:data};
    
  }  catch(e){
    return -1;
  }
 

}

async function buscarRecetaPorUsuarioyNombreParaEliminar(nombre,idUsuario){

  try{
    const rows = await db.query(
      `select idReceta from recetas
      where UPPER(nombre) like  UPPER('${nombre}') and idUsuario = ('${idUsuario}')`
    );
    const data = helper.emptyOrRows(rows);
  
    return data;
    
  }  catch(e){
    return -1;
  }
 

}


async function eliminarReceta(receta){

  try{
    
    data = await buscarRecetaPorUsuarioyNombreParaEliminar(receta.nombre,receta.idUsuario);
    console.log(data.length);
    if(data.length!=0){
      var idReceta =data[0].idReceta;

      let message = 'Error al eliminar la receta';

      var sql = "delete from utilizados where idReceta = ?; delete from multimedia where multimedia.idPaso in (select P.idPaso from pasos P where P.idPaso=multimedia.idPaso and P.idReceta=?); delete from pasos where idReceta = ?; delete from calificaciones where idReceta = ?;delete from favoritos where idReceta = ?; delete from fotos where idReceta = ?;delete from recetasAdicional where idReceta = ?;"

      await db.query3(sql, [idReceta,idReceta,idReceta,idReceta,idReceta,idReceta,idReceta]);

      const rows=await db.query(`delete from recetas where idReceta =${idReceta}`);


      if (rows.affectedRows) {
        message = 'La receta ha sido eliminada exitosamente';
      }
      return {code: 200, message};
    }
    return {code: 201, message:"No existe la receta a eliminar"};

  }catch(e){

    return {code: 400, message: e.message};
  }
  
}


async function getRecetaPorIngrediente(receta){

  var order;
  console.log(receta);

  if (receta.order ==="Abc") order = " order by R.nombre"
  
  if(receta.order ==="User") order =" order by usr.nickname"

  if(receta.order =="Date") order =" order by RA.fecAlta"

  try {

    const rows = await db.query(
      `select distinct R.idReceta as IdReceta, R.idUsuario as IdUsuario, usr.nickname as alias, 
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as foto, R.porciones as Porciones, 
      R.cantidadPersonas as CantidadPersonas, R.idTipo as IdTipo, t.descripcion as DescTipo, TRUNCATE(avg(C.calificacion),1) as CalificacionProm,RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada
        from recetas R 
        join recetasAdicional RA on R.idReceta=RA.idReceta
        join usuarios usr on usr.idUsuario = R.idUsuario
        join tipos t on t.idTipo=R.idTipo
        left join calificaciones C on C.IdReceta=R.IdReceta
            where exists (select 1 from Utilizados U, Ingredientes I
							where U.idReceta=R.IdReceta and U.idIngrediente=I.IdIngrediente
                            and UPPER(i.nombre) like UPPER('%${receta.nombre}%'))
      and RA.snAutorizada ='S'
      group by  R.idReceta, R.idUsuario, R.nombre,R.descripcion , R.foto , R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion, RA.fecAlta, RA.SnAutorizada
      ${order}`
    );
    const data = helper.emptyOrRows(rows);

    return {code: 201, receta:data};

  }catch(e){
    return {code: 400, message: e.message};
  }
  

}

async function getRecetaSinIngrediente(receta){
   var order;

    if (receta.order ==="Abc") order = " order by R.nombre";
  
    if(receta.order ==="User") order =" order by usr.nickname";

    if(receta.order =="Date") order =" order by RA.fecAlta";


  try{
    
    const rows = await db.query(
      `select distinct R.idReceta as IdReceta, R.idUsuario as IdUsuario, usr.nickname as alias, 
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as foto, R.porciones as Porciones, 
      R.cantidadPersonas as CantidadPersonas, R.idTipo as IdTipo, t.descripcion as DescTipo, TRUNCATE(avg(C.calificacion),1) as CalificacionProm,RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada
        from recetas R 
        join recetasAdicional RA on R.idReceta=RA.idReceta
        join usuarios usr on usr.idUsuario = R.idUsuario
        join tipos t on t.idTipo=R.idTipo
        left join calificaciones C on C.IdReceta=R.IdReceta
            where not exists (select 1 from Utilizados U, Ingredientes I
							where U.idReceta=R.IdReceta and U.idIngrediente=I.IdIngrediente
                            and UPPER(i.nombre) like UPPER('%${receta.nombre}%'))
      and RA.snAutorizada ='S'
      group by  R.idReceta, R.idUsuario, R.nombre,R.descripcion , R.foto , R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion, RA.fecAlta, RA.SnAutorizada
      ${order}`
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

      `select R.IdReceta, R.idUsuario, usr.nickname as alias, R.nombre as Nombre, R.descripcion as Descripcion, R.foto as foto, R.Porciones, R.CantidadPersonas,
      R.idTipo, t.descripcion as descTipo, RA.fecAlta, RA.SnAutorizada,TRUNCATE(avg(C.calificacion),1) as CalificacionProm
      from recetas R
      left join calificaciones C on C.idReceta = R.idReceta
      inner join recetasAdicional RA on R.idReceta=RA.idReceta
      inner join tipos T on R.idTipo=T.idTipo
      inner join usuarios usr on usr.idUsuario=R.idUsuario
      where T.idTipo = ${receta.nombre} and RA.snAutorizada ='S'
      group by  R.idReceta, R.idUsuario, R.nombre,R.descripcion , R.foto , R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion, RA.fecAlta, RA.SnAutorizada`
    );
    const data = helper.emptyOrRows(rows);


    return {code: 201, receta:data};

  }catch(e){

    return {code: 400, receta: e.message};

  }

}

async function getRecetaPorNombreTipo(receta){

  var order;

  if (receta.order ==="Abc") order = " order by R.nombre"
  
  if(receta.order ==="User") order =" order by usr.nickname"

  if(receta.order =="Date") order =" order by RA.fecAlta"
  try{

    const rows = await db.query(
      `select R.idReceta, R.idUsuario, usr.nickname as alias, R.nombre as Nombre, R.descripcion as Descripcion, R.foto as foto, R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion as descTipo, RA.fecAlta, RA.SnAutorizada,TRUNCATE(avg(C.calificacion),1) as CalificacionProm
      from recetas R
      join recetasAdicional RA on R.idReceta=RA.idReceta
      join tipos T on R.idTipo=T.idTipo
      join usuarios usr on usr.idUsuario=R.idUsuario
      left join calificaciones C on C.idReceta = R.idReceta
      where UPPER(T.descripcion) like UPPER('%${receta.nombre}%') and RA.snAutorizada ='S'
      group by  R.idReceta, R.idUsuario, R.nombre,R.descripcion , R.foto , R.porciones, R.cantidadPersonas,
      R.idTipo, t.descripcion, RA.fecAlta, RA.SnAutorizada
      ${order}`
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
      `select AVG(calificacion) as PromedioCalificacion from calificaciones where idReceta =${receta.idReceta}`
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
          message = 'Foto guardada correctamente';
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

// Pasos

async function postPaso(paso) {

  
  try {
    const IdRecetaM=paso.idreceta;//rec[0].IdReceta;

      paso.paso.forEach(async paso => {
      
         const  result = await db.query(
            `insert into pasos (idReceta,nroPaso,texto) 
            VALUES 
            (${IdRecetaM}, '${paso.nroPaso}', '${paso.texto}')`
        );
        
      if(paso.multimedia.length>0){
        paso.multimedia.forEach(async multimedia=> {
          const result2 = await db.query(
            `insert into multimedia ( idPaso, tipo_contenido,extension, urlcontenido) 
            VALUES 
            (${result.insertId}, '${multimedia.tipo_contenido}', '${multimedia.extension}', '${multimedia.urlContenido}')`);
          }
        )
      }

    });


    let message="paso guardado correctamente";


      return { code: 201, message: message }

  } catch (e) {

      return { code: 400, message: e.message };
  }

}


async function getPasos(paso) {


  try {
      // Find the User 

      const result = await db.query(
          `select idPaso, idReceta, nroPaso, texto from pasos
          where idReceta=${paso.idReceta}
          order by nroPaso`
      );

      const data = helper.emptyOrRows(result);

      return { code: 201, pasos: data };

  } catch (e) {
      // return a Error message describing the reason     
      return { code: 400, message: e.message };
  }

}



module.exports = {
  getRecetaPorUsuario,
  getRecetaPorId,
  getRecetaPorIngrediente,
  getRecetaSinIngrediente,
  getRecetaPorNombre,
  getRecetaPorTipo,
  getRecetaPorNombreTipo,
  valorarReceta,
  guardarFoto,
  getValoracionesByReceta,
  getValoracionPromedio,
  getFoto,
  postReceta,
  postPaso,
  getPasos,
  getRecetasSemana,
  buscarRecetaPorUsuarioyNombre,
  eliminarReceta
}