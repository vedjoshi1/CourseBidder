

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
 

 

  async function getClassByID(id) {

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
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      
      const dbName = 'CourseBidder';

      // Connect to the database
      const db = client.db(dbName);

      const collectionName = 'Classes'; // Replace 'yourCollection' with the actual collection name
      const collection = db.collection(collectionName);
      const query = {
        departmentId: id,
       
      };
      const results = await collection.find(query).toArray();

   //   console.log('Search Results:', results);

      return results;

    }catch (error) {
        
        console.error("Error:", error);
    
    }finally {
      // Ensures that the client will close when you finish/error
      await client.close();
      
    }

   
  }


  async function makeListing(ide, usrnm, prc) {

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
    try {
      await client.connect();
    
      
      const dbName = 'CourseBidder';

     
      const db = client.db(dbName);

      const collectionName = 'Listings'; // Replace 'yourCollection' with the actual collection name

     
     
      const myobj = { username: usrnm, id: ide, price: prc };



    
      const result = await db.collection(collectionName).insertOne(myobj);

 
    }catch (error) {
        
        console.error("Error:", error);
    
    }finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  async function getAllListings(id) {

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
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      
      const dbName = 'CourseBidder';

      // Connect to the database
      const db = client.db(dbName);

      const collectionName = 'Listings'; // Replace 'yourCollection' with the actual collection name
      const collection = db.collection(collectionName);
      const query = {
        id: id,
       
      };
      const results = await collection.find(query).toArray();

   //   console.log('Search Results:', results);

      return results;

    }catch (error) {
        
        console.error("Error:", error);
    
    }finally {
      // Ensures that the client will close when you finish/error
      await client.close();
      
    }



  }
/*
 // addUser("vikramramesh", "TOMMYdevito");
  let classInfo = getClassByID('COM SCI M152A')
    .then(classInfo => {
      makeListing('COM SCI M152A', "vedjoshi", 700);
      makeListing('COM SCI M152A', "atijmahesh", 1200);
    })
    .catch(error => {
      console.error("Error:", error);
    });
    
  */

let classInfo = getAllListings('COM SCI M152A')
    .then(classInfo => {
      console.log(classInfo);
    })
    .catch(error => {
      console.error("Error:", error);
    });
