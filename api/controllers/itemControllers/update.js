const database = require("../../../config/database");

exports.update = async (req, res) => {
  let { quantity, user_id } = req.body;
  let { item } = req.params;

  if (!quantity || !user_id) {
    return res.status(400).json({
      success: false,
      message: "operation unsuccessful",
      error: {
        statusCode: 400,
        description: "quantity or user_id cannot be empty",
      },
    });
  }

  database.query(
    `UPDATE items SET quantity = ${quantity} WHERE id = ${item}`,
    (error, item) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "could not update item",
            error,
          },
        });
      } else {
        return res.status(201).json({
          success: false,
          message: "operation successful",
          data: {
            statusCode: 201,
            description: "item updated",
            item: {
              id: item,
              quantity,
            },
          },
        });
      }
    }
  );
};
