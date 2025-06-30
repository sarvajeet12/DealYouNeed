import express from "express"
const router = express.Router();

// Import Controller Path
import { getDeals, createDeal, verifyDeal } from "../controller/deal.js";

// Import auth middleware 
import { adminAuth } from "../middleware/auth.js";



//Get Verified Deals 
router
    .route("/")
    .get(getDeals);


// Create Deals
router
    .route("/")
    .post(adminAuth, createDeal);


// Update to verify deals
router
    .route("/:id/verify")
    .patch(adminAuth, verifyDeal);



export default router
