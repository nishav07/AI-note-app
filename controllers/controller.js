const {pool} = require("../config/db");


function send(req,res){
    res.send("aree bhai hello world")
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


module.exports = {
    send,
    notesData,
    home,
    newNotes,
    notesData
}