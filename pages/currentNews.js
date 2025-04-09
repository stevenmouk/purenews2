import Image from "next/image";
import { Nunito } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
// import Faq from "@/components/Faq";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Seohead from "@/components/seoHead";
import { connectToDatabase } from "@/lib/mongodb";

const inter = Nunito({ subsets: ["latin"] });

export default function Home({ context }) {
  const [input, setInput] = useState("");
  const [article, setArticle] = useState(null);

  const router = useRouter();
  console.log(context);
  useEffect(() => {
    // const newInput = context.id.reduce((acc, part, index) => {
    //   // Add double slash after the first part, otherwise add a single slash
    //   const separator = index === 0 ? "" : index === 1 ? "//" : "/";

    //   return acc + separator + part;
    // }, "");
    setInput(context.query.article);
    setArticle(`https://archive.is/newest/${context.query.article?.trim()?.split("?")[0]}`);
  }, [context]);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.target[0].value);
    window.location.href = `/articles?article=${e.target[0].value}`;
  }

  function handleInputChange(e) {
    e.preventDefault();
    // console.log(e.target.value);
    setInput(e.target.value.split("?")[0]);
  }
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width; initial-scale=.5; maximum-scale=.5; minimum-scale=.5;"
        />
      </Head>

      <Seohead
        title="Test"
        des="test"
        blogURL="test"
        imgURL="https://mhtntimes.com/images/posts_img/amazon.webp"
        imgAlt="test"
        twitterTittle="test"
        twitterDes="test"
      />

      <div className="fixed bg-[#FFFEF0]  h-fit w-full top-0">
        <Link href="/" className="cursor-pointer">
          <div
            className={` text-rose-500 text-xl border-[2px] border-rose-500 px-3 py-3 rounded-full ${inter.className} w-fit mt-2`}
          >
            Archive Buttons
          </div>
        </Link>

        <form
          action="#"
          onSubmit={handleSubmit}
          className="w-full  flex items-center justify-center"
        >
          <div className="items-center w-[60%] mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
            <div className="relative w-full">
              <label
                htmlFor="email"
                className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Enter Article URL
              </label>
              <div className="flex absolute inset-y-0  items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                className="block p-3 pl-10 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter Article URL"
                id="email"
                value={input}
                onInput={handleInputChange}
                required
              />
            </div>
            <div>
              {/* <button
                          type="submit"
                          className="py-3 px-5  text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-red-500 border-red-500 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-red-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Search
                        </button> */}
            </div>
            <button
              type="submit"
              className="py-3 px-5  ml-2 text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-red-500 border-red-500  rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-white dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Search
            </button>
          </div>
        </form>

        <div className=" w-full flex items-center justify-center">
          <button
            onClick={() =>
              setArticle(`https://archive.is/newest/${context.article?.trim()?.split("?")[0]}`)
            }
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group   bg-red-500  hover:text-white dark:text-white"
          >
            <span
              class={`relative px-5 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white ${
                article?.includes("archive.is") ? "bg-red-500 text-white" : "bg-white text-black"
              }`}
            >
              1
            </span>
          </button>
          <button
            onClick={() =>
              setArticle(`https://web.archive.org/${context.article?.trim()?.split("?")[0]}`)
            }
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group   bg-red-500  hover:text-white dark:text-white"
          >
            <span
              class={`relative px-5 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white ${
                article?.includes("archive.org") ? "bg-red-500 text-white" : "bg-white text-black"
              }`}
            >
              2
            </span>
          </button>
          <button
            onClick={() => window.open(`https://12ft.io/${context.article?.trim()?.split("?")[0]}`)}
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group   bg-red-500  hover:text-white dark:text-white"
          >
            <span
              class={`relative px-5 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white ${
                article?.includes("12ft.io") ? "bg-red-500 text-white" : "bg-white text-black"
              }`}
            >
              3
            </span>
          </button>
          <button
            onClick={() =>
              window.open(`https://removepaywall.com/${context.article?.trim()?.split("?")[0]}`)
            }
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group   bg-red-500  hover:text-white dark:text-white"
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              4
            </span>
          </button>
          <button
            onClick={() =>
              window.open(
                `https://webcache.googleusercontent.com/search?q=cache:${
                  context.article?.trim()?.split("?")[0]
                }`
              )
            }
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group   bg-red-500  hover:text-white dark:text-white"
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              5
            </span>
          </button>
        </div>
      </div>
      <div className="w-[100%] h-[100vh] overflow-scroll flex    justify-center">
        <iframe src={article} width="100%" height="2000px" rel="nofollow"></iframe>
      </div>
      {/* <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700  " />

      <Faq />

      <footer className="p-4  bg-[#FFFEF0] sm:p-6 dark:bg-gray-800">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:underline">
              Archive Buttons™
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <Link className="text-gray-500 dark:hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link className="text-gray-500 dark:hover:text-white" href="/blog">
              blog
            </Link>
            <span>|</span>
            <p className="text-gray-500 dark:hover:text-white mr-24">
              contact: archivebuttons@gmail.com
            </p>
          </div>
        </div>
      </footer> */}
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log(context);
  // Fetch the articles from the API route
  // console.log(context);
  const query = context.query;

  console.log(query);
  let seoData = {
    title: "Default Title",
    des: "Default description",
    blogURL: "Default URL",
    imgURL: "https://mhtntimes.com/images/posts_img/amazon.webp",
    imgAlt: "Default Image",
    twitterTittle: "Default Twitter Title",
    twitterDes: "Default Twitter Description",
  };
  try {
    const { db } = await connectToDatabase();
    const seo = await db.collection("articles").findOne({ blogUrl: query.article });

    if (seo) {
      seoData = {
        title: seo.title,
        des: seo.des,
        blogURL: seo.blogURL,
        imgURL: seo.imgURL,
        imgAlt: seo.imgAlt,
        twitterTittle: seo.twitterTittle,
        twitterDes: seo.twitterDes,
      };
    }
  } catch (e) {
    console.error("Failed to fetch SEO data from MongoDB:", e);
  }

  //console.log(res);

  console.log(seoData);

  return {
    props: {
      context: {
        query,
        seoData,
      },
    },
  };
}
