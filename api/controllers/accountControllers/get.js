const database = require("../../../config/database");

exports.getAccount = async (req, res) => {
  const { user_id, project } = req.params;

  database.query(`SELECT * FROM users WHERE user_id = ${user_id}`, (error) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "operation unsuccessful",
        error: {
          statusCode: 500,
          description: "could not get account details",
          error,
        },
      });
    }
    database.query(
      `SELECT * FROM accounts WHERE project = ${project}`,
      (error, account) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "operation unsuccessful",
            error: {
              statusCode: 500,
              description: "could not get account details",
              error,
            },
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "operation successful",
            data: {
              statusCode: 200,
              description: "successfully retrieved account details",
              account: account[0],
            },
          });
        }
      }
    );
  });
};
