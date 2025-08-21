const express = require("express");
const router = express.Router();
const { send } = require("../controllers/controller")
const { home } = require("../controllers/controller")

router.get("/" ,send)
router.get("/",)
router.post("/",)
module.exports = router;


