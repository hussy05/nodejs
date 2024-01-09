const bcrypt = require("bcryptjs");

exports.hash = async (password) => await bcrypt.hash(password, 5);