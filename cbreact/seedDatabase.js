const faker = require("./node_modules/faker");
const { ObjectId } = require('mongodb');
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    // Connection URL
    const uri = "mongodb+srv://coursebidder:Generativeai1@coursebidder.gb7lsik.mongodb.net/CourseBidder?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const chosenClass = "HIST 1B"
        const numList = 110;
    

        const collection = client.db("CourseBidder").collection("classes");

        const course = await collection.findOne( {departmentId: chosenClass});

        if (course){
            console.log("Found Course: ", chosenClass)
        } else {
            console.log("Did not find any course.")
            return;
        }

        let fake_listings = [];

        for (let i = 0; i < numList; i++) {
            let entry = {
                _id: new ObjectId(),
                email: faker.internet.email(),
                departmentId: chosenClass,
                price: randomIntFromInterval(30,80),
                timePosted: faker.date.past(),
            }

            fake_listings.push(entry);
           
        }
        
        console.log(fake_listings[0]);

        await collection.updateOne( { departmentId: chosenClass } , { $set: { listings: fake_listings}} ); 
        
        console.log("Database seeded.")
        client.close();



        // collection.insertMany(timeSeriesData);

        // console.log("Database seeded! :)");
        // client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();