import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;
const sectionSchema = new mongoose.Schema({
    // SectionID: String,
zoneID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zones',
    },
    Section: [{
        Name: String,
        Detail: String,
        imgURL: String,
   }],
});
let Sections = mongoose.model('Sections', sectionSchema, 'Sections'); 
export default Sections;