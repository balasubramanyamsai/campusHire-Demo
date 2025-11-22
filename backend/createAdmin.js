const pool = require("./src/config/db");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function createAdmin() {
    const name = "Super Admin";
    const email = "admin@campushire.com";
    const plainPassword = "Admin@123";

    const hash = await bcrypt.hash(plainPassword, 10);

    await pool.query(
        `INSERT INTO admins (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, hash]
    );

    console.log("Admin created successfully!");
    process.exit(0);
}

createAdmin();
