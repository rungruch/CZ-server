// import User from "../model/User.js";
import User from "../model/UserDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { promisify } from "util";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_TIME,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password are required!" });
  }

  // check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");
  if (user) {
  const match = await bcrypt.compare(password, user.password);  
  if (!user || !match) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

}else{
  return res.status(401).json({ message: "Incorrect email or password" });
}
  // if (!user || !match) {
  //   return res.status(401).json({ message: "Incorrect email or password" });
  // }
  // console.log(user);
  const accessToken = signToken(user.id);

  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    }
  );
  user.refreshToken = refreshToken;
  // await User.findOneAndUpdate(user.email, user);
  await User.findOneAndUpdate(
    { email: user.email },
    { refreshToken: refreshToken }
  );

  console.log(user);
  const cookieOptions = {
    httpOnly: true,
    // secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  };

  res.cookie("jwt", refreshToken, cookieOptions);

  res.status(200).json({
    accessToken,
    data: {
      user,
    },
  });
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken: refreshToken });

    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.sendStatus(204);
    }
    await User.updateOne(
      { _id: foundUser._id },
      { $unset: { refreshToken: "" } }
    );
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.sendStatus(200);
    console.log("Logout!!!");
  } catch (error) {
    console.error("Error during logout: ", error);
    res.status(500).json({
      message: "Error during logout!",
    });
  }
};

export const signup = async (req, res) => {
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    bio: req.body.bio,
    // roles: "Admin",
  };

  const accessToken = signToken(newUser.id);

  const refreshToken = jwt.sign(
    { email: newUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    }
  );
  newUser.refreshToken = refreshToken;

  await User.create(newUser);
  const cookieOptions = {
    httpOnly: true,
    // secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  };

  res.cookie("jwt", refreshToken, cookieOptions);

  res.status(201).json({
    accessToken,
    data: {
      newUser,
    },
  });
};

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "You are not logged in!" });
  }

  // verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );

  // check user exist
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ message: "User does not exist!" });
  }

  req.user = user;
  next();
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action!",
      });
    }
    next();
  };
};

