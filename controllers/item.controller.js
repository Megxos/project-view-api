const database = require("../config/database");

exports.add = async(req, res)=>{
    const { item, price, quantity } = req.body
    const user = req.user.email;
};

exports.markComplete = async(req, res)=>{
    console.log(req);
};

exports.delete = async(req, res)=>{
    console.log(req);
};

exports.update = async(req, res)=>{
    console.log(req);
};
