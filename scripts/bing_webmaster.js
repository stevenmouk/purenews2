// indexnow.js

const DOMAIN = "https://yourdomain.com"; // Replace with your domain
const API_KEY = "your-api-key"; // Replace with your actual IndexNow key

const urlsToIndex = [`${DOMAIN}/example-page-1`, `${DOMAIN}/example-page-2`];

const payload = {
  host: new URL(DOMAIN).hostname,
  key: API_KEY,
  keyLocation: `${DOMAIN}/key.txt`,
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
    console.log("✅ Successfully submitted to IndexNow:", result);
  } catch (error) {
    console.error("❌ Error submitting to IndexNow:", error.message);
  }
}

submitToIndexNow();
