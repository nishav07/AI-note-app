
const bcrypt = require("bcrypt");

function flash(req,res,next){
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
}

async function hashing(pass){
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(pass,saltRounds);
    return hashPass
}

async function verify(pass,passDB){
    const check = await bcrypt.compare(pass,passDB);
    return check;
}


module.exports = {
    flash,
    hashing,
    verify
}