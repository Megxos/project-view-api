const database = require("../../../config/database");

exports.getPending = async (req, res) => {
  let { project } = req.params;

  database.query(
    `SELECT * FROM items WHERE project = ${project} AND status = ${1}`,
    (error, result) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "could not get items",
            error,
          },
        });
      }
      return res.status(200).json({
        success: true,
        message: "operation successful",
        data: {
          statusCode: 200,
          description: `all pending items in ${project}`,
          items: result,
        },
      });
    }
  );
};
