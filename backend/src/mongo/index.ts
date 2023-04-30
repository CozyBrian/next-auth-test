import mongoose from "mongoose";

async function MongoInit() {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB");
    console.error(err);
  })
}

export default MongoInit;