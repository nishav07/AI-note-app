const express = require("express");
const router = express.Router();
const micro = require("../controllers/controller")


router.get("/" ,micro.send);
router.get("/home",micro.home);
router.get("/new",micro.newNotes);
router.post("/new",micro.notesData);
router.get("/login",micro.login);
router.post("/login",micro.post_login);
router.get("/signup",micro.signup);
router.post("/signup",micro.post_signup);
router.get("/profile",micro.profile);
module.exports = router;


