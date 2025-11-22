const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../utils/hash");
require("dotenv").config();

// LOGIN ROUTE (checks admin table first)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check ADMIN TABLE
        const adminRes = await pool.query(
            "SELECT * FROM admins WHERE email = $1",
            [email]
        );

        if (adminRes.rows.length > 0) {
            const admin = adminRes.rows[0];

            const match = await comparePassword(password, admin.password);

            if (!match)
                return res.status(401).json({ message: "Invalid admin password" });

            const token = jwt.sign(
                {
                    id: admin.admin_id,
                    role: "ADMIN",
                    name: admin.name,
                    email: admin.email
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            return res.json({
                message: "Login successful",
                role: "ADMIN",
                token,
                redirect: "/admin/dashboard"
            });
        }

        // 2. Check STUDENT TABLE
        const studentRes = await pool.query(
            "SELECT * FROM students WHERE email = $1",
            [email]
        );

        if (studentRes.rows.length === 0)
            return res.status(404).json({ message: "User not found" });

        const student = studentRes.rows[0];

        const match = await comparePassword(password, student.password);

        if (!match)
            return res.status(401).json({ message: "Invalid student password" });

        const token = jwt.sign(
            {
                id: student.student_id,
                role: "STUDENT",
                name: student.name,
                email: student.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            message: "Login successful",
            role: "STUDENT",
            token,
            redirect: "/student/home"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
