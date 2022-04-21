const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function guardarMultimedia(multimedia){

    
    try{
        const result = await db.query(
            `insert into multimedia ( idPaso, tipo_contenido,extension, urlcontenido) 
            VALUES 
            (${multimedia.idPaso}, '${multimedia.tipo_contenido}', '${multimedia.extension}', '${multimedia.url}')`
          );
      
        
          let message = 'Error guardando los datos multimedia';
        
          if (result.affectedRows) {
            message = 'Multimedia guardada correctamente para : ' ;
          }
        
          return{code:201,message:message}
        
    }catch(e){

        return {code: 400, message: e.message};
    }

} 


async function getMultimedia (multimedia ) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 

        const result = await db.query(
            `select tipo_contenido,urlContenido from multimedia
            where idPaso=${multimedia.idPaso}`
          );

        const data = helper.emptyOrRows(result);

        return {code: 201, multimedia: data};

    } catch (e) {
        // return a Error message describing the reason     
        return {code: 400, message: e.message};
    }

  }



  async function getTiposreceta ( ) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 

        const result = await db.query(
            `select idTipo,descripcion from tipos`
          );

        const data = helper.emptyOrRows(result);

        return {code: 201, multimedia:data};

    } catch (e) {
        // return a Error message describing the reason     
        return {code: 400, message: e.message};
    }

  }





  module.exports ={
    guardarMultimedia,
    getMultimedia,
    getTiposreceta
  }