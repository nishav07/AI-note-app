
function hello(req,res,next){
    console.log("hello world");
    next();
}

function noob(req,res,next){
    console.log("this is a particular middlware");
    next();
}
module.exports = {
    hello,
    noob
}