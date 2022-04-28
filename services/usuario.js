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

  try{

      var hashedPassword = bcrypt.hashSync(usuario.password, 8);


      const result = await db.query(
        `INSERT INTO usuarios 
        (mail,nickname,habilitado,nombre,avatar,tipo_usuario) 
        VALUES 
        ('${usuario.mail}', '${usuario.nickname}', '${usuario.habilitado}', '${usuario.nombre}',
          '${usuario.avatar}','${usuario.tipo_usuario}');`
      );

      
      db.query(
        `INSERT INTO login (idUsuario,diasAlta,fecAlta,password)
      VALUES((select max(IdUsuario) from usuarios),'${usuario.diasAlta}','${usuario.fecAlta}','${hashedPassword}');`
      );

    
      let message = 'Error creando un usuario';
    
      if (result.affectedRows) {
        message = 'Usuario creado correctamente';
      }
    
      return {code: 201, message:message};


  }catch(e){
    return {code: 400, message:e.message};

  }

}


  async function crearInvitado(usuario){

      try{
        
        const result = await db.query(
          `INSERT INTO usuarios 
          (mail,nickname,habilitado,tipo_usuario,fecAlta,diasAlta) 
          VALUES 
          ('${usuario.mail}', '${usuario.nickname}', 'No',
          '${usuario.tipo_usuario}','${usuario.fecAlta}',${usuario.diasAlta})`
        );

      
        let message = 'Error creando un invitado';
      
        if (result.affectedRows) {
          message = 'Usuario Invitado creado correctamente';
        }
      
        return {code: 201, message:message};


      }catch(e){
        return {code: 400, message:e.message};

      }
    
  }


  async function buscarUsuarioByMail(mail){

    
    const rows = await db.query(
      `SELECT * FROM usuarios,login
      WHERE usuarios.idUsuario=login.idUsuario
      AND mail='${mail}'`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }


  }

  async function buscarUsuarioByAlias(alias){

    
    const rows = await db.query(
      `SELECT mail, nickname,idUsuario FROM usuarios
      WHERE nickname='${alias}'`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }


  }

  async function updateUser (usuario ) {

    var hashedPassword = bcrypt.hashSync(usuario.password, 8);
    var message='';

    try {
        // Find the User by Alias
        
        let data = await buscarUsuarioByAlias(usuario.nickname);
        
        if ((data.data.length ===0)){
          
            return {code: 202, message: "No se encuentra usuario con ese alias"};
        }

        console.log(data);
       
        user = data.data[0];


        const result = await db.query(
           `UPDATE usuarios SET
              habilitado='Si',
              nombre='${usuario.nombre}',
              avatar='${usuario.avatar}',
              password='${hashedPassword}'
          WHERE idUsuario='${user.idUsuario}'`
      );
        

      if (result.affectedRows) {
        message = 'Usuario modificado correctamente';
      }
      return{code:201,message:message}

    } catch (e) {
        // return a Error message describing the reason     
        return {code: 400, message: e.message};
    }

  }



  async function loginUser (usuario ) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        

        let data = await buscarUsuarioByMail(usuario.mail);
        
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


  async function crearCodigoVerificacion(usuario){

    try{
      
      const result = await db.query(
        `INSERT INTO usuarios 
        (mail,nickname,habilitado,tipo_usuario,fecAlta,diasAlta) 
        VALUES 
        ('${usuario.mail}', '${usuario.nickname}', 'No',
        '${usuario.tipo_usuario}','${usuario.fecAlta}',${usuario.diasAlta})`
      );

    
      let message = 'Error creando un invitado';
    
      if (result.affectedRows) {
        message = 'Usuario Invitado creado correctamente';
      }
    
      return {code: 201, message:message};


    }catch(e){
      return {code: 400, message:e.message};

    }
  
}




module.exports = {
  getMultiple,
  create,
  loginUser,
  updateUser,
  crearInvitado
}