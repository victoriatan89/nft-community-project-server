import mongoose from "mongoose";

const rankingsSchema = mongoose.Schema({
    name: String,
    slug: String,
    logo: String,
    isVerified: Boolean,
    floorPrice: {
        amount: mongoose.Schema.Types.Decimal128,
        currency: String
    }
}, {collection: 'rankings'});

export default rankingsSchema;