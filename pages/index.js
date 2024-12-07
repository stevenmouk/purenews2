import Image from "next/image";
import { Archivo } from "next/font/google";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Main from "@/components/Main";
import Bottom from "@/components/Bottom";
import { useEffect, useState } from "react";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const archivo = Archivo({ subsets: ["latin"], weight: "800" });

export const sortByDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};

export default function Home({ posts }) {
  // console.log(posts);
  // const [articles1, setArticles1] = useState([]);

  // const [articles2, setArticles2] = useState([]);

  // useEffect(() => {
  //   const formattedArticles = articles?.map((article) => {
  //     const { img_url, title, timestamp, path } = article;
  //     const date = new Date(timestamp * 1000);
  //     const formattedDate = date.toLocaleString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //       hour: "numeric",
  //       minute: "numeric",
  //       timeZoneName: "short",
  //     });

  //     return {
  //       img_url,
  //       title,
  //       timestamp: formattedDate,
  //       path,
  //     };
  //   });

  //   const slicedArticles = formattedArticles.slice(0, 15);
  //   setArticles1(slicedArticles);
  //   setArticles2(formattedArticles.slice(15));
  // }, [articles]);
  return (
    <div>
      <Head>
        <link rel="icon" type="image/png" href="/fave_pac/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/fave_pac/favicon.svg" />
        <link rel="shortcut icon" href="/fave_pac/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/fave_pac/apple-touch-icon.png" />
        <link rel="manifest" href="/fave_pac/site.webmanifest" />

        <title>The Manhattan Times</title>
        <meta
          name="description"
          content="Stay informed with The Manhattan Times, your trusted source for the latest news. Explore a diverse range of articles covering stocks, markets, tech, personal finance, and more. Our expert analysis and in-depth reporting will keep you up-to-date with the ever-changing world of finance."
        />
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
