
function hello(req,res,next){
    console.log("hello world");
    next();
}

function checklog(req,res,next){
    if(req.session && req.session.user){
        next()
        
    } else {
        res.render("login.ejs")
    }
}

function noob(req,res,next){
    console.log("this is a particular middlware");
    next();
}
module.exports = {
    hello,
    noob
}