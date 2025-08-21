const {pool} = require("../config/db");



function send(req,res){
    res.send("aree bhai hello world")
}

function home(req,res){
    res.render("home.ejs");
}


async function notesData(req,res){
    const {title,content} = req.body;
    console.log(req.body);
    try {
        await pool.query("INSERT INTO notes (title,content) VALUES(?,?)",[title,content])
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");  
    }
    res.render("home.ejs")
}

function newNotes(req,res){
    res.render("newNotes.ejs");
}

function postNotes(req,res){
    const {title,content} = req.body;
    console.log({
        title,
        content
    })
    res.redirect("/")
}
module.exports = {
    send,
    notesData,
    home,
    newNotes,
    postNotes
}