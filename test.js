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
    let is = await verify(password,hashpass);
    console.log(is);

}

check();



// const check = verify(password,hashpass);

// console.log("check");

