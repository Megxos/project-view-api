const database = require("../../../config/database");

exports.add = async (req, res) => {
  const { item, price, quantity, project } = req.body;
  const user = req.user.email;

  if (!item || !price || !quantity || !project) {
    return res.status(400).json({
      success: false,
      message: "operation unsuccessful",
      error: {
        statusCode: 400,
        description: "item, price quantity and project are required",
      },
    });
  }

  database.query(
    `CREATE TABLE IF NOT EXISTS items(
            id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
            item TEXT, 
            price TEXT, 
            quantity INT,
            status INT,
            project INT,
            FOREIGN KEY (project) REFERENCES projects(code),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
    (error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "could not add item",
            error,
          },
        });
      }
      database.query(
        `INSERT INTO items(item, price, quantity, status, project) VALUES(?, ?, ?, ?, ?)`,
        [item, price, quantity, 1, project],
        (error, result) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "operation unsuccessful",
              error: {
                statusCode: 500,
                description: "could not add item",
                error,
              },
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
                status: 1,
              },
            },
          });
        }
      );
    }
  );
};
