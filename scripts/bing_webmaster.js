// indexnow.js

const API_KEY = "d9a070b07c20466082f3abcfc457de38"; // Replace with your actual IndexNow key

const urlsToIndex = [
  "https://pure.news/articles/apples-second-biggest-supplier-says-to-expect-empty-shelves-due-to-trump-tariffs",
];

const payload = {
  host: "pure.news",
  key: API_KEY,
  keyLocation: `https://pure.news/d9a070b07c20466082f3abcfc457de38.txt`,
  urlList: urlsToIndex,
};

async function submitToIndexNow() {
  try {
    const response = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed with status ${response.status}: ${errorText}`);
    }

    const result = await response.text();
    console.log(response.status);
    console.log("✅ Successfully submitted to IndexNow:", result);
  } catch (error) {
    console.error("❌ Error submitting to IndexNow:", error.message);
  }
}

submitToIndexNow();
