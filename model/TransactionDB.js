import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

var TransactionSchema = mongoose.Schema({
  Transactionid: { type: String, unique: true, required: true },
  idref: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',},
  email: { type: String, required: true},
  TicketType: { type: String, required: true },
  quantity: { type: Number, required: true },
  TotalPrice: { type: Number, required: true },
  VisitDate: { type: String, required: true },
  Timestamp: {type: String, default: new Date(Date.now()).toLocaleString()},
});
// compile the schema into a model, or a class that we can do things on.
let Transaction = mongoose.model("Transaction", TransactionSchema, "Transaction");
export default Transaction;
