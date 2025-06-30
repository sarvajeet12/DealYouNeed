import { Deal } from "../model/deal.js";
import { calculateSavings } from "../utils/calculateSaving.js";


// Get Verified Deals
export const getDeals = async (req, resp) => {
    try {
        const { category, minCashback, sortBy } = req.query;

        let filter = {};
        filter.isVerified = true;

        if (category) {
            filter.category = category
        };
        if (minCashback) {
            filter.cashbackPercent = { $gte: Number(minCashback) }
        };

        let query = Deal.find(filter);

    
        
        if (sortBy === 'discountedPrice') {
            query = query.sort({ discountedPrice: 1 })
        };
        
        const deals = await query;

        resp.status(200).json({
            success: true,
            response: deals
        });


    } catch (error) {

        console.log("Error occur while getting deals", error);

        resp.status(500).json({
            success: false,
            message: "Error occur while getting deals",
            error: error.message
        });
    }
}


// Create Deals
export const createDeal = async (req, resp) => {
    try {
        const {
            title, description, logoUrl, category,
            originalPrice, discountedPrice, cashbackPercent
        } = req.body;

        const youSavePercent = calculateSavings(originalPrice, discountedPrice);

        const newDeal = await Deal.create({
            title,
            description,
            logoUrl,
            category,
            originalPrice,
            discountedPrice,
            cashbackPercent,
            youSavePercent
        });

        resp.status(201).json({
            success: true,
            message: "Deals created successfully",
            response: newDeal
        });

    } catch (error) {
        console.log("Error occur while create deals", error);

        resp.status(500).json({
            success: false,
            message: "Error occur while create deals",
            error: error.message
        });
    }
}


// Update to Verified Deals
export const verifyDeal = async (req, resp) => {
    try {
        const dealId = req.params.id;

        const { isVerified } = req.body;

        const deal = await Deal.findByIdAndUpdate(dealId, { isVerified }, { new: true });

        if (!deal) {
            return resp.status(404).json({ success: false, error: "Deal not found" })
        };

        resp.json(deal);
    } catch (error) {
        console.log("Error occur while verified deal", error);

        resp.status(500).json({
            success: false,
            message: "Error occur while verified deal",
            error: error.message
        });
    }
}