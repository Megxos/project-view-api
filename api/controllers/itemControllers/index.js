const { add } = require("./add");
const { deleteItem } = require("./deleteItem");
const { getAll } = require("./getAll");
const { getCompleted } = require("./getComplete");
const { getPending } = require("./getPending");
const { markComplete } = require("./markComplete");
const { update } = require("./update");

module.exports = {
  add,
  deleteItem,
  getAll,
  getCompleted,
  getPending,
  markComplete,
  update,
};
