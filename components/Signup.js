import Image from "next/image";
import { useState } from "react";

export function Signup() {
  const [signedUp, setSignedUp] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "cbce41d8-b6b6-4e47-9b19-49b1e78cd5c1",

        email: e.target.email.value,
      }),
    });
    const result = await response.json();
    if (result.success) {
      e.target.email.value = "";
      setSignedUp(true);
    }
  }

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required placeholder="email@example.com" />
        </div>

        <button type="submit">Submit Form</button>
      </form> */}

      <section className="bg-gray-900 sm:rounded-xl flex flex-row mt-10">
        <Image
          src="/images/test4.png"
          alt="finance image"
          width={200}
          height={100}
          className="object-fit w-[250px] h-[250px] rounded-xl p-3 hidden sm:inline"
        ></Image>
        <div>
          <div className=" px-4 mx-auto max-w-screen-xl lg:px-6">
            <div className="mx-auto max-w-screen-md sm:text-center">
              <h2 className="mb-4 text-3xl mt-3 tracking-tight font-extrabold  sm:text-4xl text-white">
                Sign up for our Newsletter
              </h2>
              <p className="mx-auto  max-w-2xl font-light  text-center sm:text-xl text-gray-400">
                {signedUp
                  ? "You're all set. Enjoy!"
                  : "Stay up to date with the latest news right when it comes out."}
              </p>
            </div>
          </div>

          <div className="w-full flex items-center mt-3 justify-center">
            <form action="#" onSubmit={handleSubmit}>
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm flex flex-col sm:flex-row sm:space-y-0">
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    className="block p-3 pl-10 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-3 px-5  text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-red-500 border-red-500 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-red-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="mx-auto text-center sm:mb-0 mb-3 max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">
                Join our growing community and stay up to date on the latest news.
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
