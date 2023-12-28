const express = require("express")
const router = express.Router()

const {
    createRole,
    getAllRoles
} = require("../controllers/role"); 

router.post("/", createRole);
router.get("/", getAllRoles);

module.exports = router;
