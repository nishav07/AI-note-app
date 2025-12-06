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
    res.render("home.ejs");//{data:rows}
}

async function notesData(req,res){
    const title = req.body.title;
    const content = req.body.story;
    const {user_id} = req.session.user;
    console.log(req.session.user);
    console.log(user_id);
    console.log({title,content})
    try {
        await pool.query("INSERT INTO notes (title,content,user_id) VALUES(?,?,?)",[title,content,user_id])
        console.log("hello form controlller db")
        res.redirect("/Dashboard")
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");  
    }
}


// function newNotes(req,res){
//     res.render("newNotes.ejs");
// }

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
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?",[username]);
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
        res.redirect("/Dashboard")
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

// function profile(req,res){
//     res.render("profile.ejs")
// }

// function explore(req,res){
//     res.render("explore.ejs")
// }

async function SPA(req,res){
    const page = req.params.page;
    const [rows] = await pool.query("SELECT * FROM notes as a JOIN users as b ON a.user_id = b.user_id");
    const user = req.session.user;
    const [likes] = await pool.query("SELECT * FROM notes_likes WHERE user_id = ?",[user.user_id]);
    const [drafts] = await pool.query("SELECT * FROM draft_notes as a JOIN users as b ON a.userid = b.user_id WHERE b.user_id = ?",[user.user_id]);
    const userLikes = likes.map((like) => {
        return like.notesID;
    })

    console.log("drafts:",drafts)

    const postWithLike = rows.map(post => ({
        ...post,
        liked: userLikes.includes(post.notesID)
    }));

    res.render(`components/${page}`,{ 
        data:postWithLike,
        user:user,
        draft:drafts
    })
}

async function profileSPA(req,res){
    const page = req.params.page;
    const [rows] = await pool.query("SELECT title,content,notesID FROM notes");
    const user = req.session.user;
    res.render(`components2/${page}`,{ 
        data:rows,
        user:user 
    });
}



// async function edit(req,res) {
//     res.render("edit.ejs")
// }

async function commentSPA(req,res){
    const { postID, userID,page} = req.body;
    console.log("commet SPA pe data aa gya", {
        postID,
        userID,
    })
    const [user] = await pool.query('SELECT * FROM notes_comment as a JOIN users as b ON a.user_id = b.user_id WHERE notesID = ?',[postID]);
    console.log("comments of specific post",user);
    res.render(`components3/${page}`,{
        data:user,
    });
}

async function likes(req,res){
    const {postID,userID} = req.body;
    console.log('backend se')
    console.log({
        postID,
        userID
    })

    const [rows] = await pool.query("SELECT * FROM notes_likes WHERE user_id = ? AND notesID = ?",[userID,postID]);
    if(rows.length === 0){
        console.log("likeeeeee aaayaa hai")
         await pool.query("UPDATE notes SET like_count = like_count + 1 WHERE notesID = ?",[postID])
         await pool.query("INSERT INTO notes_likes (user_id,notesID) VALUES(?,?)",[userID,postID]);
         const [likes] = await pool.query("SELECT like_count FROM notes WHERE notesID = ?",[postID]);
         const likeCount = likes[0].like_count;

         return res.json({
            isliked:true,
            message:"user has liked",
            data:likeCount,
         })
    } else {

        console.log("ig user has already liked it now disliking")
        await pool.query("DELETE FROM notes_likes WHERE user_id = ? AND notesID = ?",[userID,postID])
        await pool.query("UPDATE notes SET like_count = like_count - 1 WHERE notesID = ?",[postID])
       
        const [likes] = await pool.query("SELECT like_count FROM notes WHERE notesID = ?",[postID]);
        const likeCount = likes[0].like_count;


        return res.json({
            isliked:false,
            message:"user has disliked",
            data:likeCount,
         })
    }

    // res.redirect("/Dashboard")
}


async function comments(req,res){
    const { postID, userID, comment } = req.body;
    console.log("backend pe data aa gya", {
        postID,
        userID,
        comment
    })

    await pool.query("INSERT INTO notes_comment (user_id,notesID,content) VALUES(?,?,?)",[userID,postID,comment]);
    await pool.query("UPDATE notes SET cmt_count = cmt_count + 1 WHERE notesID = ?",[postID])
    const [cmt] = await pool.query("SELECT cmt_count FROM notes WHERE notesID = ?",[postID]);
         const cmtCount = cmt[0].cmt_count;

         return res.json({
            data:cmtCount,
         })
         
}


async function draft(req,res) {
    const title = req.body.title;
    const content = req.body.story;
    const {user_id} = req.session.user;
    console.log("drafts backends se console pe print")
    console.log(req.session.user);
    console.log(user_id);
    console.log({title,content})
    try {
        await pool.query("INSERT INTO draft_notes (title,content,userid) VALUES(?,?,?)",[title,content,user_id])
        console.log("hello form draft db")
        res.redirect("/Dashboard")
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");  
    }
}


async function edit(req,res) {
    const page = req.params.page;
    if(page === "personal"){
        const {name,bio,location,dob,gender} = req.body.userInfo;

        console.log('data from bckend:',{name,bio,location,dob,gender})
        res.sendStatus(200);
    }
}

module.exports = {
    send,
    notesData,
    home,
    notesData,
    login,
    post_login,
    signup,
    post_signup,
    SPA,
    edit,
    profileSPA,
    commentSPA,
    likes,
    comments,
    draft
}