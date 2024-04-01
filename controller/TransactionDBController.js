import User from "../model/UserDB.js";
import Transaction from "../model/TransactionDB.js";

export let create = async (req, res) => {
  var newtransaction = req.body;

  var { email } = newtransaction;
  try {
      const user = await User.find({
        email: { $in: email }, }).exec();
      if (user) {
      let createtransaction = new Transaction({
      Transactionid: newtransaction.Transactionid,
      idref:user[0]._id,
      email:user[0].email, 
      TicketType: newtransaction.TicketType,
      quantity: newtransaction.quantity,
      TotalPrice: newtransaction.TotalPrice,
      VisitDate: newtransaction.VisitDate,
});
  const result = await createtransaction.save(); 
  res.json(result);
}
  } catch (err) {
  return res.status(400).send({
  errors: "Cannot process the order " + err.name,
  }); }
  };

export let list = (req, res) => {
      Transaction.find({}) // search without condition 
        .populate("idref") 
        .exec()
.then((Transaction) => {
if (Transaction) res.json(Transaction); else {
res.status(500).send({
errors: "Some error occurred while retrieving",
}); }
}); };

// Find a zone with an id
export const get = (req, res) => {
  const id = req.params.id;
  Transaction.find({ idref: id })
  .then((transaction) => {
    if (!transaction) {
      return res.status(404).send({
        errors: "transaction not found with id " + id,
}); }
    res.json(transaction); // default status = 200
  })
  .catch((err) => {
    return res.status(400).send({
      errors: "Error retrieving Zone with id " + id,
    });
}); };