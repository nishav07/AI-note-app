const express = require("express");
const router = express.Router();
const micro = require("../controllers/controller")
// const { send } = require("../controllers/controller")
// const { home } = require("../controllers/controller")

router.get("/" ,micro.send)
router.get("/home",micro.home)
router.get("/new",micro.newNotes)
// router.post("/new",)
module.exports = router;


