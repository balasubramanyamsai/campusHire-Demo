const jwt = require("jsonwebtoken");
require("dotenv").config();

function adminOnly(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer "))
        return res.status(401).json({ message: "No token" });

    const token = auth.split(" ")[1];

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (data.role !== "ADMIN")
            return res.status(403).json({ message: "Admins only" });

        req.user = data;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = { adminOnly };
