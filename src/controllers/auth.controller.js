const userModel = require("../models/users.model");
const tokenBlacklistModel = require("../models/blacklist.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register user
const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  //if any data is missing, return error
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  //check if user already exists
  try {
    const isUser = await userModel.findOne({ $or: [{ username }, { email }] }); // this will chekc for multiple conditions, if either username or email already exists, it will return the user

    //if user exists with user or email, return error
    if (isUser) {
      return res
        .status(400)
        .json({ error: "User already exists with username or email" });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    //generate a token for the user
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    //save the token in the cookie
    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExists = await userModel.findOne({ email });

    //checking if user not exists, return error
    if (!isUserExists) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExists.password,
    );

    //checking if password is not valid, return error
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    //generating the token
    const token = jwt.sign(
      { id: isUserExists._id, username: isUserExists.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: isUserExists._id,
        username: isUserExists.username,
        email: isUserExists.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//change password
const changePasswordController = async (req, res) => {
  console.log(req.body);
  const { id, currentPass, password, confirmPass } = req.body;

  //checking the both password and confirm password are same? if not then throw error
  if (!(password === confirmPass)) {
    res.status(400).json({ error: "Both password must be same" });
  }

  //Finding user by id
  const user = await userModel.findById(id);

  //comparing current pass and exitins DB pass are same
  const isPasswordValid = await bcrypt.compare(currentPass, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: "Current password is incorrect" });
  }

  const hashPass = await bcrypt.hash(password, 10);

  user.password = hashPass;

  await user.save();

  res.status(201).json({
    message: "Password changed successfully",
  });
};
 
const logoutController = async (req,res) =>{
   const token = req.cookies.token;

   if(token){
    await tokenBlacklistModel.create({token})
   }

   res.clearCookie("token");
   res.status(200).json({
    message: "User logout successfully"
   })
}
module.exports = {
  registerUserController,
  loginController,
  changePasswordController,
  logoutController,
};
