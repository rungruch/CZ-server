// file: index.js
import express from "express";
import logger from "morgan";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import mongooseDbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";

// routers
import productRouter from "./router/productRouter.js";
import fileRouters from "./router/fileRouters.js";
import heroslidesRouter from "./router/heroslideRouter.js";
import newsRouter from "./router/newsRouter.js";
import zoneRouter from "./router/zoneRouter.js";
import sectionRouter from "./router/sectionRouter.js";
import authRouter from "./router/authRouter.js";

import transactionRouter from "./router/transactionRouter.js";
import ticketRouter from "./router/ticketRouter.js";
import animalRouter from "./router/animalRouter.js";
import User from "./model/UserDB.js";
import UserRouter from "./router/UserRouter.js";
// our own modules need to put file extension .js

dotenv.config({ path: "./config.env" });

mongooseDbConnect();


const app = express();
app.use(cors());
app.use(cookieParser());
const PORT = process.env.port || 8080;

// middleware logger
app.use(logger("short"));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// routes
app.use("/api/product", productRouter);
app.use("/img", fileRouters);
app.use("/api/hero_slides", heroslidesRouter);
app.use("/api/news", newsRouter);
app.use("/api/zones", zoneRouter);
app.use("/api/sections", sectionRouter);
app.use("/auth", authRouter);
app.use("/api/user", UserRouter);

app.use("/api/transactions", transactionRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/animals", animalRouter);

app.get("/", (req, res) => {
  res.status(401).send({ error: "Invalid Endport" });
});
app.get("*", (req, res) => {
  res.status(404).json(new Error("Not Found Page!" + req.url));
});

// for error handling
app.use((err, req, res, next) => {
  console.error(`${err.name}: ${err.message}`);
  res.status(500).send(err.message);
});

// make server start listening on a specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
