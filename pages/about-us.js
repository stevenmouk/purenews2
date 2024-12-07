import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";

export default function Aboutus() {
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
          content="Stay informed with The Manhattan Times, your trusted source for the latest news. Explore a diverse range of articles covering stocks, markets, tech, personal finance, and more. Our expert analysis and in-depth reporting will keep you up-to-date with the ever-changing world of finance. "
        />
      </Head>

      <Navbar inArticle={true} />
      <hr />
      <div class="text-center font-[900] text-[30px]  ">
        <h1>About Us</h1>
      </div>

      <main class="py-8 bg-white text-gray-600">
        <div class=" mx-auto px-4 max-w-screen-lg">
          <section class="flex  flex-col  min-[700px]:flex-row items-center justify-center">
            <div class="">
              <img
                alt="About Motley Times"
                loading="lazy"
                width="400"
                height="800"
                decoding="async"
                data-nimg="1"
                class="object-cover rounded-lg border-[2px] border-black w-full h-full max-w-[400px]"
                src="/images/manhattan.jpeg"
              />
            </div>
            <div class="w-full max-w-[600px] mt-[40px] min-[700px]:mt-0 px-[30px]">
              <div class="space-y-4">
                <h2 class="text-xl md:text-2xl text-gray-800 font-[500] font-lora ">
                  Welcome and thank you for visiting The Manhattan Times.
                </h2>
                <p class="font-lora ">
                  We are a New York based news company with a focus on covering the top stories in
                  North America and Europe.
                </p>
                <p class="font-lora ">
                  We cover a wide range of topics—from urgent global events to in-depth looks at
                  culture, technology, politics, and the environment. We believe in giving our
                  readers the full picture, providing a well-rounded view of the world that reflects
                  a variety of perspectives.
                </p>
                <p class="font-lora ">
                  What sets us apart is our commitment to fairness. We have no sponsors or political
                  affiliation, which allows us to approach each story with complete independence. At
                  The Motley Times, our goal is to deliver news with the utmost honesty and
                  impartiality.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
