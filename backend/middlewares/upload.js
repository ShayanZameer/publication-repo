import multer from "multer";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import { Readable } from "stream";
import util from "util";
Grid.mongo = mongoose.mongo;
let gfs, gridfsBucket;

mongoose.connection.once("open", async () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "books",
  });
  gfs = Grid(mongoose.connection.db);
});

const uploadFileMid = async (req, res, next) => {
  try {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    upload.single("file")(req, res, async (err) => {
      if (err) {
        res.send("error in file uploading");
      }

      const readableTrackStream = await new Readable();
      await readableTrackStream.push(req.file.buffer);
      await readableTrackStream.push(null);
      let writestream = await gridfsBucket.openUploadStream(req.body.bookName);
      let bookid = await writestream.id;
      req.fileId = bookid;
      await readableTrackStream.pipe(writestream);
      await writestream.on("close", () => {
        console.log("file uploading done");
        next()
      });
    });
  } catch (error) {
    console.log(error);
    console.log("error occured");
  }
};

let uploadFilesMiddleware = util.promisify(uploadFileMid);
export default uploadFilesMiddleware;
