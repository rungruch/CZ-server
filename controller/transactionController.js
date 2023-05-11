import tracsaction from '../model/Transaction.js'; 
import bcrypt from 'bcrypt';

export const list = async (req, res) => { 
    const result = await tracsaction.find();
    return res.json(result); 
};


// add new Transaction
export const create = (req, res) => {
 tracsaction.insert(req.body).then(()=> {return res.send({success: "Create Successfully"})})
}

// Find a single user with email
export const get = (req, res) => {
  const id = req.params.id; 
 tracsaction.findTicket({id: id})
  .then(user => {
    if (!user) {
      return res.status(404).send({
        error: "Transaction not found with " + id 
      });
    }
    res.json(user); // default status = 200 
  })
  .catch(err => {
    return res.status(500).send({
    
      error: "Error retrieving user with id " + id
    }); 
  });
};


// Update a user identified by the email in the request
/*
export const put = (req, res) => {
    // Validate Request
    const data = req.body || {}; 
    console.log(data, req.params.email); 
    if (!data || !req.params.email)
     return res.status(422).send({error: 'email must be alphanumeric.'});
     // Find Product and update it with the request body 
   tracsaction.findAndUpdate(req.params.email, req.body, true)
    .then(user => {
        if(!user) {
         return res.status(404).send({
            error:  tracsaction not found with email " + req.params.email 
        });
    }
        res.send(user);
      }).catch(err => {
        if(err.kind === 'ObjectId') { 
            return res.status(404).send({
                error:  tracsaction not found with email " + req.params.email 
            });
        }
         return res.status(500).send({
                 error: "Error updating tracsaction with email " + req.params.email 
                });
    }); 
};*/