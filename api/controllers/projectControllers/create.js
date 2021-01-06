const database = require("../../../config/database");
const code = require("../../utils/code_generator");

exports.create = async (req, res) => {
  const { name, user_id } = req.body;
  let project_code = Number(await code.generate(5));

  if (!name || !user_id) {
    return res.status(400).json({
      success: false,
      message: "operation unsuccessful",
      error: {
        statusCode: 400,
        description: "name and user_id are required",
      },
    });
  }
  database.query(
    `CREATE TABLE IF NOT EXISTS projects(
          id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
          code INT UNIQUE,
          name TEXT, 
          owner INT,
          FOREIGN KEY (owner) REFERENCES users(user_id)
      )`,
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "could not create project",
            error,
          },
        });
      }
      database.query(
        `INSERT INTO projects(code, name, owner) VALUES(?, ?, ?)`,
        [project_code, name, user_id],
        (error, result) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "operation unsuccessful",
              error: {
                statusCode: 500,
                description: "could not create project",
                error,
              },
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
                owner: user_id,
              },
            },
          });
        }
      );
    }
  );
};
