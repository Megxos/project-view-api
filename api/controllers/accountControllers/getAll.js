const database = require("../../../config/database");
const { use } = require("../../routes/account");

exports.getAll = async (req, res) => {
  try {
    const { user_id } = req.params;

    database.query(
      `SELECT * FROM accounts WHERE user_id = ${user_id}`,
      (error, results) => {
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
        return res.status(200).json({
          success: true,
          message: "operation successful",
          data: {
            statusCode: 200,
            description: "successfully retrieved account details",
            accounts: results,
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
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
};
