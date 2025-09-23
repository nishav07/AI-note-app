const { json } = require("express");
const {pool} = require("../config/db");
const bcrypt = require("bcrypt");
const middlewares = require("../middleware/middleware");

function send(req,res){
    res.render("index.ejs")
}


async function home(req,res){
    const [rows] = await pool.query("SELECT title,content FROM notes");
    console.log("initialdata",[rows]);
    res.render("home.ejs",{data:rows});
}



async function notesData(req,res){
    const title = req.body.title;
    const content = req.body.story;
    console.log({title,content})
    try {
        await pool.query("INSERT INTO notes (title,content) VALUES(?,?)",[title,content])
        console.log("hello form controlller db")
        res.redirect("/home")
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");  
    }
    res.send("data aaaaaaaa gyaaaaaaaaa")
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
    const hashPass = await middlewares.hashing(password);
    console.log([username,email,password,hashPass]);

    

    try{
        await pool.query("INSERT INTO users (username,email,password) VALUES(?,?,?)",[username,email,hashPass]);
        console.log("hello form signup db");
        req.flash("success","SingnUp completed");
        res.redirect("/")
    } catch(err){
        console.log(err);
        req.flash("error","Signup Failed Due to Internal Error");
        // res.status(500).send("database error");
        res.redirect("/");
    }
}

async function post_login (req,res){
    const {username,password} = req.body;

    console.log({
        username,
        password
    })

    try {
        const [rows] = await pool.query("SELECT username,password FROM users WHERE username = ?",[username]);
        console.log(rows);
        
        if(rows.length === 0){
            req.flash("error" , "user not found");
            return res.redirect("/login");
        }

        const hashPass = rows[0].password;
        const verify = await middlewares.verify(password,hashPass);
        
     if(verify){
        req.session.user = rows[0];
        req.flash("success" , "login succefull")
        res.redirect("/home")
     } else {
        req.flash("error" , "Invalid Password")
        res.redirect("/login");
     }
    } catch (error) {
        console.log(error)
        // res.status(500).send("invalid details");
        req.flash("error" , "User not Found")
        res.redirect("/login")
    }

}

function profile(req,res){
    res.render("profile.ejs")
}

function explore(req,res){
    res.render("explore.ejs")
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
    profile,
    explore
}