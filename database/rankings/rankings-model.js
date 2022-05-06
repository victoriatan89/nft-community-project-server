import mongoose from "mongoose";
import rankingsSchema from "./rankings-schema.js";

const rankingsModel = mongoose.model('RankingsModel', rankingsSchema);

export default rankingsModel;