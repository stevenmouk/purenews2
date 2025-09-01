import fs from "fs";
import path from "path";
import matter from "gray-matter";

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toISOString();
}

function generateSiteMap(articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
       <url>
         <loc>https://mhtntimes.com</loc>
         <lastmod>${formatDate(Date.now() / 1000)}</lastmod>
         <changefreq>daily</changefreq>
         <priority>1.0</priority>
       </url>
       ${articles
         .map((article) => {
           const publicationDate = new Date(article.frontmatter.page_date).toISOString(); // Ensure ISO format
           return `
         <url>
             <loc>${`https://mhtntimes.com/articles/${article.slug}`}</loc>
             <news:news>
               <news:publication>
                 <news:name>Pure News</news:name>
                 <news:language>en</news:language>
               </news:publication>
               <news:publication_date>${publicationDate}</news:publication_date>
               <news:title>${article.frontmatter.title}</news:title>
             </news:news>
           </url>`;
         })
         .join("")}
     </urlset>`;
}

export async function getServerSideProps({ res }) {
  // Read markdown files from the "post" directory
  const files = fs.readdirSync(path.join(process.cwd(), "post"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(path.join("post", filename), "utf-8");
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  // Generate the sitemap XML
  const sitemap = generateSiteMap(posts);

  // Set the response header to return XML
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  // No props are required since this is not rendering a React component
  return {
    props: {},
  };
}

export default function SiteMap() {
  // The React component is not used for rendering XML
  return null;
}
