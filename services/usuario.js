const db = require('./db');
const helper = require('../helper');
const config = require('../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const configClave = require('../config/config.json')[env]
const mailSender=require('../services/mailSender');

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

async function modificarPass(usuario){

  try{

      var hashedPassword = bcrypt.hashSync(usuario.password, 8);


      const result = await db.query(
        `update login 
        set password='${hashedPassword}'
        where IdUsuario=(select IdUsuario from usuarios where mail='${usuario.mail}')`
      );
    
      let message = 'Error modificando la pass';
    
      if (result.affectedRows) {
        message = 'Password modificada correctamente';
      }
    
      return {code: 201, message:message};


  }catch(e){
    return {code: 400, message:e.message};

  }

}


  async function crearInvitado(usuario){

      try{
        let data = await buscarUsuarioByMailHabilitado(usuario.mail);
        if (data.data.length!=0){
            return {code: 202, message: "Mail already registered"};
        }

        let data2 = await buscarUsuarioByMailNoHabilitado(usuario.mail);
        if (data2.data.length!=0){
            return {code: 203, message: "Mail already registered but registration is not complete"};
        }

        const result = await db.query(
          `INSERT INTO usuarios 
          (mail, nickname, tipo_usuario, habilitado) 
          VALUES 
          ('${usuario.mail}', '${usuario.nickname}', 'Visitante', 'No')`
        );
        //MRV(08-05): Inserto password 1 porque no puede ser NULL
        await db.query(
          `INSERT INTO login (idUsuario,diasAlta,fecAlta,password)
          VALUES((select max(IdUsuario) from usuarios),'30',now(),1);`
        );

      
        let message = 'Error creando un invitado';
      
        if (result.affectedRows) {
          message = 'Usuario Invitado creado correctamente. Se enviará el mail!';
          await mailSender.sendEmailToCompleteRegistration(usuario.mail);
          //Aca tiene que enviar el mail
        }
      
        return {code: 201, message:message};


      }catch(e){
        return {code: 400, message:e.message};

      }
    
  }

  async function crearInvitadoUpdate(usuario){

    var hashedPassword = bcrypt.hashSync(usuario.password, 8);

    try{
      const result = await db.query(
        `update usuarios
        set nombre='${usuario.nombre}', habilitado='Si'
        where mail='${usuario.mail}'`
      );
      await db.query(
        `update login
        set password='${hashedPassword}'
        where idusuario=(select idusuario from usuarios where mail='${usuario.mail}')`
      );
    
      let message = 'Error creando un invitado';
    
      if (result.affectedRows) {
        message = 'Registración exitosa. Por favor logueese!';
        //Aca tiene que enviar el mail
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

  async function getUsuario(usuario){

    try {
  
      const rows = await db.query(
  
        `select S.IdUsuario, S.Mail, S.NickName, S.Habilitado, S.Nombre, S.Avatar, S.Tipo_Usuario, L.diasAlta, L.fecAlta
        from Usuarios S
        join login L on L.IdUsuario=S.IdUsuario
        where S.IdUsuario='${usuario.IdUsuario}'`
      );
      const data = helper.emptyOrRows(rows);
  
      return {code: 201, usuario:data};
  
    }catch(e){
      return {code: 400, message: e.message};
    }
    
  
  }


  async function postUsuario(usuario){

    try {
  
      const rows = await db.query(
  
        `update usuarios
        set Nombre='${usuario.nombre}', avatar=' ${usuario.avatar}'
        where IdUsuario='${usuario.IdUsuario}'`
      );
      const data = helper.emptyOrRows(rows);
  
      return {code: 201, usuario:data};
  
    }catch(e){
      return {code: 400, message: e.message};
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

  async function recomendarAlias(usuario){

    try{
      const rows = await db.query(
        `SELECT distinct 1 FROM usuarios
        WHERE nickname='${usuario.alias}'`
      );
      const data = helper.emptyOrRows(rows);
  
      if (data.length==0){
        return {code: 202, message:"No existe alias"};
      }     

      return {code: 201, usuario:data};

    }catch(e){
    return {code: 400, message: e.message};
    }
  }

  async function updateUser (usuario) {

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

  async function buscarUsuarioByMailHabilitado(mail){

    
    const rows = await db.query(
      `SELECT * FROM usuarios,login
      WHERE usuarios.idUsuario=login.idUsuario
      AND habilitado='Si'
      AND mail='${mail}'`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }


  }

  async function buscarUsuarioByMailNoHabilitado(mail){

    
    const rows = await db.query(
      `SELECT * FROM usuarios,login
      WHERE usuarios.idUsuario=login.idUsuario
      AND habilitado='No'
      AND mail='${mail}'`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }


  }


  async function loginUser (usuario ) {

        // Find the User 
        let data = await buscarUsuarioByMailHabilitado(usuario.mail);
        if (data.data.length==0){
          return {code: 202, usuario: "Invalid username or password"};
        }
        
        user = data.data[0];

        let passwordIsValid = bcrypt.compareSync(usuario.password,user.password );

        if (!passwordIsValid)  return {code: 203, usuario: "Invalid username or password"}

        /*var token = jwt.sign({
            id: user.idUsuario
        },{'supersecret'}, {
            expiresIn: 86400 // expires in 24 hours
        });*/

        return {code: 201,/* token:token,*/ usuario:data};

  
        // return a Error message describing the reason     
       // return {code: 400, message: e.message};

  }


  async function crearCodigoVerificacion(codigo,mail){

    try{
      
      const result = await db.query(
        `INSERT INTO recuperacionpass 
        ( codigoRecuperacion,snUtilizado,mail)
        VALUES 
        ('${codigo}', 'N', '${mail}')`
      );

    
      let message = 'Error creando un codigo de recuperacion';
    
      if (result.affectedRows) {
        message = 'Codigo de recuperación creado';
      }
    
      return {code: 201, message:message};


    }catch(e){
      return {code: 400, message:e.message};

    }
  
}


async function consultarCodigoVigente (usuario ) {

  try {
      // Find the verification code
      

      const rows = await db.query(
        `select  1  from recuperacionpass 
        where codigoRecuperacion = ${usuario.codigo}
        and snUtilizado = 'N'
        and mail ='${usuario.mail}'`
      );

      const data = helper.emptyOrRows(rows); 


      if ((data.length ===0)){
          return {code: 202, message: "No se encuentra un codigo vigente"};
      }

      const result = await db.query(
        `UPDATE recuperacionpass SET
        snUtilizado='S'
       WHERE codigoRecuperacion=${usuario.codigo}`
   );
     

   if (result.affectedRows) {
    return {code: 201, message:"Se ha validado el código correctamente"};
   }
  
  
      

  } catch (e) {
      // return a Error message describing the reason     
      return {code: 400, message: e.message};
  }

}




module.exports = {
  getMultiple,
  create,
  loginUser,
  updateUser,
  crearInvitado,
  crearInvitadoUpdate,
  crearCodigoVerificacion,
  consultarCodigoVigente,
  getUsuario,
  postUsuario,
  modificarPass,
  buscarUsuarioByMail,
  buscarUsuarioByAlias,
  recomendarAlias 
}