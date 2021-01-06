const database = require("../../../config/database");
const bcrypt = require("bcryptjs");

exports.add = async (req, res) => {
  let { acc_no, acc_name, acc_bank, user_id } = req.body;
  let user, acc_id;

  if (!user_id || !acc_no || !acc_name || !acc_bank) {
    return res.status(400).json({
      success: false,
      message: "operation unsuccessful",
      error: {
        statusCode: 500,
        description: "user_id, acc_no, acc_name or acc_bank cannot be empty",
      },
    });
  }
  database.query(
    `SELECT * FROM users WHERE user_id = ${user_id}`,
    (error, result, fields) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "operation unsuccessful",
          error: {
            statusCode: 500,
            description: "could not update account details",
            error,
          },
        });
      } else {
        user = result[0];
        if (user.account != null) {
          database.query(
            `UPDATE accounts SET 
            acc_name = '${acc_name}', 
            acc_bank = '${acc_bank}', 
            acc_no = '${acc_no}' 
            WHERE acc_id = ${result[0].account}`,
            (error, result, fields) => {
              if (error) {
                return res.status(500).json({
                  success: false,
                  message: "operation unsuccessful",
                  error: {
                    statusCode: 500,
                    description: "could not update account details",
                    error,
                  },
                });
              } else {
                return res.status(201).json({
                  success: true,
                  message: "operation successful",
                  data: {
                    statusCode: 201,
                    description: "account details updated successfully",
                    data: {
                      acc_id: user.account,
                      acc_name,
                      acc_no,
                      acc_bank,
                    },
                  },
                });
              }
            }
          );
        } else {
          //else add new account
          database.query(
            `INSERT INTO accounts(acc_name, acc_no, acc_bank) VALUES(?, ?,?)`,
            [acc_name, acc_no, acc_bank],
            async (error, result) => {
              if (error) {
                return res.status(500).json({
                  success: false,
                  message: "operation unsuccessful",
                  error: {
                    statusCode: 500,
                    description: "could not update account details",
                    error,
                  },
                });
              } else {
                acc_id = result.insertId;
                await database.query(
                  `UPDATE users SET account = ${acc_id} WHERE user_id = ${user_id}`,
                  (error, result, fields) => {
                    if (error) {
                      return res.status(500).json({
                        success: false,
                        message: "operation unsuccessful",
                        error: {
                          statusCode: 500,
                          description: "could not update account details",
                          error,
                        },
                      });
                    } else {
                      return res.status(201).json({
                        success: true,
                        message: "operation successful",
                        data: {
                          statusCode: 201,
                          description: "account details updated successfully",
                          data: {
                            acc_id,
                            acc_name,
                            acc_no,
                            acc_bank,
                          },
                        },
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
};

exports.getAccount = async (req, res) => {
  const user_id = req.params.user_id;

  database.query(
    `SELECT * FROM users WHERE user_id = ${user_id}`,
    (error, user) => {
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
        `SELECT * FROM accounts WHERE acc_id = ${user[0].account}`,
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
    }
  );
};

exports.update = async (req, res) => {
  let { acc_name, acc_no, acc_bank, user_id } = req.body;
  let user;
  if (!acc_bank || !acc_name | !acc_no) {
    return res.status(400).json({
      success: false,
      message: "operation unsuccessful",
      error: {
        statusCode: 400,
        description: "acc_name, acc_no or acc_bank cannot be empty",
      },
    });
  }

  database.query(
    `SELECT * FROM users WHERE user_id = ${user_id}`,
    (error, result, fields) => {
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
      user = result[0];
      database.query(
        `UPDATE accounts SET acc_name =  '${acc_name}', acc_no = '${acc_no}', acc_bank = '${acc_bank}' WHERE acc_id = ${user.account}`,
        (error, result, fields) => {
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
              },
            },
          });
        }
      );
    }
  );
};
