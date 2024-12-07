import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const articles = await db.collection("articles").find({}).sort({ timestamp: -1 }).toArray();

    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
