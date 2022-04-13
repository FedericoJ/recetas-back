const db = require('./db');
const helper = require('../helper');
const config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const configClave = require('../config/config.json')[env]

console.log(configClave.SECRET);

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM usuarios LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}



async function create(usuario){

    var hashedPassword = bcrypt.hashSync(usuario.password, 8);

    const result = await db.query(
      `INSERT INTO usuarios 
      (mail,nickname,habilitado,nombre,avatar,tipo_usuario,fecAlta,diasAlta,password) 
      VALUES 
      (${usuario.mail}, ${usuario.nickname}, ${usuario.habilitado}, ${usuario.nombre},
         ${usuario.avatar},${usuario.tipo_usuario},${usuario.fecAlta},${usuario.diasAlta},${hashedPassword})`
    );

  
    let message = 'Error creando un usuario';
  
    if (result.affectedRows) {
      message = 'Usuario creado correctamente';
    }
  
    return {message};
  }

  async function buscarUsuario(mail){

    
    const rows = await db.query(
      `SELECT * FROM usuarios
      WHERE mail='${mail}'`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }


  }


  async function loginUser (usuario ) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        

        let data = await buscarUsuario(usuario.mail);
        
        if ((data.empty)){
            return {code: 202, message: "Invalid username or password"};
        }

       
        user = data.data[0];


        let passwordIsValid = bcrypt.compareSync(usuario.password,user.password );

        if (!passwordIsValid)  return {code: 203, message: "Invalid username or password"}


        var token = jwt.sign({
            id: user.idUsuario
        },configClave.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        return {code: 201, token:token, usuario:data};

    } catch (e) {
        // return a Error message describing the reason     
        return {code: 400, message: e.message};
    }

  }






module.exports = {
  getMultiple,
  create,
  loginUser
}