const dbConnection = require('../configuration/db-configuration')

exports.findById = (id,result)=>{

    dbConnection.query(`SELECT * FROM AVENGER WHERE ID = ${id}`,(error, data)=>{
        if(error){ 
            result(error,null)
            return
        }
        if(data.length){
            result(null,data[0])
            return
        }   //else{ result({errorCode: '404'}, null)}
        result({errorCode: '404'}, null)
    })
};

exports.findByEmail = async (email, result)=>{ 
    dbConnection.query(`SELECT * FROM AVENGER WHERE EMAIL = ?`, email, (err, data)=>{
        if(err){
            result(err,null)
            return 
        }
        if(data.length){
            result(null,data[0])
            return
        }   //else{ result({errorCode: '404'}, null)}
        result({errorCode: '404'}, null)
    })

    /* try{
        const admin = await dbConnection.query(`SELECT * FROM AVENGER WHERE EMAIL = ?`, email).
        console.log('admin : '+ admin)
        if(admin){
            result(null,data)
            return
        }
        result({errorCode: '404'}, null)
    }catch(error){
        result(error, null)
    } */
}