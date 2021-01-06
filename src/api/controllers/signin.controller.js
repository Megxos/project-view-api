const database = require("../../../config/database");
const bcrypt = require("bcryptjs");

exports.signin = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "operation unsuccessful",
      error: {
        statusCode: 400,
        description: "email or password cannot be empty",
      },
    });
  }

  await database.query(
    `SELECT * FROM users WHERE email = '${email}'`,
    async (error, result, fields) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 401,
            description: "incorrect password",
          },
        });
      }
      if (result.length) {
        if (await bcrypt.compare(password, result[0].password)) {
          return res.status(200).json({
            success: true,
            message: "operation successful",
            data: {
              statusCode: 200,
              description: "login successful",
              user: result[0],
            },
          });
        }
        return res.status(404).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 404,
            description: "invalid credentials",
          },
        });
      }
      return res.status(404).json({
        success: false,
        message: "operation unsuccessful",
        error: {
          statusCode: 404,
          description: "invalid credentials",
        },
      });
    }
  );
};
