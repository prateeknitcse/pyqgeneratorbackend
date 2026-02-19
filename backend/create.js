const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect("mongodb://127.0.0.1:27017/pyqfinder");

(async () => {
  const hashedPassword = await bcrypt.hash("randrishab", 10);

  await Admin.create({
    username: "prateeksingh",
    password: hashedPassword
  });

  console.log("Admin created successfully");
  process.exit();
})();
