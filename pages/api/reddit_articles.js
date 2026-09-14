export default async function handler(req, res) {
    try {
        // Fetch the JSON version of the Reddit URL
        const response = await fetch('https://www.reddit.com/r/worldnews/hot.json?limit=25', {
            headers: {
                // Reddit requires a custom User-Agent to avoid immediate blocks
                'User-Agent': 'PureNewsApp/1.0.0 (Node.js)'
            }
        });

        if (!response.ok) {
            throw new Error(`Reddit API responded with status: ${response.status}`);
        }

        const json = await response.json();

        // Filter out stickied posts (usually sub announcements)
        const validPosts = json.data.children.filter(child => !child.data.stickied);

        // Parse out the useful info
        const articles = validPosts.map(child => {
            const data = child.data;

            // Extract the highest resolution image available
            let imageUrl = data.thumbnail;
            if (!imageUrl || imageUrl === 'default' || imageUrl === 'self') {
                if (data.preview && data.preview.images && data.preview.images[0]) {
                    imageUrl = data.preview.images[0].source.url.replace(/&amp;/g, '&');
                } else {
                    imageUrl = null;
                }
            } else {
                // If there's a preview, it's usually higher res than the thumbnail
                if (data.preview && data.preview.images && data.preview.images[0]) {
                    imageUrl = data.preview.images[0].source.url.replace(/&amp;/g, '&');
                }
            }

            return {
                title: data.title,
                url: data.url,
                description: data.selftext || `Click to read the full developing story from r/${data.subreddit}.`,
                imageUrl: imageUrl,
                pubDate: new Date(data.created_utc * 1000).toISOString(),
                author: data.author,
                score: data.score
            };
        });

        console.log(articles)
        // Return the clean, parsed articles
        res.status(200).json({ articles });
    } catch (error) {
        console.error("Reddit fetch error:", error);
        res.status(500).json({ error: error.message });
    }
}
