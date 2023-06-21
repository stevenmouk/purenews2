import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const { excludedId } = req.body;

    // console.log(excludedId);

    const articles = await db
      .collection("articles")
      .find({ _id: { $ne: new ObjectId(excludedId) } })
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();

    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
