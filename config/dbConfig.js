// file: /config/dbConfig.js

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

let dbURI = "mongodb://127.0.0.1:27017/myDB";
// let dbURI = "mongodb+srv://aqaccess:v27CXkwfjfxaHfHl@cluster0.ycogb7a.mongodb.net/?retryWrites=true&w=majority";
if (process.env.NODE_ENV === "production") {
  // production DB server
  dbURI = process.env.MONGO_URI ? process.env.MONGO_URI : dbURI;
}
export const config = {
  database: dbURI,
  userMongoClient: true,
  connectOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  mongoDebug: true,
};
// To setup production and mongo uri env. Use:
// c:\> NODE_ENV=production MONGO_URI=mongodb:// :@:/ nodemon start
