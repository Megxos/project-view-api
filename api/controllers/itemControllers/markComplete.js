const database = require("../../../config/database");

exports.markComplete = async (req, res) => {
  let { items } = req.body;
  items = JSON.parse(items);
  database.query(
    `UPDATE items SET status = ${0} WHERE id IN (${items})`,
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
        `SELECT * FROM items WHERE id IN (${items})`,
        (error, result) => {
          return res.status(200).json({
            success: true,
            message: "operation successful",
            data: {
              statusCode: 200,
              description: "items marked as complete",
              items: result,
            },
          });
        }
      );
    }
  );
};
