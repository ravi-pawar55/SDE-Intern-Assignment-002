const express = require("express")
const router = express.Router()

const {
    createCommunity,
    getAllCommunities,
    getAllMembers,
    getOwnedCommunities,
    getJoinedCommunities,
} = require("../controllers/community"); 

const{ auth }= require("../middlewares/auth");

router.post("/", auth , createCommunity);
router.get("/", getAllCommunities);
router.get("/me/owner", auth, getOwnedCommunities);
router.get("/me/member", auth,getJoinedCommunities);
router.get("/:id/members", getAllMembers);

module.exports = router;