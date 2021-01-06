const database = require("../../../config/database");

exports.getAll = async (req, res) => {
  let { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "operation unsuccessful",
      error: {
        statusCode: 400,
        description: "user_id is required",
      },
    });
  }

  database.query(
    `SELECT * FROM users WHERE user_id = ${user_id}`,
    (error, user) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "could not retrieve projects",
            error,
          },
        });
      } else {
        database.query(
          `SELECT * FROM projects  WHERE owner = ${user_id} `,
          (error, projects) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: "operation unsuccessful",
                error: {
                  statusCode: 500,
                  description: "could not retrieve projects",
                  error,
                },
              });
            } else {
              return res.status(200).json({
                success: true,
                message: "operation successful",
                data: {
                  statusCode: 200,
                  description: "successfully retrived projects",
                  projects,
                },
              });
            }
          }
        );
      }
    }
  );
};
