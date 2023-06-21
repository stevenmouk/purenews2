//pages/sitemap.xml.js

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toISOString();
}

function generateSiteMap(articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:meta="http://www.google.com/schemas/sitemap/0.9">
       <!--We manually set the two URLs we know already-->
       <url>
         <loc>https://wealthyexplorer.com</loc>
         <lastmod>${formatDate(Date.now() / 1000)}</lastmod>
         <changefreq>daily</changefreq>
         <priority>1.0</priority>
       </url>
     
       ${articles
         .map((article) => {
           return `
         <url>
             <loc>${`${process.env.LOCAL}/articles/${article.path}`}</loc>
             <lastmod>${formatDate(article.timestamp)}</lastmod>
       
             <priority>0.5</priority>
             <news:news>
               <news:publication>
                 <news:name>Wealthy Explorer</news:name>
                 <news:language>en</news:language>
               </news:publication>
               <news:publication_date>${formatDate(article.timestamp)}</news:publication_date>
               <news:title>${article.title}</news:title>
               <news:keywords>${article.meta}</news:keywords>
             </news:news>
             <meta:description>${article.meta}</meta:description>
           </url>
         `;
         })
         .join("")}
     </urlset>
   `;
}
function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const result = await fetch("process.env.LOCAL/api/articles");
  const articles = await result.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(articles);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
