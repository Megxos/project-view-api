const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

exports.verify = async(req, res, next)=>{
    const token = req.headers["token"] || req.body.token;

    if(!token){
        return res.status(403).json({
            success: false,
            message: "operation unsuccessful",
            error: {
                statusCode: 403,
                description: "token is required"
            }
        });
    }
    await jwt.verify(token, JWT_SECRET, async(error, success)=>{
        if(error){
            return res.status(400).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                    statusCode: 400,
                    description: "invalid token"
                }
            });
        }
        req.user = success;
        return next();
    });
};