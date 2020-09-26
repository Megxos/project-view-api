const database = require("../config/database");
const code = require("../services/code_generator");

exports.new = async(req, res)=>{

    const { name, user_id } = req.body;
    let project_code = Number(await code.generate(5));

    if(!name || !user_id){
        return res.status(400).json({
            success: false,
            message: "operation unsuccessful",
            error: {
                statusCode: 400,
                description: "name and user_id are required"
            }
        });
    }
    database.query(
        `CREATE TABLE IF NOT EXISTS projects(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
            code INT(5), 
            name TEXT, 
            FOREIGN KEY (owner) REFERENCES users(user_id)
        )`,
        (error, result, fields)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "operation unsuccessful",
                    error: {
                        statusCode: 500,
                        description: "could not create project"
                    }
                });
            }
            console.log("created projects table");
        }
    );

    database.query(
        `INSERT INTO projects(code, name, owner) VALUES(?, ?, ?)`, 
        [project_code, name, user_id], 
        (error, result, fields)=>{
            if(error){
                return res.status(500).json({
                    success: false,
                    message: "operation unsuccessful",
                    error: {
                        statusCode: 500,
                        description: "could not create project"
                    }
                });
            }
            return res.status(201).json({
                success: true,
                message: "operation successful",
                data: {
                    statusCode: 201,
                    description: "project created successfully",
                    project: {
                        id: result.insertId,
                        name,
                        code: project_code,
                        owner: user_id
                    }
                }
            });
        });
};

exports.join = async(req, res)=>{
    const { code } = req.body;

    if(!code){
        return res.status(400).json({
            success: false,
            message: "operation unsuccessful",
            error: {
                statusCode: 400,
                description: "code is required"
            }
        });
    }

    database.query(`SELECT * FROM projects WHERE code = ${code}`, (error, result, fields)=>{
        if(error){
            return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                    statusCode: 500,
                    description: "could not join project"
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: "operation successful",
            data: {
                statusCode: 200,
                description: "successfully joined "
            }
        });
    });
};