const http = require('http');
const app = require('./src/app/app');

const PORT = 3000
const server = http.createServer(app)

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})