const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (request, response, next) => {
  try {
    const { username, email, password } = request.body;
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return response.json({ message: "Username already in use", status: false });
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return response.json({ message: "E-mail already in use", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 6);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    delete user.password;
    
    return response.json({status: true, user});
  } catch(ex) {
    return response.json({status: false});
    next(ex);
  }
};