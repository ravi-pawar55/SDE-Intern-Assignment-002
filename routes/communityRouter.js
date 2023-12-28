const express = require("express")
const router = express.Router()

const {
    createCommunity,
    getAllCommunities,
    getAllMembers,
    getOwnedCommunities,
    getJoinedCommunities,
} = require("../controllers/community"); 

router.post("/", createCommunity);
router.get("/", getAllCommunities);
router.get("/me/owner", getOwnedCommunities);
router.get("/me/member", getJoinedCommunities);
router.get("/:id/members", getAllMembers);

module.exports = router;