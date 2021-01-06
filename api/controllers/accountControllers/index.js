const { add, validate } = require("./create");
const { getAccount } = require("./get");
const { update, validateUpdate } = require("./update");
const { getAll } = require("./getAll");

module.exports = {
  add,
  addValidate: validate(),
  getAccount,
  update,
  validateUpdate,
  getAll,
};
