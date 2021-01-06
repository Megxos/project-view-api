const database = require("../../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

exports.signup = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "bad request",
      error: {
        statusCode: 400,
        description: "email or password cannot be blank",
        error,
      },
    });
  }
  database.query(
    `CREATE TABLE IF NOT EXISTS users(
        user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        email TEXT,
        firstname TEXT,
        lastname TEXT,
        password TEXT,
        token TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
    async (error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "something went wrong",
            error,
          },
        });
      }
      password = await bcrypt.hash(password, 10);
      let token = jwt.sign(
        {
          email,
        },
        JWT_SECRET
      );

      database.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        (error, result) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "operation unsuccessful",
              error: {
                statusCode: 500,
                description: "something went wrong",
              },
            });
          }
          if (result.length) {
            return res.status(409).json({
              success: false,
              message: "operation unsuccessful",
              error: {
                statusCode: 409,
                description: "user already exists",
              },
            });
          }

          database.query(
            "INSERT INTO users(email, password, token) VALUES(?, ?, ?)",
            [email, password, token],
            (error, result) => {
              if (error) {
                console.log(error);
                return res.status(500).json({
                  success: false,
                  message: "operation unsuccessful",
                  error: {
                    statusCode: 500,
                    description: "something went wrong",
                  },
                });
              }
              return res.status(201).json({
                success: true,
                message: "operation successful",
                data: {
                  statusCode: 201,
                  user: {
                    user_id: result.insertId,
                    email,
                    password,
                    token,
                  },
                },
              });
            }
          );
        }
      );
    }
  );
};
