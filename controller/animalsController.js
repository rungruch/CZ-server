import Animals from "../model/Animal.js";

export const list = (req,res)=>{

    Animals.find().then(result=>res.json(result))

}