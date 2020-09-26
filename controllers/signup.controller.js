const database = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

exports.signup = async(req, res)=>{
    await database.query(
        `CREATE TABLE IF NOT EXISTS accounts(
            acc_no TEXT(10), 
            acc_name TEXT, 
            acc_bank TEXT,
            acc_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL
        )`,
        (error, result, fields)=>{
            if(error) return console.log(error);
            console.log("success1");
        }
    );

    await database.query(
      `CREATE TABLE IF NOT EXISTS users(
          user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
          email TEXT, 
          firstname TEXT, 
          lastname TEXT, 
          password TEXT, 
          account INT,
          token TEXT,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (account)references accounts(acc_id)
        )`,
      (error, result, fields) => {
        if (error) {
          return console.log(error);
        }
        console.log("success2");
      }
    );
    let { email, password, acc_name, acc_no, acc_bank } = req.body;
   if(!email || !password){
       return res.status(400).json({
        success: false,
        message: "bad request",
        error: {
            statusCode: 400,
            description: "email or password cannot be blank"
        }
       });
   }
   password = await bcrypt.hash(password, 10);
   let token = await jwt.sign({
       email,
   }, JWT_SECRET);

   database.query("INSERT INTO users(email, password, token) VALUES(?, ?, ?)", [email, password, token], (error, result, fields)=>{
    if(error){
        console.log(error);
        return res.send(error);
    }
    console.log(result);
    return res.status(201).json({
        success: true,
        message: "operation successful",
        data: {
            statusCode: 201,
            user: {
                user_id: result.insertId,
                email,
                password,
                token
            }
        }
    });
   });

//    database.query("insert into accounts(acc_name, acc_bank, acc_no) values(?, ?, ?)", [acc_name, acc_bank, acc_no], (error, result, fields) => {
//        if (error) {
//            console.log(error);
//            return res.send(error);
//        }
//        console.log(result);
//    });

};