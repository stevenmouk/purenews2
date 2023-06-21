import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <footer className="p-4  sm:p-6 bg-white">
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center ">
            © 2023{" "}
            <a href="https://flowbite.com" className="hover:underline">
              lots of AI™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            {/* <p className="text-gray-500 dark:hover:text-white mr-24">
              contact: contact@lotsofai.com
            </p> */}
          </div>
        </div>
      </footer>
    </>
  );
}
