const { Console } = require('console');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://coursebidder:Generativeai1@coursebidder.gb7lsik.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

console.log("Her!e");


/*
install formiks
const name = input()
if (!db.find(name)):
    return <div> profile pic <div>;

listing = db.getlisting(user);
<div listing.price <div>
<div> listing.user.name <div>

*/

async function addUser(usrnm, pwd) {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      
      const dbName = 'CourseBidder';

      // Connect to the database
      const db = client.db(dbName);

      const collectionName = 'users'; // Replace 'yourCollection' with the actual collection name

      const existingUser = await db.collection(collectionName).findOne({ username: usrnm });
      if (existingUser) {
        console.log('Username already exists. Exiting...');
        return;
      }
      // Your document object (item to be added to the collection)
      const myobj = { username: usrnm, password: pwd };



     // const cursor = db.collection(collectionName).find();

      // Iterate over the documents and log each one
    //  const documents = await db.collection(collectionName).find().toArray();

        // Log the array of documents
    //  console.log(documents);

      const result = await db.collection(collectionName).insertOne(myobj);

 //     console.log("1 document inserted with ID:", result.insertedId);


    }catch (error) {
        console.error("Error:", error);



    }finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }


  async function searchClass(department, id) {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      
      const dbName = 'CourseBidder';

      // Connect to the database
      const db = client.db(dbName);

      const collectionName = 'users'; // Replace 'yourCollection' with the actual collection name

      // Your document object (item to be added to the collection)
      const myobj = { username: usrnm, password: pwd };

     // const cursor = db.collection(collectionName).find();

      // Iterate over the documents and log each one
    //  const documents = await db.collection(collectionName).find().toArray();

        // Log the array of documents
    //  console.log(documents);

      const result = await db.collection(collectionName).insertOne(myobj);

 //     console.log("1 document inserted with ID:", result.insertedId);


    }catch (error) {
        console.error("Error:", error);



    }finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  addUser("atijmahesh", "PENISPENISPENIS");

const fs = require('fs');
const path = require('path');
async function importJsonToMongoDB() {
  const dbName = 'CourseBidder';
  const collectionName = 'Classes';
  const uri = 'mongodb+srv://coursebidder:Generativeai1@coursebidder.gb7lsik.mongodb.net/';
  const filePath = path.join(__dirname, 'scrape', 'ucla_classes.json');

  // Read the JSON file
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Ensure jsonData is an object
  if (!Object.keys(jsonData).length) {
    throw new Error('JSON data must be an object with department keys.');
  }

  // Connect to MongoDB
  const client = new MongoClient(uri); // Remove deprecated options

  try {
    await client.connect();

    // Select the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Iterate through departments and classes
    for (const department in jsonData) {
      const departmentClasses = jsonData[department];

      for (const classData of departmentClasses) {
        const classDocument = {
          departmentId: `${department} ${classData.id}`, // Combine department and ID
          name: classData.name,
        };

        // Insert each class as a separate document
        await collection.insertOne(classDocument);
      }
    }

    console.log('Data imported successfully.');
  } finally {
    await client.close();
  }
}

// Call the function to import JSON to MongoDB
importJsonToMongoDB();

  