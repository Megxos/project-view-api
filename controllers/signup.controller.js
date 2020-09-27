const database = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

exports.signup = async(req, res)=>{

    let {
        email,
        password,
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "bad request",
            error: {
                statusCode: 400,
                description: "email or password cannot be blank"
            }
        });
    }

    await database.query(
        `CREATE TABLE IF NOT EXISTS accounts(
            acc_no TEXT(10), 
            acc_name TEXT, 
            acc_bank TEXT,
            acc_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL
        )`,
        async (error, result, fields)=>{
            if(error){
                return res.status(500).json({
                    success: false,
                    message: "operation unsuccessful",
                    error: {
                        statusCode: 500,
                        description: "something went wrong"
                    }
                });
            }
            database.query(
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
                async(error, result, fields) => {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            message: "operation unsuccessful",
                            error: {
                                statusCode: 500,
                                description: "something went wrong"
                            }
                        });
                    }
                   password = await bcrypt.hash(password, 10);
                   let token = await jwt.sign({
                       email,
                   }, JWT_SECRET);

                   database.query(`SELECT * FROM users WHERE email = '${email}'`, (error, result) => {
                       if (error) {
                           return res.status(500).json({
                               success: false,
                               message: "operation unsuccessful",
                               error: {
                                   statusCode: 500,
                                   description: "something went wrong"
                               }
                           });
                       }
                       if (result.length) {
                           return res.status(409).json({
                               success: false,
                               message: "operation unsuccessful",
                               error: {
                                   statusCode: 409,
                                   description: "user already exists"
                               }
                           });
                       }

                       database.query("INSERT INTO users(email, password, token) VALUES(?, ?, ?)", [email, password, token], (error, result, fields) => {
                           if (error) {
                               console.log(error);
                               return res.status(500).json({
                                   success: false,
                                   message: "operation unsuccessful",
                                   error: {
                                       statusCode: 500,
                                       description: "something went wrong"
                                   }
                               });
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
                   });
                }
            );
        }
    );
};