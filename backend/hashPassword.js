const { hashPassword } = require("./src/utils/hash");

async function generateHash() {
  const password = "test123"; // Change this to the password you want to hash
  const hashed = await hashPassword(password);
  console.log("Hashed password:", hashed);
}

generateHash();
