const http = require('http');
const port = 3000 //process.env.PORT || 3000;

const app = require('./app');

const server = http.createServer(app);

server.listen(port, function(){
    console.log(`Alhamdulillah Server is running on ${port}`);
});