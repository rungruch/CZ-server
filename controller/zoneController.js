import Zones from "../model/Zones.js";

export const list = (req,res)=>{

    Zones.find().then(result=>res.json(result))

}