const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { adminOnly } = require("../middleware/auth");
const { loginAdmin } = require("../controllers/adminController");

// Get admin profile
router.get("/me", adminOnly, async (req, res) => {
    res.json({ admin: req.user });
});


router.post("/login", loginAdmin);

// Get list of students
router.get("/students", adminOnly, async (req, res) => {
    const result = await pool.query("SELECT * FROM students ORDER BY created_at DESC");
    res.json(result.rows);
});

module.exports = router;
