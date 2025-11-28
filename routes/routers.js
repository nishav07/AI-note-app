const express = require("express");
const router = express.Router();
const micro = require("../controllers/controller")
const { isLoggedIn } = require("../middleware/middleware.js")




router.get("/" ,micro.send);
router.get("/Dashboard",isLoggedIn,micro.home);
// router.get("/new",isLoggedIn,micro.newNotes);
router.post("/new",isLoggedIn,micro.notesData);
router.get("/login",micro.login);
router.post("/login",micro.post_login);
router.get("/signup",micro.signup);
router.post("/signup",micro.post_signup);
// router.get("/profile",isLoggedIn,micro.profile);
// router.get("/explore",isLoggedIn,micro.explore);
router.get("/components/:page",isLoggedIn,micro.SPA);
router.get("/edit",isLoggedIn,micro.edit);
router.get("/profile/:page",isLoggedIn,micro.profileSPA);
router.get("/Dashboard/:page",isLoggedIn,micro.comments);
router.post("/likes",isLoggedIn,micro.likes)
module.exports = router;


