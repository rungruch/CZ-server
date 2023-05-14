import * as mongooseDef from "mongoose"
let mongoose = mongooseDef.default;

var animalsSchema = mongoose.Schema({
    zoneID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zones',
        },
    Animals : [
        {
            AnimalID : {
                type : String, require:true
            
            },
            AnimalName  : {
                type : String,
                require : true

            },
            Info : String,
            imgURL : String
            
        }

    ]
})

let Animals = mongoose.model('Animals',animalsSchema,'Animals');
export default Animals