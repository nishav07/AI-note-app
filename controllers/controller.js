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

module.exports = {
    send,
    notesData
}