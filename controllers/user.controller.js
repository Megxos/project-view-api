const database = require("../config/database");
const { response } = require("express");

exports.update = async(req, res)=>{
    let { firstname, lastname } = req.body;

    let { user_id } = req.params;

    if(!firstname || !lastname || !user_id){
        return res.status(400).json({
            success: false,
            message: "operation unsucessful",
            error: {
                statusCode: 400,
                description: "firstname, lastname or user_id cannot be empty cannot be empty",
            }
        });
    }

    database.query(`SELECT * FROM users WHERE user_id = ${user_id}`, (error, user)=>{
        if(error){
            return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                    statusCode: 500,
                    description: "could not update user details",
                    error
                }
            });
        }else if(!user.length){
            return res.status(404).json({
              success: false,
              message: "operation unsuccessful",
              error: {
                statusCode: 404,
                description: "user does not exists",
                error,
              },
            });
        }else{
            database.query(
                `UPDATE users SET 
                firstname = '${firstname}', 
                lastname = '${lastname}' 
                WHERE user_id = ${user_id}`, 
                (error, update)=>{
                    if(error){
                        return res.status(500).json({
                          success: false,
                          message: "operation unsuccessful",
                          error: {
                            statusCode: 500,
                            description: "could not update user details",
                            error,
                          },
                        });
                    }else{
                        return res.status(201).json({
                            success: true,
                            message: "operation successful",
                            data: {
                                statusCode: 201,
                                description: "successfully updated user profile",
                                user: {
                                    user_id,
                                    email: user.email,
                                    account: user.account,
                                    firstname,
                                    lastname
                                }
                            }
                        });
                    }
                });
        }

    });

};