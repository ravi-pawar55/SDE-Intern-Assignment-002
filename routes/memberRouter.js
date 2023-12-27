const express = require("express")
const router = express.Router()

const {
    addMember,
    removeMember
} = require("../controllers/member");

router.post("/add", addMember);
router.delete("/remove", removeMember);

module.exports = router;