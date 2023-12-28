const express = require("express")
const router = express.Router()

const {
    addMember,
    removeMember
} = require("../controllers/member");

const{
    auth,
    isCommunityAdmin
} = require("../middlewares/auth");

router.post("/", auth , isCommunityAdmin , addMember);
router.delete("/:id", removeMember);

module.exports = router;