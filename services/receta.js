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
      VALUES((select max(idReceta) from recetas),'${receta.fecAlta}', 'N');`
      );
    }
  
    return {code: 201, message:message};


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
      join Calificaciones C on C.IdReceta=R.IdReceta
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
      from recetas R, recetasAdicional RA, usuarios usr, tipos t, calificaciones C
      where R.idReceta=RA.idReceta
      and usr.idUsuario = R.idUsuario
      and t.idTipo=R.idTipo
      and C.IdReceta=R.IdReceta
      and UPPER(usr.nickname) like UPPER('%${receta.nombre}%')
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
      `select R.IdReceta, R.IdUsuario, R.nombre, R.Descripcion, R.foto, R.porciones, R.CantidadPersonas,
        R.IdTipo, T.descripcion as DescripcionTipo, RA.FecAlta, RA.SnAutorizada, avg (C.calificacion)
      from recetas R
      join recetasadicional RA on RA.IdReceta=R.IdReceta
      join Tipos T on T.IdTipo=R.IdTIpo
      join Calificaciones C on C.IdReceta=R.IdReceta
      where r.idreceta='${receta.idReceta}'`
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

  var order;

  if (receta.order ==="Abc") order = " order by R.nombre"
  
  if(receta.order ==="User") order =" order by usr.nickname"

  if(receta.order =="Date") order =" order by RA.fecAlta"

  try {

    const rows = await db.query(

      `select distinct R.idReceta as IdReceta, R.idUsuario as IdUsuario, U.nickname as alias, 
      R.nombre as Nombre, R.descripcion as Descripcion, R.foto as foto, R.porciones as Porciones, 
      R.cantidadPersonas as CantidadPersonas, R.idTipo as IdTipo, t.descripcion as DescTipo, TRUNCATE(avg(C.calificacion),1) as CalificacionProm,RA.fecAlta as FecAlta, RA.SnAutorizada as SnAutorizada      
      from recetas R, usuarios U, recetasadicional RA, tipos T,calificaciones C
      where R.IdReceta=RA.IdReceta and
      R.IdUsuario=U.IdUsuario and
      T.IdTipo=R.IdTipo and
      R.idReceta=RA.idReceta and
      R.idReceta = C.idReceta
      and UPPER(R.nombre)  like UPPER('%${receta.nombre}%') and RA.snAutorizada ='S'
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

      await db.query(`delete from utilizados
        where idReceta =${idReceta}`);

      await db.query(`delete from multimedia
      where multimedia.idPaso in (select P.idPaso from pasos P where P.idPaso=multimedia.idPaso and P.idReceta=${idReceta})`);

      await db.query(`delete from pasos 
        where idReceta =${idReceta}`);

      await db.query(`delete from calificaciones 
        where idReceta =${idReceta}`);

      await db.query(`delete from favoritos 
        where idReceta =${idReceta}`);

      await db.query(`delete from fotos 
        where idReceta =${idReceta}`);

      await db.query(`delete from recetasAdicional 
        where idReceta =${idReceta}`);

      const rows=await db.query(`delete from recetas 
        where idReceta =${idReceta}`);


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
        from recetas R, recetasAdicional RA, usuarios usr, tipos t, calificaciones C
            where R.idReceta=RA.idReceta
            and usr.idUsuario = R.idUsuario
            and t.idTipo=R.idTipo
            and C.IdReceta=R.IdReceta
            and exists (select 1 from Utilizados U, Ingredientes I
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
        from recetas R, recetasAdicional RA, usuarios usr, tipos t, Calificaciones C 
            where R.idReceta=RA.idReceta
            and usr.idUsuario = R.idUsuario
            and t.idTipo=R.idTipo
            and C.IdReceta=R.IdReceta
            and not exists (select 1 from Utilizados U, Ingredientes I
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
      from recetas R, recetasAdicional RA, tipos T , usuarios usr,calificaciones C
      where R.idReceta=RA.idReceta
      and R.idTipo=T.idTipo
      and R.idReceta = C.idReceta
      and usr.idUsuario=R.idUsuario
      and T.idTipo =${receta.nombre} and RA.snAutorizada ='S'
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
      from recetas R, recetasAdicional RA, tipos T , usuarios usr,calificaciones C
      where R.idReceta=RA.idReceta
      and R.idTipo=T.idTipo
      and R.idReceta = C.idReceta
      and usr.idUsuario=R.idUsuario
      and UPPER(T.descripcion) like UPPER('%${receta.nombre}%') and RA.snAutorizada ='S'
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

      paso.forEach(async paso => {
      
         const  result = await db.query(
            `insert into pasos (idReceta,nroPaso,texto) 
            VALUES 
            (${paso.idReceta}, '${paso.nroPaso}', '${paso.texto}')`
        );

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
          where idReceta=${paso.idReceta}`
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