exports.generate = async (length = 5) => {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += String(Math.round(Math.random() * 10));
  }
  return code.slice(0, length);
};
