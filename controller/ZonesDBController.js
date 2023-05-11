import Zones from "../model/ZonesDB.js";


export const list = (req, res) => {
  Zones.find()
.then((result) => res.json(result))
.catch((err) => res.status(500).send({ errors: "Server Error" }));
};



// add new zones
export const create = (req, res) => {
      let zone = new Zones(req.body);
      zone
        .save()
        .then(() => res.json(zone))
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

// Find a zone with an id
export const get = (req, res) => {
    const id = req.params.id;
  Zones.findOne({ id: id })
    .then((zone) => {
      if (!zone) {
        return res.status(404).send({
          errors: "Zone not found with id " + id,
}); }
      res.json(zone); // default status = 200
    })
    .catch((err) => {
      return res.status(400).send({
        errors: "Error retrieving Zone with id " + id,
      });
}); };


// Update a zone by  id 
export const put = (req, res) => {
    // Validate Request
    const data = req.body || {};
    console.log(data);
  if (!data || data.id != req.params.id)
  return res.status(422).send({ errors: "request data missmatch with body or body not found." });
  // Find zone and update it with the request body
    Zones.findOneAndUpdate(
      { id: req.params.id },
      { $set: data },
      {
  upsert: false, // update only (if not found, NOT insert)
  // { upsert: true, // insert new if not foud
  returnOriginal: false, // return the new record if false otherwise the original
  } 
  )
  .then((zone) => {
    if (!zone) {
return res.status(404).send({
errors: "Zone not found with id " + req.params.id,
}); }
    res.json(zone);
  })
  .catch((err) => {
    if (err.kind === "ObjectId") {
return res.status(404).send({
errors: "Object not found with id " + req.params.id,
}); }
return res.status(500).send({
errors: "Error updating Zone with id " + req.params.id,
}); });
};

export const remove = (req, res) => {
    const data = req.body || {};
    console.log("Data", data);
    if (!data || data.id != req.params.id)
  return res.status(422).send({ errors: "request data missmatch with body or body not found." }); Zones.deleteOne({ id: data.id })
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

