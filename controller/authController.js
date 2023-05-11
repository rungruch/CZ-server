import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

  // check if user exists
  let user = {};
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    return res.status(401).json(error);
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const accessToken = signToken(user.id);

    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }
    );
    user.refreshToken = refreshToken;
    const result = await User.findAndUpdate(user.email, user, true);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
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
  }
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  let foundUser = {};
  try {
    foundUser = await User.findByRefreshToken(refreshToken);
  } catch (error) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = await User.findAndUpdate(foundUser.email, foundUser, true);
  console.log("Logout: ", result);
};

export const signup = async (req, res) => {
  const id = Math.random().toString(36).substring(2, 9);
  const password = await bcrypt.hash(req.body.password, 12);
  let newUser = {
    id,
    name: req.body.name,
    email: req.body.email,
    password,
    roles: "user",
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
  await User.insert(newUser);
  const cookieOptions = {
    httpOnly: true,
    secure: true,
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
