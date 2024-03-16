import Grid from "gridfs-stream";
import mongoose from "mongoose";
Grid.mongo = mongoose.mongo;

let conn;
let gfs;
let db;
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Glorious-Publications",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    conn = mongoose.connection;
    console.log(`Database connected with ${conn.host}`);
  } catch (error) {
    console.log(error);
  }
};

const mydb = mongoose.connection;

export { db, mydb, connectDb, conn };
