const bcrypt = require("bcrypt");

async function hash(pass){
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(pass,saltRounds);
    return hashPass
}

async function verify(pass,passDB){
    const check = await bcrypt.compare(pass,passDB);
    return check;
}

const password = "qwerty123$"

async function check() {
    const hashpass = await hash(password);
    console.log(hashpass);
}

check();

// const check = verify(password,hashpass);

// console.log("check");