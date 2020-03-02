const jwt = require('jsonwebtoken')

module.exports = (request, response, next)=>{

    try{
        const token = request.headers.authorization.split(' ')[1];
        console.log('token : '+token);
        
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log('decoded : '+decoded);
        request.userData = decoded;
        next()
    }catch(error){
        return response.status(401).json({
            message:'Auth Faileds'+error
        })
    }

}