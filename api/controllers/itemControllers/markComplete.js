const database = require("../../../config/database");

exports.markComplete = async (req, res) => {
  let { item } = req.params;

  database.query(
    `UPDATE items SET status = ${0} WHERE id = ${item}`,
    (error, result) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "could not mark complete",
            error,
          },
        });
      }
      database.query(
        `SELECT * FROM items WHERE id = ${item}`,
        (error, result) => {
          return res.status(200).json({
            success: true,
            message: "operation successful",
            data: {
              statusCode: 200,
              description: "item marked as complete",
              item: result[0],
            },
          });
        }
      );
    }
  );
};
