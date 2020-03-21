const jwt = require("jsonwebtoken")

module.exports = (request, response, next)=>{
    try {
        if(!request.headers.authorization){
            return response.status(401).json({
                message:'Auth Faileds : The:Coder'
            })
        }
        const token = request.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        request.userData = decoded
        next()
    } catch (error) {
        return response.status(401).json({
            message:'Auth Faileds :'+error
        })
    }
}