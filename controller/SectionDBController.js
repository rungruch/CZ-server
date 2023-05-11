// file: controller/SectionController.js
import Zones from "../model/ZonesDB.js"; 
import Sections from "../model/SectionDB.js";


// Create and Save a new Section
export let create = async (req, res) => {
    var newsection = req.body;
    var { zoneID } = newsection;
    var { Section } = newsection;
    try {
        const zones = await Zones.find({
        id: { $in: zoneID }, }).exec();
        //const now = Date.now();
        if (zones && zones?.length > 0) {

       const checkSec = await Sections.findOne(
        {zoneID:zones[0]._id}
       ).exec()

       if(!checkSec) //check if that zone-section has already exist.
       {
        let newsection = new Sections({
          zoneID:zones[0]._id, 
          Section: Section
          });
          
              const result = await newsection.save(); if (result) {
              const sections = await Sections.find({ _id: result._id }) 
              .populate({ path: "zoneID", select: "name" }) 
              .exec();
              if (sections) { console.log(JSON.stringify(sections, null, "\t")); res.json(sections);
              }
              } else {
              return res.status(400).send({ errors: "Cannot process the order",
              }); }
       }
       else{
          //check duplicate between new section and oldsection
          Section.forEach(newObj => {
            const found = checkSec.Section.some(sectionObj=> sectionObj.Name === newObj.Name )
            if(!found)
            {
              checkSec.Section.push(newObj)
            }
          });
          Sections.findOneAndUpdate(
            {zoneID:zones[0]._id},
            {Section : checkSec.Section},
            { upsert: false, 
            returnOriginal: false, }
          )
          .then((sectionupdate)=>{
            if(!sectionupdate)res.status(400).send({errors:"cannot add new section"});
            res.json(sectionupdate)
          })
       }
}
    else{
      res.status(404).send({errors:"zone not found"})
    }
      } catch (err) {
    return res.status(400).send({
    errors: "Cannot process the order" + err.name,
    }); }
    };

        
    export let list = (req, res) => {
        Sections.find({}) // search without condition 
        .populate("zoneID") 
        .exec()
.then((sections) => {
if (sections) res.json(sections); else {
res.status(500).send({
errors: "Some error occurred while retrieving",
}); }
}); };

export let listSection = async (req,res)=>{
      const zoneid=req.params.zoneID;
      try{
        const zone = await Zones.find({
          id:{$in:zoneid}}).exec();

          if(zone&& zone?.length > 0){
            Sections.findOne({zoneID:zone[0]._id})
            .then((section)=>{
              if(!section){
                return res.status(404).send({
                  errors:"section not found"
                })
              }
              return res.json(section);
            })
          }
      }
      catch (err){
        return res.status(404).send({
          errors:"cannot find section"+err.name,
        })
      }
}

export let remove = async (req,res)=>{
    const data = req.body || {};
    if(!data || data.zoneID!=req.params.zoneID || data.section!=req.params.section)
    {
      return res.status(422).send({ errors: "request data missmatch with body or body not found." });
    }
    try{
      var {zoneID} = data;
      var {section} =data;
      const zone = await Zones.find({
        id:{$in:zoneID}}).exec();
        if(zone&&zone?.length>0)
        {
          Sections.findOneAndUpdate({zoneID:zone[0]._id,"Section.Name":section},
            {$pull: {Section: {Name: {$in: section}}}},
            { upsert: false, 
            returnOriginal: false, })
          .then((section)=>{
            if(!section)
            {
              return res.status(404).send({errors:"cannot found data to remove."});
            }
            res.json(section)
          })
          .catch((err)=>{
            if(err.kind==='ObjectId'){
              return res.status(404).send({errors : "Object not found"})
            }
            return res.status(500).send({errors:"cannot remove section"});
          })
        }
    }
    catch (err)
    {
      return res.status(404).send({errors:"cannot find data to remove."+err.name,});
    }
    
}

export let put = async (req,res)=>{
  const data = req.body || {};
  console.log(data);

  if(!data || req.params.id != data.ZoneID || data.sectionName!=req.params.section)
  {
    return res.status(422).send({ errors: "request data missmatch with body or body not found." });
  }
  var{zoneID} = data;
  var{sectionName}=data;
  var{section} = data;
  try{
    const zone = await Zones.find({
    id:{$in:zoneID}}).exec();
    if(zone && zone?.length>0)
    {
      Sections.findOneAndUpdate(
        {zoneID:zone[0]._id,"Section.Name":sectionName},
        {$set : {'Section.$':section}},
        {upsert: false , returnOriginal:false}
      )
      .then((section)=>{
        if(!section)return res.status(404).send({error:"Section not found"});
        res.json(section);
      })
      .catch((err)=>{
        if (err.kind==="ObjectId")
        {
          return res.status(404).send("Object not found");
        }
        return res.status(500).send({errors:"cannot update section information"})
      })
    }
    else{
    return res.status(404).send({errors: "cannot found zone"})
    }
  }
  catch (err)
  {
    return res.status(404).send({
      errors:"cannot find and update."+err.name,
    })
  }
  
}

export let get= async (req,res)=>{
  const zoneid = req.params.zoneID;
  const section = req.params.section;

  try{
    const zone = await Zones.find({
      id:{$in:zoneid}}).exec();
      console.log("section="+section)
      if (zone&&zone?.length>0)
      {
        Sections.findOne(
          {zoneID:zone[0]._id,"Section.Name":section},
          {"Section.$":1}
        )
        .then((section)=>{
          if(!section) return res.status(404).send({errors : "section not found"});
          res.json(section.Section[0])
        })
      }

  }
  catch (err)
  {
    return res.status(404).send({
      errors:"cannot find zone or zone not have any section."+err.name,
    })
  }

}