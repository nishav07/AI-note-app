const {pool} = require("../config/db");


function send(req,res){
    res.send("why tf you requesting at index")
}


async function home(req,res){
    const [rows] = await pool.query("SELECT title,content FROM notes");
    console.log("initialdata",[rows]);
    res.render("home.ejs",{data:rows});
}



async function notesData(req,res){
    const {title,content} = req.body;
    console.log(req.body);
    try {
        await pool.query("INSERT INTO notes (title,content) VALUES(?,?)",[title,content])
        console.log("hello form controlller db")
        res.redirect("/home")
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");  
    }
}



function newNotes(req,res){
    res.render("newNotes.ejs");
}

function login (req,res){
    res.render("login.ejs")
}

function signup (req,res){
    res.render("signup.ejs")
}

async function post_signup (req,res){
    const {username,email,password} = req.body;

    console.log([username,email,password]);

    try{
        await pool.query("INSERT INTO users (username,email,password) VALUES(?,?,?)",[username,email,password]);
        console.log("hello form signup db");
        res.redirect("/")
    } catch(err){
        console.log(err);
        res.status(500).send("database error");
    }
}

async function post_login (req,res){
    const {username,password} = req.body;

    console.log({
        username,
        password
    })

    try {
        const [rows] = await pool.query("SELECT username,password FROM users WHERE username = ? AND password = ?",[username,password]);
        console.log(rows);
     if(rows.length > 0){
        res.redirect("/home")
     } else {
        res.redirect("/");
     }
    } catch (error) {
        console.log(error)
        res.status(500).send("invalid details");
    }

}

function profile(req,res){
    res.render("profile.ejs")
}
module.exports = {
    send,
    notesData,
    home,
    newNotes,
    notesData,
    login,
    post_login,
    signup,
    post_signup,
    profile
}