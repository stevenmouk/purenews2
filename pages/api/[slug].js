import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    // Extract the slug from the request parameters
    const { slug } = req.query;
    // console.log(slug);

    // Query the database for the article with the matching slug
    const article = await db.collection("articles").findOne({ path: slug });
    // console.log(article);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
