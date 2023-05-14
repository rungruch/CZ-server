// import User from "../model/User.js";
import User from "../model/UserDB.js";
import bcrypt from "bcrypt";



export const editprofile = async (req, res) => {
const data = req.body || {};
// console.log(data);
if (!data || !req.params.email)

return res.status(422).send({ error: "email must be alphanumeric." });

// if update password, hash the password before save
if (req.body.password) {
const hashedPwd = await bcrypt.hash(req.body.password, 10); req.body.password = hashedPwd;
}

// Find User and update it with the request body
try {
const foundUser = await User.findOneAndUpdate(
{ email: req.params.email }, req.body,
{
  upsert: false,
  returnOriginal: false,
} );
if (!foundUser) {
return res.status(404).send({
error: "User not found with email " + req.params.email, });
}
return res.json(foundUser); } catch (err) {
if (err.kind === "ObjectId") { return res.status(404).send({
error: "User not found with email " + req.params.email, });
}
return res.status(500).send({
error: "Error updating User with email " + req.params.email, });
} };



// Find a single user with email
export const get = (req, res) => { 
  const email = req.params.email; 
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
return res.status(404).send({
error: "User not found with email " + email,
}); 
}
res.json(user); // default status = 200 
})
.catch((err) => {
return res.status(500).send({
error: "Error retrieving user with email " + email,
 });
}); 
};

export const list = async (req, res) => {
   const result = await User.find(); 
   console.log("result");
   console.log(result);
   return res.json(result);
};