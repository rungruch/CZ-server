import Ticket from "../model/TicketDB.js";


export const list = (req, res) => {
  Ticket.find()
.then((result) => res.json(result))
.catch((err) => res.status(500).send({ errors: "Server Error" }));
};



// add new Ticket
export const create = (req, res) => {
      let ticket = new Ticket(req.body);
      ticket
        .save()
        .then(() => res.json(ticket))
        .catch((err) => {
    if (err.name === "MongoServerError" && err.code === 11000) { 
        let errors = {
    error:
    "A duplicate key error on field: " + Object.keys(err.keyPattern)[0],
    };
            return res.status(400).send(errors);
          } else if (err.name === "ValidationError") {
    let errors = {}; Object.keys(err.errors).forEach((key) => {
              errors[key] = err.errors[key].message;
            });
            return res.status(400).send(errors);
          }
    res
    .status(500)
    .send({ errors: "Something went wrong " + err.name + " " + err.code });
    }); 
};

// Find a ticket with an id
export const get = (req, res) => {
    const id = req.params.id;
  Ticket.findOne({ Ticketid: id })
    .then((ticket) => {
      if (!ticket) {
        return res.status(404).send({
          errors: "Ticket not found with id " + id,
}); }
      res.json(ticket); // default status = 200
    })
    .catch((err) => {
      return res.status(400).send({
        errors: "Error retrieving ticket with id " + id,
      });
}); };


// Find a ticket with date
export const getdate = (req, res) => {
    const date = req.params.date;
  Ticket.find({ Date: date })
    .then((ticket) => {
      if (!ticket || ticket.length == 0) {
        return res.status(404).send({
          errors: "Ticket not found with date: " + date,
}); }
      res.json(ticket); // default status = 200
    })
    .catch((err) => {
      return res.status(400).send({
        errors: "Error retrieving ticket with date " + date,
      });
}); };

// Find a ticket with date
export const getdatetype = (req, res) => {
  const TicketType = req.params.TicketType;
  const date = req.params.Date;
Ticket.find({ Date: date, TicketType: TicketType })
  .then((ticket) => {
    if (!ticket || ticket.length == 0) {
      return res.status(404).send({
        errors: "Ticket not found with date: " + date,
}); }
    res.json(ticket); // default status = 200
  })
  .catch((err) => {
    return res.status(400).send({
      errors: "Error retrieving ticket with date " + date,
    });
}); };


// Update a ticket by  id 
export const put = (req, res) => {
    // Validate Request
    const data = req.body || {};
    console.log(data);
  if (!data || data.Ticketid != req.params.id)
  return res.status(422).send({ errors: "request data missmatch with body or body not found." });
  // Find Ticket and update it with the request body
    Ticket.findOneAndUpdate(
      { Ticketid: req.params.id },
      { $set: data },
      {
  upsert: false, // update only (if not found, NOT insert)
  // { upsert: true, // insert new if not foud
  returnOriginal: false, // return the new record if false otherwise the original
  } 
  )
  .then((ticket) => {
    if (!ticket) {
return res.status(404).send({
errors: "Ticket not found with id " + req.params.id,
}); }
    res.json(ticket);
  })
  .catch((err) => {
    if (err.kind === "ObjectId") {
return res.status(404).send({
errors: "Object not found with id " + req.params.id,
}); }
return res.status(500).send({
errors: "Error updating Ticket with id " + req.params.id,
}); });
};

export const remove = (req, res) => {
    const data = req.body || {};
    console.log("Data", data);
    if (!data || data.Ticketid != req.params.id)
  return res.status(422).send({ errors: "request data missmatch with body or body not found." }); Ticket.deleteOne({ Ticketid: data.Ticketid })
      .then((r) => {
        if (r.acknowledged && r.deletedCount >= 1)
          return res.status(200).send({ success: true });
        else
  return res
  .status(200)
  .send({ success: "Record doesn't exist or already deleted" });
      })
      .catch((err) => {
        return res.status(404).send({
          errors: err.name,
  }); });
  };

