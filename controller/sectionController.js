import Sections from "../model/Section.js";

export const list = (req , res)=>{

    Sections.find().then(result=>res.json(result));
}