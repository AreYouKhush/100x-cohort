const jwt = require("jsonwebtoken");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
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

module.exports = adminMiddleware;