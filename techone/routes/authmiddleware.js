const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=> {
const authToken = req.headers.token;
if(authToken){
    const token = authToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
        if(err) {
            res.status(401).json("Token is invalid");
        }
        console.log("verifytoken ", user);
        req.user = user;
        next();
    });
 
}else{
    return res.status(401).json("You are not authenticated");
}
}

const verifyUser = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id  || req.user.isAdmin){
            next();
        }else{
            res.status(401).json("You are not allowed user");
        }
    });
}

const verifyisAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(401).json("You are not allowed");
        }
    });
}

module.exports = {
    verifyisAdmin,
    verifyToken,
    verifyUser
};