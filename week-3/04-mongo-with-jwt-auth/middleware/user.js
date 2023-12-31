const jwt = require("jsonwebtoken")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.token;
    try{
        const isVerify = jwt.verify(token, "secret");
        if(isVerify){
            next();
        }else{
            res.send({msg: "Error"})
        }
    }catch(err){
        res.send({err: err})
    }
}

module.exports = userMiddleware;