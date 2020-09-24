const database = require("../config/database");
const bcrypt = require("bcryptjs");

exports.signin = async(req, res)=>{
    let { email, password } = req.body;
    await database.query(`select * from users where email = '${email}'`, async (error, result, fields)=>{
        if(error){
            return res.send(error);
        }
        if(await bcrypt.compare(password, result[0].password)){
             return res.send(result);
        }
        return res.send("incorrect password");
    });
};