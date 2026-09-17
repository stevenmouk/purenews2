import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Head from "next/head";
import Parser from "rss-parser";

export default function Home({ newsItems }) {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <link rel="icon" type="image/png" href="/fave_pac/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/fave_pac/favicon.svg" />
        <link rel="shortcut icon" href="/fave_pac/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/fave_pac/apple-touch-icon.png" />
        <link rel="manifest" href="/fave_pac/site.webmanifest" />
        <title>Pure News | Breaking News Delivered</title>
        <meta name="description" content="Stay informed with Pure News, your trusted source for the latest breaking news delivered straight to your inbox." />
      </Head>

      <main className="w-full min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 flex flex-col items-center justify-center -mt-10 py-12">
          <Hero />
        </div>

        <div className="w-full bg-gray-50 py-20 px-6 border-t border-gray-200">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-10 text-center">
              Latest World Headlines
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems && newsItems.map((item, i) => (
                item.imageUrl ? (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden h-full">
                    <div className="w-full h-48 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-[#1b7340] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs font-mono text-[#1b7340] mb-2">{new Date(item.pubDate).toLocaleDateString()}</p>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#1b7340] transition-colors line-clamp-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                        {item.contentSnippet}
                      </p>
                    </div>
                  </a>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const parser = new Parser({
      customFields: {
        item: [
          ['media:thumbnail', 'mediaThumbnail', { keepArray: true }],
          ['description', 'description']
        ]
      }
    });

    // Fetch from BBC World News (Free, non-paywalled source)
    const feed = await parser.parseURL('http://feeds.bbci.co.uk/news/world/rss.xml');

    // Process items, finding ones with images
    const items = feed.items.map(item => {
      let imageUrl = null;
      if (item.mediaThumbnail && item.mediaThumbnail.length > 0 && item.mediaThumbnail[0]['$'] && item.mediaThumbnail[0]['$'].url) {
        // BBC provides 240px thumbnails by default. Replace /240/ with /1024/ for high-res images.
        imageUrl = item.mediaThumbnail[0]['$'].url.replace('/240/', '/1024/');
      }

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate || new Date().toISOString(),
        contentSnippet: item.description || item.contentSnippet || "Click to read the full developing story.",
        imageUrl: imageUrl,
      };
    }).filter(item => item.imageUrl); // Ensure we only keep items with images

    // Get up to 9 articles to fill out the grid nicely
    const newsItems = items.slice(0, 9);

    return {
      props: {
        newsItems,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return {
      props: {
        newsItems: [],
      },
      revalidate: 60, // Try again sooner if there was an error
    };
  }
}
