const dbConnection = require('../configuration/db-configuration')

exports.findAll = (result)=>{
    dbConnection.query(`SELECT * FROM AVENGER `, (error,data)=>{
        if(error){
            result(error,null)
            return
        }else{
            result(null, data)
            return
        }
    })
}

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

exports.create = (avenger, result)=>{
    dbConnection.query('INSERT INTO AVENGER SET ?', avenger, (error, data)=>{
        if(error){
            result(error,null)
        }else{
            result(null,data)
        }
    })
}

exports.update = (id,avenger,result)=>{
    let fields = field(avenger)
    let valueArray = valArray(avenger,id)

    dbConnection.query(`UPDATE AVENGER SET ${fields} WHERE ID = ?` ,valueArray,
    (error,data)=>{
        if(error){
            result(error, null)
        }else{
            result(null,data)
        }
    })
}

exports.deleteById = (id, result)=>{
    dbConnection.query('DELETE FROM AVENGER WHERE ID =? ', id,(error, data)=>{
        if(error){
            result(error, null)
        }else{
            result(null,data)
        }
    })

}
var valArray = (avenger,id)=>{
    let valueArray = []
    if(avenger.name !=null) {
        valueArray.push(avenger.name)
    }
    if(avenger.description!=null) {
        valueArray.push(avenger.description)
    }
    valueArray.push(id)
    return valueArray;
}
var field = (avenger)=>{
    flg = false
    fields = '';
    if(avenger.name!=null) {
        fields+= "name = ? "; 
        flg = true;}
    if(avenger.description!=null) {
        if(flg) {
            fields+=", "
        }
        fields+= "description = ? "; 
        flg = true;
    }
    return fields;
}
/**function findById (id,result){

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
module.exports.findById = findById; */
