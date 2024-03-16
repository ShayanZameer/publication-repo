import express from "express";
import { addPayment, getToken, } from "../controllers/paymentController.js";


const router = express.Router();

router.post("/token", getToken);
// router.get("/bsecure/token", bsecureToken); 
// router.post("/checkout", goToCheckOut);

export default router;