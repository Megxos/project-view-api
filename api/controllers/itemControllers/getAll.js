const database = require("../../../config/database");

exports.getAll = async (req, res) => {
  let { code, project } = req.params;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "operation unsuccessful",
      error: {
        statusCode: 400,
        description: "code is required",
      },
    });
  }

  database.query(
    `SELECT * FROM items WHERE project = ${code}`,
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

      return res.status(200).json({
        success: true,
        message: "operation successful",
        data: {
          statusCode: 200,
          description: `all items in project ${code}`,
          items: result,
        },
      });
    }
  );
};
