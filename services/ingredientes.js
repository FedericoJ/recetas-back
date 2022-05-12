const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function guardarMultimedia(multimedia) {


    try {
        const result = await db.query(
            `insert into multimedia ( idPaso, tipo_contenido,extension, urlcontenido) 
            VALUES 
            (${multimedia.idPaso}, '${multimedia.tipo_contenido}', '${multimedia.extension}', '${multimedia.url}')`
        );


        let message = 'Error guardando los datos multimedia';

        if (result.affectedRows) {
            message = 'Multimedia guardada correctamente';
        }

        return { code: 201, message: message }

    } catch (e) {

        return { code: 400, message: e.message };
    }

}


async function getMultimedia(multimedia) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 

        const result = await db.query(
            `select tipo_contenido,urlContenido from multimedia
            where idPaso=${multimedia.idPaso}`
        );

        const data = helper.emptyOrRows(result);

        return { code: 201, multimedia: data };

    } catch (e) {
        // return a Error message describing the reason     
        return { code: 400, message: e.message };
    }

}

async function getIngredientes(multimedia) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 

        const result = await db.query(
            `select nombre from Ingredientes I
            where UPPER(I.nombre)=UPPER('${multimedia.descripcion}')`
        );

        const data = helper.emptyOrRows(result);

        return { code: 201, multimedia: data };

    } catch (e) {
        // return a Error message describing the reason     
        return { code: 400, message: e.message };
    }

}

async function postIngredientes(ingrediente) {


    try {
        const result = await db.query(
            `insert into ingredientes (nombre) 
            VALUES ('${ingrediente.nombre}')`
        );


        let message = 'Error creando el ingrediente';

        if (result.affectedRows) {
            message = 'Ingrediente creado correctamente';
        }

        return { code: 201, message: message }

    } catch (e) {

        return { code: 400, message: e.message };
    }

}

async function getIngredienteUtilizadoPorReceta(multimedia) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 

        const result = await db.query(
            `select I.nombre, U.cantidad, UNI.descripcion, UNI.IdUnidad, R.idReceta
            from Ingredientes I, Utilizados U, recetas R, unidades UNI
            where I.IdIngrediente=U.IdIngrediente
            and R.IdReceta=U.IdReceta
            and UNI.idUnidad=U.Idunidad
            and R.IdReceta=${multimedia.idReceta}`
        );

        const data = helper.emptyOrRows(result);

        return { code: 201, multimedia: data };

    } catch (e) {
        // return a Error message describing the reason     
        return { code: 400, message: e.message };
    }

}

async function postIngredienteUtilizadoPorReceta(utilizado) {


    try {
        const result = await db.query(
            `insert into utilizados (idReceta, idIngrediente, cantidad, idUnidad, Observaciones) 
            VALUES 
            (${utilizado.idReceta}, '${utilizado.idIngrediente}', '${utilizado.cantidad}',
            '${utilizado.idUnidad}','${utilizado.Observaciones}')`
        );
  
  
        let message = 'Error guardando el ingrediente utilizado';
  
        if (result.affectedRows) {
            message = 'Ingrediente utilizado guardado correctamente';
        }
  
        return { code: 201, message: message }
  
    } catch (e) {
  
        return { code: 400, message: e.message };
    }
  
  }


async function getTiposreceta() {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 

        const result = await db.query(
            `select idTipo,descripcion from tipos`
        );

        const data = helper.emptyOrRows(result);

        return { code: 201, multimedia: data };

    } catch (e) {
        // return a Error message describing the reason     
        return { code: 400, message: e.message };
    }

}

async function getConversiones(unidad) {

    try {


        const result = await db.query(
            `select ROUND(factorConversiones,3)as conversion from conversiones 
            where idUnidadOrigen= ${unidad.idOrigen} and idUnidadDestino=${unidad.idDestino};`
        );

        const data = helper.emptyOrRows(result);

        return { code: 201, factorConversion: data };

    } catch (e) {
        // return a Error message describing the reason     
        return { code: 400, message: e.message };
    }

}




module.exports = {
    guardarMultimedia,
    getIngredientes,
    getMultimedia,
    getTiposreceta,
    getConversiones,
    getIngredienteUtilizadoPorReceta,
    postIngredienteUtilizadoPorReceta,
    postIngredientes
}