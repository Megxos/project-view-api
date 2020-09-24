const database = require("../config/database");
const bcrypt = require("bcryptjs");

exports.add = async(req, res)=>{
    let { acc_no, acc_name, acc_bank, user_id } = req.body;
    let user, acc_id;

    if(!user_id || !acc_no || !acc_name || !acc_bank){
        return res.send("bad request");
    }
    database.query(`SELECT * FROM users WHERE user_id = ${user_id}`, (error, result, fields)=>{
        if(error){
            return res.send(error);
        }
        user = result[0];
        console.log("user:", result);
        if(user.account != null){
            return res.status(409).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                    statusCode: 409,
                    description: "account datails up to date"
                }
            });
        }
        database.query(
            `INSERT INTO accounts(acc_name, acc_no, acc_bank) VALUES(?, ?,?)`,
            [acc_name, acc_no, acc_bank],
            (error, result, fields) => {
                if (error) {
                    return res.send(error);
                }
                console.log("result:", result);
                acc_id = result.insertId;
                database.query(`UPDATE users SET account = ${acc_id} WHERE user_id = ${user_id}`, (error, result, fields) => {
                    if (error) {
                        return res.send(error);
                    }
                    return res.json(result);
                });
            });
    });
};

exports.update = async(req, res)=>{
    let { acc_name, acc_no, acc_bank, user_id } = req.body;
    let user;
    if(!acc_bank || !acc_name | !acc_no){
        return res.status(400).json({
            success: false,
            message: "operation unsuccessful",
            error: {
                statusCode: 400,
                description: "acc_name, acc_no or acc_bank cannot be empty"
            }
        });
    }

    database.query(`SELECT * FROM users WHERE user_id = ${user_id}`, (error, result, fields)=>{
        if(error){
            return res.status(500).json({
              success: false,
              message: "operation unsuccessful",
              error: {
                statusCode: 500,
                description: "could not update account details",
              },
            });
        }
        user = result[0];
        database.query(
          `UPDATE accounts SET acc_name =  '${acc_name}', acc_no = '${acc_no}', acc_bank = '${acc_bank}' WHERE acc_id = ${user.account}`,
          (error, result, fields) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                  statusCode: 500,
                  description: "could not update account details",
                },
              });
            }
            return res.status(201).json({
              success: true,
              message: "operation successful",
              data: {
                statusCode: 201,
                description: "account details updated successfully",
                data: {
                    acc_name,
                    acc_no,
                    acc_bank
                }
              },
            });
          }
        );
    });
};