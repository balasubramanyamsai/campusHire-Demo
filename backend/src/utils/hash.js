const bcrypt = require("bcrypt");
require("dotenv").config();

async function hashPassword(password) {
    const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    return await bcrypt.hash(password, rounds);
}

async function comparePassword(plain, hashed) {
    return await bcrypt.compare(plain, hashed);
}

module.exports = { hashPassword, comparePassword };
