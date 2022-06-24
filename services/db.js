const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  console.log(sql);
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);


  return results;
}

module.exports = {
  query,
  query2
}
function query2(sql,params){
  let result;
  console.log(sql);
  mysql.createConnection( config.db)
  .then((conn) => {
    result = conn.execute(sql, params)
    .then((result)=>{
      console.log(result[0])
      return [result[0]];
    })
  })
  .catch((error)=>{console.log(error)})

}
