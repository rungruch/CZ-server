import * as mongooseDef from "mongoose"; 
let mongoose = mongooseDef.default;

var ZonesSchema = mongoose.Schema({ 
category: String,
id: { type: String, unique: true, required: true },
name: String,
detail: String,
  imgURL: String,
});
// compile the schema into a model, or a class that we can do things on.
let Zones = mongoose.model('Zones', ZonesSchema, 'zones'); 
export default Zones;