const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb+srv://sudarsanamg762004:HyjvpxYNer2bKeWz@cluster0.7m2rc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    await mongoose.connect("mongodb+srv://sudarsanamg762004:cfQMcjOt5vxczeNL@cluster0.iwuir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sudarsanamg762004:yzbC7maG5Hg8nHrc@cluster0.7m2rc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

module.exports = connectDB;




