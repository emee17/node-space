const mySql = require('mysql')

var dbConnection = mySql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'node-db'
})

dbConnection.connect((err)=>{
    if(err) console.log('500 : Error while creating Database connection :TheCoder : '+err);
    else console.log('200 : Successfully created Database connection :TheCoder');
})

/**End exports */
module.exports = dbConnection;