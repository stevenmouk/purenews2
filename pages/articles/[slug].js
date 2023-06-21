import Head from "next/head";
import Image from "next/image";
// import { Bodoni_Moda } from "next/font/google";
import Bottom from "@/components/Bottom";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// const bodi = Bodoni_Moda({ subsets: ["latin"], weight: "600" });

export default function Article({ article, slugart }) {
  const [articles2, setArticles2] = useState([]);

  useEffect(() => {
    const formattedArticles = slugart?.map((article) => {
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

    setArticles2(formattedArticles);
  }, [slugart]);
  return (
    <div>
      <Head>
        <title>{article?.title}</title>
        <meta name="description" content={article?.metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`text-[#e7131a] w-full flex items-center justify-center p-3 text-3xl`}>
        Wealthy Explorer
      </header>

      <main>
        <div className="snipcss-KyDIr mt-10">
          <div className="ArticleHero_defaultArticleLockup__O_XXn">
            <div className="ArticleHero_title__altPg ">
              <h1 className="ArticleTitle_root__Nb9Xh text-center">{article?.title}</h1>
            </div>

            <div className="ArticleHero_byline__vNW7C ">
              <div className="ArticleBylines_root__CFgKs">
                By <span className="ml-1">Maxwell Evergreen</span>
              </div>
            </div>
          </div>
          <div className="ArticleLeadArt_root__3PEn8">
            <figure className="ArticleLeadFigure_root__P_6yW ArticleLeadFigure_standard__y9U3a">
              <div className="relative w-full  aspect-[70/45] ">
                <Image src={article?.img_url} fill className="object-cover" priority />
              </div>
            </figure>
          </div>
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          <time className="ArticleTimestamp_root__KjSeU snipcss-BLihP  w-[400px] md:w-[600px]">
            {article?.timestamp}
          </time>
          <div className="text_content w-[300px] xs:w-[400px]  md:w-[600px]  ">
            <div dangerouslySetInnerHTML={{ __html: article?.text }} />
          </div>
        </div>
      </main>
      <div className=" flex items-center justify-center pt-20">
        <div className="xs:max-w-[700px] max-w-[300px]">
          <Bottom articles={articles2} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    // Make the API call to fetch the article data
    const res = await fetch(`${process.env.LOCAL}/api/${params.slug}`);
    const article = await res.json();

    const { img_url, title, timestamp, path, text } = article;
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    });

    const formattedArticle = {
      img_url,
      title,
      timestamp: formattedDate,
      path,
      text,
    };

    const res2 = await fetch(`${process.env.LOCAL}/api/slugarticles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ excludedId: article._id }),
    });
    const articles2 = await res2.json();

    const filteredArticles = articles2.map(({ img_url, title, timestamp, path }) => ({
      img_url,
      title,
      timestamp,
      path,
    }));

    // Return the formatted article data as props
    return {
      props: {
        article: formattedArticle,
        slugart: articles2,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
