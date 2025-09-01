import Footer from "@/components/Footer";
import "@/styles/globals.css";

import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GLM1LFCLX1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GLM1LFCLX1');
        `}
      </Script>

      <Component {...pageProps} />
      <Footer />
    </>
  );
}
