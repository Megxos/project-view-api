const database = require("../../../config/database");
const { body } = require("express-validator");

exports.validateUpdate = () => [
  body(["project", "acc_no"]).isNumeric(),
  body(["acc_bank", "acc_name"]).isAlpha(),
  body("bank_code").isNumeric().optional(),
];

exports.update = async (req, res) => {
  let { acc_name, acc_no, acc_bank, bank_code } = req.body;
  const { project } = req.params;
  let user;
  database.query(
    `UPDATE accounts SET 
    acc_name =  '${acc_name}', 
    acc_no = '${acc_no}', 
    acc_bank = '${acc_bank}' 
    bank_code = '${bank_code}'
    WHERE project = ${project}`,
    (error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "could not update account details",
          },
        });
      }
      return res.status(201).json({
        success: true,
        message: "operation successful",
        data: {
          statusCode: 201,
          description: "account details updated successfully",
          data: {
            acc_name,
            acc_no,
            acc_bank,
            bank_code,
          },
        },
      });
    }
  );
};
