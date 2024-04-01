import Animals from "../model/AnimalDB.js";
import Zones from "../model/ZonesDB.js";

export const create = async (req,res) =>{

    var animal = req.body;
    var { zoneid } = animal;
    var { Animal } = animal;
    
    try{
        const zone = await Zones.find(
            {
                id:{$in:zoneid}
            }
        ).exec()
        if (zone && zone?.length > 0){
            
            const checkAnimal = await Animals.findOne(
                {zoneID:zone[0]._id}
            ).exec()
            
            if(!checkAnimal)
            {
                let newAnimal = new Animals({
                    zoneID:zone[0]._id,
                    Animals:Animal
                })
                const result = await newAnimal.save();
                if(result)
                {
                    const animals= await Animals.find({_id:result._id})
                    .populate({ path: "zoneID", select: "name" }) 
                    .exec();
                    if (animals) { console.log(JSON.stringify(animals, null, "\t")); res.json(animals);
                }
                }
                else {
                    return res.status(400).send({ errors: "Cannot process the order",
                    }); }
            }
        }
    }
    catch (err)
    {
        res.status(404).send({errors:"zone not found"})
    }
}

export const list = (req,res)=>{
    Animals.find({})
    .populate("zoneID") 
    .exec()
    .then((result)=>{
        if(result)res.json(result)

        else
        {
            res.status(500).send({errors:"cannot fetch animals"});
        }
    })
}