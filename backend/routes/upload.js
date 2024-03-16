import express from "express"
import { dellAFile, getAllFiles, getDownloadLink } from "../controllers/upload.js";
import uploadFilesMiddleware from "../middlewares/upload.js";

const router = express.Router();

router.post("/upload", uploadFilesMiddleware);
router.get("/", getAllFiles);
router.get("/:fileId", getDownloadLink);
router.post("/:fileId", dellAFile);

export default router;