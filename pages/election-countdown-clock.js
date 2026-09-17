import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import {
  getNextElections,
  getTimeRemaining,
  getUpcomingElectionsSchedule,
} from "@/lib/elections";

export default function ElectionCountdownPage() {
  // Real-time election and countdown states
  const [elections, setElections] = useState(() => getNextElections());
  const [presCountdown, setPresCountdown] = useState(() =>
    getTimeRemaining(getNextElections().presidential.date)
  );
  const [midCountdown, setMidCountdown] = useState(() =>
    getTimeRemaining(getNextElections().midterm.date)
  );

  // Widget generator states
  const [selectedType, setSelectedType] = useState("combined");
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const updatedElections = getNextElections(now);
      setElections(updatedElections);
      setPresCountdown(getTimeRemaining(updatedElections.presidential.date, now));
      setMidCountdown(getTimeRemaining(updatedElections.midterm.date, now));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [isLocal, setIsLocal] = useState(false);
  const [useLocalUrl, setUseLocalUrl] = useState(false);
  const [localOrigin, setLocalOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalOrigin(window.location.origin);
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        setIsLocal(true);
      }
    }
  }, []);

  const widgetDimensions = {
    combined: { width: 500, height: 380, label: "Combined Clocks (Recommended)" },
    presidential: { width: 420, height: 300, label: "Presidential Focus" },
    midterm: { width: 420, height: 300, label: "Midterm Focus" },
    compact: { width: 180, height: 260, label: "Sidebar / Compact" },
  };

  const currentDims = widgetDimensions[selectedType];
  const effectiveBaseUrl = useLocalUrl && isLocal ? localOrigin : "https://pure.news";
  const widgetUrl = `${effectiveBaseUrl}/election-countdown-clock-widget?type=${selectedType}&theme=${selectedTheme}`;
  const localPreviewUrl = `/election-countdown-clock-widget?type=${selectedType}&theme=${selectedTheme}`;

  const embedCode = `<!-- Begin Pure News Election Countdown Widget -->
<iframe src="${widgetUrl}" width="${currentDims.width}" height="${currentDims.height}" style="border:0;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);" title="U.S. Election Countdown Clock"></iframe>
<div style="text-align:center;font-size:12px;font-family:system-ui,-apple-system,sans-serif;color:#64748b;margin-top:6px;">
  Live <a href="https://pure.news/election-countdown-clock" target="_blank" rel="noopener" style="color:#1b7340;text-decoration:none;font-weight:600;">Election Countdown Clock</a> by Pure News
</div>
<!-- End Pure News Election Countdown Widget -->`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const schedule = getUpcomingElectionsSchedule();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Head>
        <title>{`Election Countdown Clock | ${elections.midterm.year} Midterms & ${elections.presidential.year} Presidential | Pure News`}</title>
        <meta
          name="description"
          content={`Live election countdown clock tracking the next U.S. Midterms and Presidential election. Embed a free real-time election countdown clock widget on your website with automatic cycle updates.`}
        />
        <meta
          name="keywords"
          content="election countdown clock, presidential election countdown clock, midterm election countdown clock, us election countdown clock, live election countdown clock, election timer, embed election countdown clock, election clock widget"
        />
        <link rel="canonical" href="https://pure.news/election-countdown-clock" />

        {/* OpenGraph */}
        <meta
          property="og:title"
          content={`Election Countdown Clock | ${elections.midterm.year} Midterms & ${elections.presidential.year} Presidential`}
        />
        <meta
          property="og:description"
          content="Live election countdown clock tracking the days, hours, and minutes until the next U.S. Midterms and Presidential election. Free embeddable election widgets."
        />
        <meta property="og:url" content="https://pure.news/election-countdown-clock" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pure News" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Election Countdown Clock | ${elections.midterm.year} Midterms & ${elections.presidential.year} Presidential`}
        />
        <meta
          name="twitter:description"
          content="Track the exact days, hours, and seconds until the next U.S. elections with our live election countdown clock."
        />

        {/* Favicons */}
        <link rel="icon" type="image/png" href="/fave_pac/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/fave_pac/favicon.svg" />
        <link rel="shortcut icon" href="/fave_pac/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/fave_pac/apple-touch-icon.png" />
        <link rel="manifest" href="/fave_pac/site.webmanifest" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": "https://pure.news/election-countdown-clock#webpage",
                  "url": "https://pure.news/election-countdown-clock",
                  "name": "Election Countdown Clock",
                  "description":
                    "Official live election countdown clock to the next U.S. Midterm and Presidential elections.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Pure News",
                    "url": "https://pure.news",
                  },
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://pure.news/election-countdown-clock#app",
                  "name": "Election Countdown Clock",
                  "url": "https://pure.news/election-countdown-clock",
                  "applicationCategory": "UtilityApplication",
                  "operatingSystem": "All",
                  "description":
                    "Live, embeddable election countdown clock tracking the exact time remaining until the next U.S. elections.",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                  },
                },
                {
                  "@type": "Event",
                  "name": elections.midterm.name,
                  "startDate": elections.midterm.date.toISOString(),
                  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                  "eventStatus": "https://schema.org/EventScheduled",
                  "location": {
                    "@type": "Place",
                    "name": "United States",
                    "address": {
                      "@type": "PostalAddress",
                      "addressCountry": "US",
                    },
                  },
                },
                {
                  "@type": "Event",
                  "name": elections.presidential.name,
                  "startDate": elections.presidential.date.toISOString(),
                  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                  "eventStatus": "https://schema.org/EventScheduled",
                  "location": {
                    "@type": "Place",
                    "name": "United States",
                    "address": {
                      "@type": "PostalAddress",
                      "addressCountry": "US",
                    },
                  },
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is the Election Countdown Clock?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text":
                          "The Election Countdown Clock is a real-time ticker that tracks the exact days, hours, minutes, and seconds remaining until the next U.S. federal elections, including the Midterm and Presidential elections.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "When are the next U.S. Midterm Elections?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `The next U.S. Midterm Elections will take place on ${elections.midterm.formattedDate}.`,
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "When is the next U.S. Presidential Election?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `The next U.S. Presidential Election will take place on ${elections.presidential.formattedDate}.`,
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "Can I embed this election countdown clock on my website for free?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text":
                          "Yes! The Pure News election countdown clock widget is completely free to embed on WordPress, Squarespace, Wix, Ghost, Substack, or any custom website.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "Does the election countdown clock automatically update after an election?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text":
                          "Yes. Our election countdown clock uses an automated rollover formula under 2 U.S. Code § 7 that instantly advances to the next election cycle once Election Day passes.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </Head>

      {/* Main Header / Nav */}
      <Header />

      {/* Hero Headline Section */}
      <section className="pt-12 pb-16 px-6 max-w-6xl mx-auto text-center">
        {/* Flag motif badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 mb-6">
          <span className="flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          </span>
          <span>Official Federal Election Clocks</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-gray-950 leading-[1.08] max-w-4xl mx-auto">
          U.S. <span className="text-[#1b7340]">Election Countdown Clock</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Track the exact days, hours, minutes, and seconds until the next U.S. elections with our live
          election countdown clock. Real-time tickers automatically update for the {elections.midterm.year} Midterm
          Elections and {elections.presidential.year} Presidential Election as each cycle passes.
        </p>

        {/* DUAL LIVE COUNTDOWN HERO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto text-left">
          {/* Midterm Card */}
          <div className="relative bg-gradient-to-br from-white to-slate-50 p-6 sm:p-8 rounded-2xl border-2 border-red-500/30 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-100 text-red-700">
                Next Upcoming Election
              </span>
              <span className="text-xs font-mono font-bold text-red-600">Live Clock</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {elections.midterm.name}
              </h2>
              <p className="text-sm font-semibold text-gray-500 mt-1">
                {elections.midterm.formattedDate}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                All 435 U.S. House seats &amp; 33 Senate seats
              </p>
            </div>

            {/* Large Days Display */}
            <div className="my-6 py-4 px-5 rounded-xl bg-white border border-red-100 shadow-sm text-center">
              <div
                suppressHydrationWarning
                className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-red-600 leading-none"
              >
                {midCountdown.days}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">
                Days Remaining
              </div>
            </div>

            {/* Time units breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-gray-100">
              <div className="bg-gray-50 py-2 rounded-lg">
                <span
                  suppressHydrationWarning
                  className="block text-xl font-bold font-mono text-gray-800"
                >
                  {String(midCountdown.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Hours</span>
              </div>
              <div className="bg-gray-50 py-2 rounded-lg">
                <span
                  suppressHydrationWarning
                  className="block text-xl font-bold font-mono text-gray-800"
                >
                  {String(midCountdown.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Minutes</span>
              </div>
              <div className="bg-gray-50 py-2 rounded-lg">
                <span
                  suppressHydrationWarning
                  className="block text-xl font-bold font-mono text-red-600"
                >
                  {String(midCountdown.seconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Seconds</span>
              </div>
            </div>
          </div>

          {/* Presidential Card */}
          <div className="relative bg-gradient-to-br from-white to-slate-50 p-6 sm:p-8 rounded-2xl border-2 border-blue-500/30 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700">
                White House Race
              </span>
              <span className="text-xs font-mono font-bold text-blue-600">Live Clock</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {elections.presidential.name}
              </h2>
              <p className="text-sm font-semibold text-gray-500 mt-1">
                {elections.presidential.formattedDate}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                President &amp; Vice President of the United States
              </p>
            </div>

            {/* Large Days Display */}
            <div className="my-6 py-4 px-5 rounded-xl bg-white border border-blue-100 shadow-sm text-center">
              <div
                suppressHydrationWarning
                className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-blue-600 leading-none"
              >
                {presCountdown.days}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">
                Days Remaining
              </div>
            </div>

            {/* Time units breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-gray-100">
              <div className="bg-gray-50 py-2 rounded-lg">
                <span
                  suppressHydrationWarning
                  className="block text-xl font-bold font-mono text-gray-800"
                >
                  {String(presCountdown.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Hours</span>
              </div>
              <div className="bg-gray-50 py-2 rounded-lg">
                <span
                  suppressHydrationWarning
                  className="block text-xl font-bold font-mono text-gray-800"
                >
                  {String(presCountdown.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Minutes</span>
              </div>
              <div className="bg-gray-50 py-2 rounded-lg">
                <span
                  suppressHydrationWarning
                  className="block text-xl font-bold font-mono text-blue-600"
                >
                  {String(presCountdown.seconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMBED WIDGET GENERATOR SECTION */}
      <section className="bg-slate-900 text-white py-20 px-6 border-t border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10b981] mb-2 block">
              Free Webmaster Tool
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Embed an Election Countdown Clock on Your Website or Blog
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              Copy the iframe code below to easily display a live election countdown clock on your site. The
              widget runs completely automatically and rolls over as upcoming election dates pass.
            </p>
          </div>

          {/* Generator Controls */}
          <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl backdrop-blur-sm">
            {/* Options Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-700">
              {/* Type selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Widget Format &amp; Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(widgetDimensions).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedType(key)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${selectedType === key
                        ? "bg-[#1b7340] text-white shadow-md"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Widget Theme
                </label>
                <div className="inline-flex rounded-lg bg-slate-700 p-1">
                  <button
                    onClick={() => setSelectedTheme("light")}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${selectedTheme === "light"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-300 hover:text-white"
                      }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setSelectedTheme("dark")}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${selectedTheme === "dark"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-300 hover:text-white"
                      }`}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>

            {/* Two Column Layout: Live Preview on Left/Top, Embed Code on Right/Bottom */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
              {/* Live Preview Box */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span>Live Interactive Preview</span>
                  </span>
                  <span className="font-mono text-slate-400">
                    {currentDims.width} × {currentDims.height}px
                  </span>
                </div>

                <div className="w-full flex justify-center p-4 sm:p-6 bg-slate-950/70 rounded-xl border border-slate-700 overflow-x-auto min-h-[320px] items-center">
                  <div
                    style={{
                      width: `${currentDims.width}px`,
                      maxWidth: "100%",
                      height: `${currentDims.height}px`,
                    }}
                    className="transition-all duration-300"
                  >
                    <iframe
                      src={localPreviewUrl}
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        borderRadius: "12px",
                        overflow: "hidden",
                      }}
                      title="Election Countdown Widget Preview"
                    />
                  </div>
                </div>
              </div>

              {/* Code Snippet & Copy Action */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>


                  <div className="relative">
                    <textarea
                      readOnly
                      rows={9}
                      value={embedCode}
                      className="w-full bg-slate-950 text-slate-200 font-mono text-xs p-4 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleCopy}
                    className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center space-x-2 transition-all ${copied
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
                      : "bg-[#1b7340] text-white hover:bg-[#155b33] shadow-lg shadow-green-950/40"
                      }`}
                  >
                    {copied ? (
                      <>
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          />
                        </svg>
                        <span>Copy Embed Code</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center mt-3">
                    Paste this snippet directly into any HTML block on WordPress, Squarespace, Wix,
                    Substack, or Ghost.
                  </p>

                  <div className="flex items-center justify-center space-x-2 mt-4 pt-3 border-t border-slate-700/60 text-xs">
                    {/* <a
                      href="/test-embed.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 font-bold text-emerald-400 hover:text-emerald-300 hover:underline"
                    >
                      <span>🧪 Open Embed Test Sandbox</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT / WHY / HOW DOES IT WORK (PRIMARY SEO CONTENT SECTION) */}
      <section className="py-16 px-6 max-w-4xl mx-auto border-b border-gray-100">
        <div className="space-y-10">
          {/* What? */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight mb-4">
              What?
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4 text-base sm:text-lg">
              <p>
                This election countdown clock helps you if you want to know the exact time remaining
                until the next United States elections. Check the live election countdown clock anytime
                to see the days, hours, minutes, and seconds remaining until Election Day. If you run a
                political blog, news site, or campaign page and want to display the clock for your
                readers, click on any widget style you like, customize the theme, and copy the free
                embed code to feature a live election countdown clock directly on your website.
              </p>
              <p>
                Whether you&apos;re tracking the upcoming {elections.midterm.year} midterm elections or
                counting down to the {elections.presidential.year} presidential election, this election
                countdown clock will be perfect for you. All you have to do is check the timer above to
                see the time remaining or copy the widget snippet to share real-time election updates
                with your audience.
              </p>
            </div>
          </div>

          {/* Why? */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight mb-4">
              Why?
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4 text-base sm:text-lg">
              <p>
                Ever struggle to remember when the next major elections are happening? We have. Between
                midterm cycles, presidential races, voter registration deadlines, and shifting campaign
                calendars, keeping track of federal election dates can be frustrating. To prevent this,
                we calculated the official election dates under federal law and put them into one simple,
                live election countdown clock. We tried to make it as simple as possible for voters,
                journalists, and educators by displaying real-time days, hours, and seconds with zero
                clutter. This allows people to see exact election timelines at a glance and plan ahead
                for when they cast their ballot.
              </p>
              <p>
                This tool allows you to track deadlines across any federal election cycle. We support
                presidential election countdown clocks, midterm election countdown clocks, or combined
                views that track both races simultaneously. This election countdown clock allows you to
                stay updated with live second-by-second accuracy and never miss an election milestone.
              </p>
            </div>
          </div>

          {/* How does it work? */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight mb-4">
              How does it work?
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4 text-base sm:text-lg">
              <p>
                The idea is pretty simple, we calculated the legally mandated dates for every upcoming
                federal election under 2 U.S. Code § 7 and made it easy to follow in real time. All the
                user has to do is visit this page to view the live election countdown clock, or copy the
                responsive widget snippet to embed it on WordPress, Wix, Squarespace, or Substack. From
                helping you follow congressional races to watching the clock tick down to the next
                presidential election, we have it all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL & SEO CONTENT SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-950">
            How U.S. Federal Election Dates Are Determined
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed text-base sm:text-lg">
            In the United States, federal elections do not occur on an arbitrary date. Under federal
            law (<strong>2 U.S. Code § 7</strong> and <strong>3 U.S. Code § 1</strong>), Election Day
            is legally designated as:
          </p>

          <blockquote className="my-6 pl-5 border-l-4 border-[#1b7340] py-2 font-medium text-gray-800 text-lg bg-gray-50 rounded-r-lg">
            “The Tuesday next after the first Monday in November, in every even-numbered year.”
          </blockquote>

          <p className="text-gray-600 leading-relaxed text-base">
            This means Election Day will always fall between <strong>November 2</strong> and{" "}
            <strong>November 8</strong>. November 1st is never Election Day because it can never be the
            Tuesday after the first Monday.
          </p>
        </div>

        {/* Historical Context Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <h3 className="font-extrabold text-base text-gray-900 mb-2">Why Tuesday?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              In 1845, Congress established a uniform voting day. In an agrarian society, farmers needed a
              full day to travel by horse and buggy to county seats without traveling on Sunday (the
              Sabbath) or Wednesday (market day).
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <h3 className="font-extrabold text-base text-gray-900 mb-2">Presidential vs. Midterms</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Presidential elections take place every 4 years (divisible by 4: 2024, 2028, 2032).
              Midterms take place in the intervening even-numbered years (2026, 2030, 2034) to elect
              all Representatives and one-third of Senators.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <h3 className="font-extrabold text-base text-gray-900 mb-2">Perpetual Rollover</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Pure News countdown clocks are programmatically engineered to detect when an election has
              concluded, automatically advancing the countdown clock to the subsequent election cycle.
            </p>
          </div>
        </div>

        {/* UPCOMING GENERAL ELECTIONS SCHEDULE TABLE */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-950 mb-6">
            Upcoming U.S. General Election Calendar (2026 – 2036)
          </h2>

          <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-extrabold uppercase text-xs tracking-wider border-b border-gray-200">
                  <th className="py-3.5 px-4">Year</th>
                  <th className="py-3.5 px-4">Election Type</th>
                  <th className="py-3.5 px-4">Official Date</th>
                  <th className="py-3.5 px-4">Key Offices on the Ballot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schedule.map((item) => (
                  <tr
                    key={item.year}
                    className={
                      item.year === elections.midterm.year ||
                        item.year === elections.presidential.year
                        ? "bg-green-50/60 font-semibold"
                        : "hover:bg-gray-50 transition-colors"
                    }
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                      {item.year}
                      {(item.year === elections.midterm.year ||
                        item.year === elections.presidential.year) && (
                          <span className="ml-2 inline-block px-2 py-0.5 text-[10px] rounded bg-[#1b7340] text-white font-sans uppercase">
                            Active Clock
                          </span>
                        )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${item.type === "Presidential"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-800">{item.formattedDate}</td>
                    <td className="py-3.5 px-4 text-gray-600">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-950 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-xl p-6 bg-white">
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">
                What is an election countdown clock?
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                An election countdown clock is a real-time digital timer that calculates the exact days,
                hours, minutes, and seconds remaining until an upcoming election. The Pure News election
                countdown clock automatically counts down to the next U.S. Midterms and Presidential election.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-white">
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">
                When are the next U.S. Midterm Elections?
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                The next U.S. Midterm Elections will be held on{" "}
                <strong>{elections.midterm.formattedDate}</strong>. Voters will decide all 435 voting
                seats in the U.S. House of Representatives, approximately 33 or 34 seats in the U.S.
                Senate, and dozens of state governorships.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-white">
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">
                When is the next U.S. Presidential Election?
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                The next U.S. Presidential Election will be held on{" "}
                <strong>{elections.presidential.formattedDate}</strong>. Electors across all 50 states
                and Washington D.C. will cast ballots for the President and Vice President of the
                United States.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-white">
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">
                Can I use this election countdown widget on my blog or website for free?
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Yes! The Pure News countdown widgets are completely free for journalists, bloggers,
                educators, and political organizations. Simply copy the embed code above and paste it
                into your site's HTML. The backlink credit helps support our independent journalism.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-white">
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">
                Does the election countdown clock automatically update after an election?
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Yes. Our election countdown clock is engineered with an automated rollover algorithm
                based on 2 U.S. Code § 7. The moment an election passes, the clock automatically updates
                to count down to the next election cycle without requiring any manual changes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
