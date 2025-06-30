import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    logoUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    cashbackPercent: {
        type: Number,
        required: true
    },
    youSavePercent: {
        type: Number
    },
    isVerified: {
        type: Boolean, 
        default: false
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

export const Deal = mongoose.model("deal",dealSchema)