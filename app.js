//const human = require('./human')
const person = require('./Human')
const path = require('path')
const fs = require('fs')
//human.person("Alhamdulillah It works")
person('TheCoder ....')
//path
var pathObj = path.parse(__filename)
console.log(pathObj.dir)

//fs synchronous
var files = fs.readdirSync("./")
console.log(`Files in this folder : ${files}`)

//fs Asynchronous
fs.readdir('$', function(error,files){
    if(error) console.log("Error Happend "+error)
    else console.log( `Files SuccessFully Find ${files}`)
})

console.log('Alhamdulillah it works')
//console.log(module)