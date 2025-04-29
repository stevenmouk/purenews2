import Image from "next/image";

import Navbar from "@/components/Navbar";
import Seohead from "@/components/seoHead";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";
import Head from "next/head";

export default function Article({
  frontmatter: {
    title,
    des,
    page_date,
    blog_url,
    img_alt,
    twitter_tittle,
    twitter_des,
    figure_author,
    figure_author_url,
    figure_license,
    figure_license_url,
    page_image_src_rel,
    img_url_full,
    figure_p,
  },
  slug,
  content,
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: des,
    image: [img_url_full], // Needs to be full URL
    datePublished: new Date(page_date).toISOString(),
    dateModified: new Date(page_date).toISOString(), // If you have updates, set actual modified date
    author: {
      "@type": "Organization",
      name: "The Manhattan Times", // <-- your site's name
      url: "https://mhtntimes.com", // <-- your site's homepage
    },
    publisher: {
      "@type": "Organization",
      name: "The Manhattan Times",
      logo: {
        "@type": "ImageObject",
        url: "https://mhtntimes.com/fave_pac/favicon.ico", // Replace with your real logo URL
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blog_url || `https://mhtntimes.com/${slug}`,
    },
  };

  return (
    <div>
      <Seohead
        title={title}
        des={des}
        blogURL={blog_url}
        imgURL={img_url_full}
        imgAlt={img_alt}
        twitterTittle={twitter_tittle}
        twitterDes={twitter_des}
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Navbar inArticle={true}></Navbar>

      <main>
        <div className="snipcss-KyDIr mt-10">
          <div className="ArticleHero_defaultArticleLockup__O_XXn">
            <div className="ArticleHero_title__altPg ">
              <h1 className="ArticleTitle_root__Nb9Xh text-center">{title}</h1>
            </div>

            <div className="ArticleHero_byline__vNW7C ">
              <div className="ArticleBylines_root__CFgKs">
                {/* By <span className="ml-1">Maxwell Evergreen</span> */}
              </div>
            </div>
          </div>
          <div className="ArticleLeadArt_root__3PEn8">
            <figure className="ArticleLeadFigure_root__P_6yW ArticleLeadFigure_standard__y9U3a">
              <div className="relative w-full  aspect-[70/45] ">
                <Image
                  src={page_image_src_rel}
                  alt={img_alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                {figure_p} Photo by{" "}
                <a
                  className="underline"
                  href={figure_author_url}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  {figure_author}
                </a>{" "}
                licensed under{" "}
                <a
                  className="underline"
                  href={figure_license_url}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  {figure_license}
                </a>
                .
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          <time className="ArticleTimestamp_root__KjSeU snipcss-BLihP  w-[400px] md:w-[600px]">
            {new Date(page_date)?.toDateString()}
          </time>

          {/* <Signup /> */}
          <div className="text_content w-[300px] xs:w-[400px]  md:w-[600px]  ">
            <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
          </div>
        </div>
      </main>
      <div className=" flex items-center justify-center pt-20">
        <div className="xs:max-w-[700px] max-w-[300px]">
          {/* <Bottom articles={articles2} /> */}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("post"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join("post", slug + ".md"), "utf-8");

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}

// export async function getServerSideProps({ params }) {
//   try {
//     // Make the API call to fetch the article data
//     const res = await fetch(`${process.env.LOCAL}/api/${params.slug}`);
//     const article = await res.json();

//     const res2 = await fetch(`${process.env.LOCAL}/api/slugarticles`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ excludedId: article._id }),
//     });
//     const articles2 = await res2.json();

//     const filteredArticles = articles2.map(({ img_url, title, timestamp, path }) => ({
//       img_url,
//       title,
//       timestamp,
//       path,
//     }));

//     // Return the formatted article data as props
//     return {
//       props: {
//         article: article,
//         slugart: articles2,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {},
//     };
//   }
// }
