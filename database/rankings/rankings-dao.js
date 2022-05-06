import rankingsModel from "./rankings-model.js";

export const getRankings = async () => await rankingsModel.find();

export const updateRankings = async (newRankings) => {
    const ops = [];
    ops.push({ deleteMany: { "filter": {} } },)
    newRankings.forEach(collection => {
        ops.push({ insertOne: { "document": collection } },)
    });
    const status = await rankingsModel.bulkWrite(
        ops,
        { ordered: true }
    );
    return status;
}
