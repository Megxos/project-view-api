const database = require("../config/database");

exports.add = async(req, res)=>{
    const { item, price, quantity, project } = req.body
    const user = req.user.email;

    if(!item || !price || !quantity || !project){
        return res.status(400).json({
            success: false,
            message: "operation unsuccessful",
            error: {
                statusCode: 400,
                description: "item, price quantity and project are required"
            }
        });
    }

    database.query(
        `CREATE TABLE IF NOT EXISTS items(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, item TEXT, price TEXT, quantity INT, status INT)`, 
        (error, result, fields)=>{
            if(error){
                return res.status(500).json({
                    success: false,
                    message: "operation unsuccessful",
                    error: {
                        statusCode: 500,
                        description: "could not add item"
                    }
                });
            }
            console.log("created pending table");
        });

        database.query(
            `INSERT INTO items(item, price, quantity, status) VALUES(?, ?, ?, ?)`, 
            [item, price, quantity, 1],
            (error, result, fields)=>{
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "operation unsuccessful",
                        error: {
                            statusCode: 500,
                            description: "could not add item"
                        }
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: "operation successful",
                    data: {
                        statusCode: 201,
                        description: "item added",
                        item: {
                            id: result.insertId,
                            project,
                            item,
                            price,
                            quantity,
                            status: 1
                        }
                    }
                });
        });
};

exports.markComplete = async(req, res)=>{
    let { item } = req.params;

    database.query(`UPDATE items SET status = ${0} WHERE id = ${item}`, (error, result)=>{
        if(error){
            return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                    statusCode: 500,
                    description: "could not mark complete"
                }
            });
        }
        database.query(`SELECT * FROM items WHERE id = ${item}`, (error, result)=>{
            return res.status(200).json({
                success: true,
                message: "operation successful",
                data: {
                    statusCode: 200,
                    description: "item marked as complete",
                    item: result[0]
                }
            });
        });
    });
};

exports.delete = async(req, res)=>{
    console.log(req);
};

exports.update = async(req, res)=>{
    console.log(req);
};
