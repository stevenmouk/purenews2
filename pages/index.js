import Bottom from "@/components/Bottom";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import fs from "fs";
import matter from "gray-matter";
import { Archivo } from "next/font/google";
import Head from "next/head";
import path from "path";

const archivo = Archivo({ subsets: ["latin"], weight: "800" });

export const sortByDate = (a, b) => {
  return new Date(b.frontmatter.page_date) - new Date(a.frontmatter.page_date);
};

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <link rel="icon" type="image/png" href="/fave_pac/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/fave_pac/favicon.svg" />
        <link rel="shortcut icon" href="/fave_pac/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/fave_pac/apple-touch-icon.png" />
        <link rel="manifest" href="/fave_pac/site.webmanifest" />
        <meta name="google-adsense-account" content="ca-pub-5014630772635761" />

        <title>Pure News</title>
        <meta
          name="description"
          content="Stay informed with Pure News, your trusted source for the latest news. Explore a diverse range of articles covering stocks, markets, tech, personal finance, and more. Our expert analysis and in-depth reporting will keep you up-to-date with the ever-changing world of finance."
        />
        <script
          type="text/javascript"
          src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=319fd5771af9cff8bcb1a96167a40b3de15e3152"
        ></script>
      </Head>

      <Navbar />
      <div className="px-10">
        <Main articles={posts.slice(0, 15)} />
        <div className=" flex items-center justify-center">
          <div className="xs:max-w-[700px] max-w-[300px]">
            <Bottom articles={posts.slice(16, posts.length)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("post"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(path.join("post", filename), "utf-8");

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
