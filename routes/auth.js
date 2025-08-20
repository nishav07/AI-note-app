const express = require("express");
const router = express.Router();
const { send } = require("../controllers/controller")

router.get("/" ,send)

module.exports = router;


