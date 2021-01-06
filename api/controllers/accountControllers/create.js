const database = require("../../../config/database");
const { body } = require("express-validator");
const { response } = require("express");

exports.validate = () => [
  body(["acc_no", "user_id"]).isNumeric(),
  body(["acc_bank", "acc_name"]).isString(),
  body("bank_code").isNumeric().optional(),
  body("project").isNumeric().isLength({ min: 1, max: 1 }),
];

exports.add = async (req, res) => {
  let { acc_no, acc_name, acc_bank, project, user_id, bank_code } = req.body;
  let user, acc_id;

  database.query(
    `CREATE TABLE IF NOT EXISTS accounts(
        acc_no TEXT(10), 
        acc_name TEXT, 
        acc_bank TEXT,
        bank_code TEXT(3),
        project INT,
        user_id INT,
        acc_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        FOREIGN KEY (project) REFERENCES projects(id),
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  );
  database.query(
    `SELECT * FROM accounts WHERE project = ${project}`,
    (error, result) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "could not update account details",
            error,
          },
        });
      } else if (result.length) {
        user = result[0].user_id;
        acc_id = result[0].acc_id;

        database.query(
          `UPDATE accounts SET
            acc_name = '${acc_name}',
            acc_bank = '${acc_bank}',
            acc_no = '${acc_no}',
            bank_code = '${bank_code}'
            WHERE project = ${project}`,
          (error) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                  statusCode: 500,
                  description: "could not update account details",
                  error,
                },
              });
            } else {
              return res.status(201).json({
                success: true,
                message: "operation successful",
                data: {
                  statusCode: 201,
                  description: "account details updated successfully",
                  data: {
                    acc_id,
                    acc_name,
                    project,
                    acc_no,
                    acc_bank,
                    bank_code,
                    user_id: user,
                  },
                },
              });
            }
          }
        );
      } else {
        //else add new account
        database.query(
          `INSERT INTO accounts(acc_name, acc_no, acc_bank, project, user_id) VALUES(?, ?, ?, ?, ?)`,
          [acc_name, acc_no, acc_bank, project, user_id],
          async (error, result) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                  statusCode: 500,
                  description: "could not update account details",
                  error,
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
                  acc_id: result.insertId,
                  acc_name,
                  acc_no,
                  acc_bank,
                  user_id,
                  project,
                },
              },
            });
          }
        );
      }
    }
  );
};
