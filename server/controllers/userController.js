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
    next(ex);
  }
};

module.exports.login = async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const loginUser = await User.findOne({ username });

    if (!loginUser) {
      return response.json({ message: "Incorrect username or password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, loginUser.password);

    if (!isPasswordValid) {
      return response.json({ message: "Incorrect username or password", status: false });
    }

    delete loginUser.password;

    return response.json({status: true, loginUser});
  } catch(ex) {
    next(ex);
  }
};