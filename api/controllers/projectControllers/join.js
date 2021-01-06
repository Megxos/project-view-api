const database = require("../../../config/database");

exports.join = async (req, res) => {
  const { code } = req.body;

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
    `SELECT * FROM projects WHERE code = ${code}`,
    (error, project) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "could not join project",
          },
        });
      } else if (!project.length) {
        return res.status(400).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 400,
            description: "invalid project code",
            code,
          },
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "operation successful",
          data: {
            statusCode: 200,
            description: "successfully joined ",
            project: project[0],
          },
        });
      }
    }
  );
};
