exports.generate = async(length)=>{
    let code = "";
    for(let i = 0; i < length; i++){
        code+=String(Math.round(Math.random() * 10));
    }
    return code;
};