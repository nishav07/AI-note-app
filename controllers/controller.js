function send(req,res){
    res.send("aree bhai hello world")
}

function home(req,res){
    res.render("home.ejs");
}


function notesData(req,res){
    const {title,content} = req.body;
    console.log(req.body)
    res.render("")
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
    newNotes
}