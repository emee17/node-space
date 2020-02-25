const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = 3000;
app.use(bodyParser.json());

app.use(cors());

app.get('/',function(request,respone){
    respone.send("Alhamdulillah its Server");
});

app.post('/enroll',function(request,respone){

    console.log(request.body);
    respone.status(200).send({"message":"recieved"});
});

app.listen(PORT,function(){
    console.log("Server is running on port "+PORT);
});

