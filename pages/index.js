import Image from "next/image";
import { Archivo } from "next/font/google";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Main from "@/components/Main";
import Bottom from "@/components/Bottom";
import { useEffect, useState } from "react";
import Head from "next/head";

const archivo = Archivo({ subsets: ["latin"], weight: "800" });

export default function Home({ articles }) {
  const [articles1, setArticles1] = useState([]);

  const [articles2, setArticles2] = useState([]);

  useEffect(() => {
    const formattedArticles = articles.map((article) => {
      const { img_url, title, timestamp, path } = article;
      const date = new Date(timestamp * 1000);
      const formattedDate = date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      });

      return {
        img_url,
        title,
        timestamp: formattedDate,
        path,
      };
    });

    const slicedArticles = formattedArticles.slice(0, 15);
    setArticles1(slicedArticles);
    setArticles2(formattedArticles.slice(15));
  }, [articles]);
  return (
    <div>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/fave_pac/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/fave_pac/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/fave_pac/favicon-16x16.png" />
        <link rel="manifest" href="/fave_pac/site.webmanifest" />
        <link rel="mask-icon" href="/fave_pac/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <title>Wealthy Explorer</title>
        <meta
          name="description"
          content="Stay informed with Wealthy Explorer, your trusted source for the latest in finance news. Explore a diverse range of articles covering stocks, markets, cryptocurrencies, personal finance, and more. Our expert analysis and in-depth reporting will keep you up-to-date with the ever-changing world of finance. From market trends to economic insights, Wealthy Explorer is your go-to destination for staying ahead in the financial realm. Visit us now to access the latest finance news and make informed decisions for a brighter financial future."
        />
      </Head>

      <Navbar />
      <div className="px-10">
        <Main articles={articles1} />
        <div className=" flex items-center justify-center">
          <div className="xs:max-w-[700px] max-w-[300px]">
            <Bottom articles={articles2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch the articles from the API route
  const res = await fetch(`${process.env.LOCAL}/api/articles`);
  const articles = await res.json();

  // Extract the desired properties from each article
  const filteredArticles = articles.map(({ img_url, title, timestamp, path }) => ({
    img_url,
    title,
    timestamp,
    path,
  }));

  return {
    props: {
      articles: filteredArticles,
    },
  };
}
