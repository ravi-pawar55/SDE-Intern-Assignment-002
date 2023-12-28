const express = require("express")
const router = express.Router()

const {
    addMember,
    removeMember
} = require("../controllers/member");

const{
    auth,
    isCommunityAdmin,
    isAllowed
} = require("../middlewares/auth");

router.post("/", auth , isCommunityAdmin, addMember);
router.delete("/:id", auth , isAllowed, removeMember);

module.exports = router;