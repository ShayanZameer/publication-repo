import uploadFilesMiddleware from "../middlewares/upload.js";
import mongoose from "mongoose";

var gfs = null;
mongoose.connection.once("connected", () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "books"
  });
});

export const uploadFiles = async (req, res) => {
  await uploadFilesMiddleware(req, res);

  if (req.file === undefined) {
    return res.status(400).json({
      message: "please select a file first",
      success: false,
    });
  }
  return res.status(201).json({
    message: "file uploaded",
    success: true,
  });
};

export const getAllFiles = async (req, res) => {
  try {
    const filesdata = await gfs.find().toArray();
    return res.status(200).json({
      message: "all files",
      success: true,
      files: filesdata,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error in getting all files",
      success: false,
      error: error.message,
    });
  }
};

function sanitizeFilename(filename) {
  return filename.replace(/[\\/:*?"<>|]/g, '_');
}

export const getDownloadLink = async (req, res) => {
  try {
    const fileId = req.params.fileId;

    const file = await gfs.find({
    _id: new mongoose.Types.ObjectId(fileId),
    }).toArray();

    if(!file){
        return res.send({
            message: "file not found"
        })
    }

    let updatedFilename = sanitizeFilename(file[0].filename)
    const fileStream = gfs.openDownloadStream(file[0]._id)

    res.setHeader('Content-Disposition', `attachment; filename="${updatedFilename}.pdf"`);
    res.setHeader('Content-Type', `${file.contentType}`);

    return fileStream.pipe(res);

  } catch (error) {
    res.send(error.message);
  }
};

export const dellAFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    gfs.delete(fileId, (err, data)=>{
        if(err) return res.status(404).json({message: "file not found"});
        return res.status(200).json(data);
    });
  } catch (error) {
    res.send(error.message);
  }
};
