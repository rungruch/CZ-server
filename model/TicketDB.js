import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

var TicketSchema = mongoose.Schema({
  Ticketid: { type: String, unique: true, required: true },
  TicketType: { type: String, required: true },
  Date: { type: String, required: true },
  Price: { type: Number, required: true },
  Remaining: { type: Number, required: true },
});
// compile the schema into a model, or a class that we can do things on.
let Ticket = mongoose.model("Ticket", TicketSchema, "Ticket");
export default Ticket;
