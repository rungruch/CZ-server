import Animals from "./AnimalDB.js";

import mongooseDbConnect from '../config/dbConnect.js'


mongooseDbConnect()

var animals = [
    {
        zoneID:1 , 
        
        Animals : [

            {
                AnimalID: 1,
                AnimalName : "Sand Tiger Shark",
                Info  : "Sand Tiger Sharks look ferocious with a mouth full of pointy teeth, but our divers regularly jump in with them because they aren't dangerous to humans. \
                They are, however, voracious predators of small fish, crustaceans and squid, feeding mostly at night and close to the ocean floor. The Sand Tiger Shark has a very \
                unique and curious habit. They come up to the surface of the water to gulp air and hold it in their stomachs. Sharks are naturally negatively buoyant which means \
                they sink if they stop swimming. Holding air in their tummy like a balloon enables Sand Tigers to float motionless in the water without sinking. So they can silently \
                drift up close to their prey and quickly snatch it in their jaws. They can grow to be over 3 metres long and are found in warm or temperate waters throughout the \
                world’s ocean, with the exception of the Eastern Pacific.",
                imgURL : "/img/assets|animals|Sand-Tiger-Shark.png"
                
            },
            {
                AnimalID: 2,
                AnimalName : "Nurse Shark",
                Info  : "To spot a Nurse Shark, look for the shark with the funny moustache! These dangley bits on their top lip are actually useful things called barbels. \
                Barbels are covered in taste buds and are very sensitive, helping the Nurse Shark to find food hidden in the sandy seabed. Most sharks must keep moving to \
                breath because they need water to flow over their gills, but Nurse Sharks can stop swimming and rest. That's because they can pump water through their mouths \
                and gills while they're sitting still. In the ocean Nurse Sharks can gather in groups of up to 40. They hide together under submerged ledges around coral reefs, \
                often piled up on top of each other. At night they become more active and venture out on their own to prey on sea snails, crustaceans, molluscs and other small fish.",
                imgURL : "/img/assets|animals|fp_Shark_Nurse.png"
            },
            {
                AnimalID: 3,
                AnimalName : "Black Tip Reef Shark",
                Info : "We love our Black Tip Reef Sharks. They’re jaw-some! With the prominent black markings on their fins, they are easy to spot.\
                        Found on the tropical coral reefs of the Indian and Pacific Oceans, Blacktip Reef Sharks prefer shallow, inshore waters.\
                        Black Tip Reef Sharks is a shark that is active and very active. They’re hunting prey in the middle of the water and water surface. \
                        Normally, they eat other fish as food by using sharp teeth structure combined with swift and active swimming while attacking .But some \
                        types of behavior may attack marine mammals such as seals or sea lions. Black Tip Reef Sharks smell very quickly especially the smell of \
                        blood and can hear sound up to 2 kilometers.",
                imgURL: "/img/assets|animals|black-tip-reef-shark.png"
            }

        ]
    },
    {
        zoneID:2 , 
        
        Animals : [

            {
                AnimalID: 1,
                AnimalName : "Clownfish",
                Info  : "Did you know that Clownfish live in the venomous tentacles of Sea Anemones?They are one of the only ocean creatures that can do this\
                as they are protected by a layer of slimy mucus on their skin! Clownfish like to live in Sea Anemones so that they are protected from predators\
                and can nibble on leftover food the Sea Anemone catches. In return, they help keep Sea Anemones and the area around them clean by eating up algae\
                and other reef debris.If you see a Clownfish couple in a Sea Anemone, the larger of the two will be the female, and the smaller the male.\
                They are called Clownfish because of their bright clown colouring and all clownfish are born as boys, once the females die the largest male will change sex.",
                imgURL : "/img/assets|animals|clown-fish.png"
                
            },
            {
                AnimalID: 2,
                AnimalName : "Lionfish",
                Info  : "Lionfish are also known as firefish. They live near coral reefs in the tropical Pacific Ocean and the Red Sea. Young often leave their home coral reefs\
                 to find a new habitat. This explains the wide distribution of the lionfish species.You can easily recognize lionfish by their special coloration and the\
                 fan-shaped pectoral fins and rays on fins and backs. Some of these rays are hard spines that contain glands with venom. Although this poison is not deadly\
                 for humans, it can lead to severe physical reactions. Since the injected toxin reacts to temperature, immersion of the affected area in hot water helps to neutralize it.\
                At nightfall it is possible in nature to find large groups of lionfish in search of food. Discover during your visit what their favorite prey is!",
                imgURL : "/img/assets|animals|lionfish.png"
            },
            {
                AnimalID: 3,
                AnimalName : "Puffer fish",
                Info : "It's hard to believe, but true: a pufferfish can more than double its body volume in a flash! This special mechanism is triggered when the fish feels\
                        threatened. Due to its large body volume, it is then almost impossible for attackers like sharks to catch it. Some pufferfish species also have spines that rise\
                        up when they inflate their bodies. A real super fish! Pufferfish are considered to be one of the most poisonous creatures on earth. They are called pufferfish\
                        because when provoked, they 'puff' or blow-up like a balloon by inhaling water.",
                imgURL: "/img/assets|animals|pufferfish.png"
            }

        ]
    },
]

Animals.insertMany (animals).then((docs)=>{
    console.log("sucessfully insert to DB")
    docs.forEach((e)=>console.log(JSON.stringify(e,null,"\t")))
    console.log("done")
    process.kill(process.pid, "SIGINT");
})
.catch((err)=>{
    console.log(err)
})