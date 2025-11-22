const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
    console.log("Login route hit");
    console.log("Body received:", req.body);
    if (!req.body) {
        return res.status(400).json({ msg: "req.body is missing!" });
    }
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password required" });
        }

        const admin = await pool.query(
            "SELECT * FROM admins WHERE email = $1",
            [email]
        );

        if (admin.rows.length === 0) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        const token = jwt.sign(
            { id: admin.rows[0].id, email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            msg: "Login successful",
            token,
            admin: admin.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
