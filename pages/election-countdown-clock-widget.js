import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getNextElections, getTimeRemaining } from "@/lib/elections";

export default function ElectionCountdownWidget() {
  const router = useRouter();
  const { type = "combined", theme = "light" } = router.query;

  // Initialize with initial calculation to avoid layout shift
  const [elections, setElections] = useState(() => getNextElections());
  const [presCountdown, setPresCountdown] = useState(() =>
    getTimeRemaining(getNextElections().presidential.date)
  );
  const [midCountdown, setMidCountdown] = useState(() =>
    getTimeRemaining(getNextElections().midterm.date)
  );

  useEffect(() => {
    // Recalculate immediately in case router loaded or dates changed
    const currentElections = getNextElections();
    setElections(currentElections);
    setPresCountdown(getTimeRemaining(currentElections.presidential.date));
    setMidCountdown(getTimeRemaining(currentElections.midterm.date));

    // Update every second
    const timer = setInterval(() => {
      const now = new Date();
      const updatedElections = getNextElections(now);
      setElections(updatedElections);
      setPresCountdown(getTimeRemaining(updatedElections.presidential.date, now));
      setMidCountdown(getTimeRemaining(updatedElections.midterm.date, now));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isDark = theme === "dark";

  // Shared Pure News Brand Header / Footer Backlink
  const pureNewsBacklink = "https://pure.news/election-countdown-clock";

  return (
    <div
      className={`w-full h-screen select-none flex flex-col justify-between font-sans overflow-hidden ${isDark ? "bg-[#090D16] text-white" : "bg-white text-slate-900"
        }`}
    >
      <Head>
        <title>Pure News | Election Countdown Clock Widget</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      {/* COMPACT SIDEBAR WIDGET (180x260 or narrow columns) */}
      {type === "compact" && (
        <div
          className={`w-full h-full flex flex-col justify-between p-3 text-center border ${isDark
              ? "border-slate-800 bg-[#0B1120]"
              : "border-slate-200 bg-white"
            } rounded-xl shadow-sm`}
        >
          {/* Top Patriotic Header */}
          <div>
            <div className="flex items-center justify-center space-x-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            </div>
            <div
              className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"
                }`}
            >
              Election Clock
            </div>
          </div>

          {/* Section 1: Midterm */}
          <div
            className={`my-1 py-1.5 border-t border-b ${isDark ? "border-slate-800" : "border-slate-100"
              }`}
          >
            <div className="text-[11px] font-extrabold text-red-600 leading-tight">
              {elections.midterm.year} Midterm
            </div>
            <div
              suppressHydrationWarning
              className={`text-2xl font-black tracking-tight leading-none my-1 font-mono ${isDark ? "text-red-400" : "text-red-600"
                }`}
            >
              {midCountdown.days}
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Days Left
            </div>
          </div>

          {/* Section 2: Presidential */}
          <div className="mb-1">
            <div className="text-[11px] font-extrabold text-blue-600 leading-tight">
              {elections.presidential.year} Presidential
            </div>
            <div
              suppressHydrationWarning
              className={`text-2xl font-black tracking-tight leading-none my-1 font-mono ${isDark ? "text-blue-400" : "text-blue-600"
                }`}
            >
              {presCountdown.days}
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Days Left
            </div>
          </div>

          {/* Backlink Branding Footer */}
          <div
            className={`pt-2 border-t flex items-center justify-between text-[10px] ${isDark ? "border-slate-800" : "border-slate-200"
              }`}
          >
            <a
              href={pureNewsBacklink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1b7340] font-bold hover:underline"
            >
              Get Code
            </a>
            <a
              href="https://pure.news"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-black tracking-tighter uppercase ${isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-black"
                }`}
            >
              PURE NEWS
            </a>
          </div>
        </div>
      )}

      {/* PRESIDENTIAL ONLY FOCUS WIDGET (420x300) */}
      {type === "presidential" && (
        <div
          className={`w-full h-full flex flex-col justify-between p-4 sm:p-5 border ${isDark
              ? "border-slate-800 bg-[#0B1120]"
              : "border-slate-200 bg-white"
            } rounded-xl shadow-sm`}
        >
          {/* Header Banner */}
          <div
            className={`flex items-center justify-between pb-3 border-b ${isDark ? "border-slate-800" : "border-slate-200"
              }`}
          >
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-800">
                White House
              </span>
              <span className="text-xs font-bold text-slate-400">U.S. General Election</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-red-600">★</span>
              <span className="text-xs text-slate-400">★</span>
              <span className="text-xs text-blue-600">★</span>
            </div>
          </div>

          {/* Main Counter Body */}
          <div className="text-center py-2">
            <h2
              className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"
                }`}
            >
              {elections.presidential.name}
            </h2>
            <p
              className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? "text-slate-400" : "text-slate-500"
                }`}
            >
              {elections.presidential.formattedDate}
            </p>

            {/* Time Blocks */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto mt-4">
              <TimeUnit value={presCountdown.days} label="DAYS" isDark={isDark} color="blue" />
              <TimeUnit value={presCountdown.hours} label="HOURS" isDark={isDark} />
              <TimeUnit value={presCountdown.minutes} label="MINS" isDark={isDark} />
              <TimeUnit value={presCountdown.seconds} label="SECS" isDark={isDark} />
            </div>
          </div>

          {/* Footer Backlink */}
          <WidgetFooter isDark={isDark} backlink={pureNewsBacklink} />
        </div>
      )}

      {/* MIDTERM ONLY FOCUS WIDGET (420x300) */}
      {type === "midterm" && (
        <div
          className={`w-full h-full flex flex-col justify-between p-4 sm:p-5 border ${isDark
              ? "border-slate-800 bg-[#0B1120]"
              : "border-slate-200 bg-white"
            } rounded-xl shadow-sm`}
        >
          {/* Header Banner */}
          <div
            className={`flex items-center justify-between pb-3 border-b ${isDark ? "border-slate-800" : "border-slate-200"
              }`}
          >
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-red-100 text-red-800">
                Congress
              </span>
              <span className="text-xs font-bold text-slate-400">U.S. Midterms</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-red-600">★</span>
              <span className="text-xs text-slate-400">★</span>
              <span className="text-xs text-blue-600">★</span>
            </div>
          </div>

          {/* Main Counter Body */}
          <div className="text-center py-2">
            <h2
              className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"
                }`}
            >
              {elections.midterm.name}
            </h2>
            <p
              className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? "text-slate-400" : "text-slate-500"
                }`}
            >
              {elections.midterm.formattedDate}
            </p>

            {/* Time Blocks */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto mt-4">
              <TimeUnit value={midCountdown.days} label="DAYS" isDark={isDark} color="red" />
              <TimeUnit value={midCountdown.hours} label="HOURS" isDark={isDark} />
              <TimeUnit value={midCountdown.minutes} label="MINS" isDark={isDark} />
              <TimeUnit value={midCountdown.seconds} label="SECS" isDark={isDark} />
            </div>
          </div>

          {/* Footer Backlink */}
          <WidgetFooter isDark={isDark} backlink={pureNewsBacklink} />
        </div>
      )}

      {/* COMBINED HERO WIDGET (DEFAULT - 500x380) */}
      {type === "combined" && (
        <div
          className={`w-full h-full flex flex-col justify-between border overflow-hidden ${isDark
              ? "border-slate-800 bg-[#0B1120]"
              : "border-slate-200 bg-white"
            } rounded-xl shadow-sm`}
        >
          {/* Top Navy/Patriotic Banner */}
          <div className="bg-[#0F1E36] text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-red-600 shrink-0">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              </div>
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                Official Election Countdown
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-300">Live Clocks</span>
          </div>

          {/* Main Dual Grid: Midterms & Presidential - 2 columns always side-by-side */}
          <div className="p-3 sm:p-4 grid grid-cols-2 gap-3 flex-1 items-center">
            {/* Card 1: Next Midterm */}
            <div
              className={`p-3 rounded-lg border text-center relative overflow-hidden flex flex-col justify-between h-full ${isDark
                  ? "bg-slate-900/70 border-slate-800"
                  : "bg-slate-50 border-slate-200"
                }`}
            >
              <div>
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-red-100 text-red-700 mb-1">
                  Next Up
                </div>
                <h3
                  className={`text-sm sm:text-base font-extrabold leading-tight ${isDark ? "text-white" : "text-slate-900"
                    }`}
                >
                  {elections.midterm.year} Midterm
                </h3>
                <p
                  className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                >
                  {elections.midterm.formattedDate}
                </p>
              </div>

              {/* Big Days Display */}
              <div
                className={`my-2 py-2 px-3 rounded-lg text-center ${isDark
                    ? "bg-[#0B1120] border border-slate-800"
                    : "bg-white border border-red-100 shadow-sm"
                  }`}
              >
                <div
                  suppressHydrationWarning
                  className={`text-3xl sm:text-4xl font-black font-mono tracking-tight leading-none ${isDark ? "text-red-400" : "text-red-600"
                    }`}
                >
                  {midCountdown.days}
                </div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Days Remaining
                </div>
              </div>

              {/* Ticking sub-units */}
              <div
                className={`flex justify-center items-center space-x-1.5 text-[11px] font-mono font-bold pt-1.5 border-t ${isDark
                    ? "border-slate-800 text-slate-300"
                    : "border-slate-200 text-slate-700"
                  }`}
              >
                <span suppressHydrationWarning>{String(midCountdown.hours).padStart(2, "0")}h</span>
                <span>:</span>
                <span suppressHydrationWarning>{String(midCountdown.minutes).padStart(2, "0")}m</span>
                <span>:</span>
                <span
                  suppressHydrationWarning
                  className={isDark ? "text-red-400" : "text-red-600"}
                >
                  {String(midCountdown.seconds).padStart(2, "0")}s
                </span>
              </div>
            </div>

            {/* Card 2: Next Presidential */}
            <div
              className={`p-3 rounded-lg border text-center relative overflow-hidden flex flex-col justify-between h-full ${isDark
                  ? "bg-slate-900/70 border-slate-800"
                  : "bg-slate-50 border-slate-200"
                }`}
            >
              <div>
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700 mb-1">
                  White House
                </div>
                <h3
                  className={`text-sm sm:text-base font-extrabold leading-tight ${isDark ? "text-white" : "text-slate-900"
                    }`}
                >
                  {elections.presidential.year} Presidential
                </h3>
                <p
                  className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                >
                  {elections.presidential.formattedDate}
                </p>
              </div>

              {/* Big Days Display */}
              <div
                className={`my-2 py-2 px-3 rounded-lg text-center ${isDark
                    ? "bg-[#0B1120] border border-slate-800"
                    : "bg-white border border-blue-100 shadow-sm"
                  }`}
              >
                <div
                  suppressHydrationWarning
                  className={`text-3xl sm:text-4xl font-black font-mono tracking-tight leading-none ${isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                >
                  {presCountdown.days}
                </div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Days Remaining
                </div>
              </div>

              {/* Ticking sub-units */}
              <div
                className={`flex justify-center items-center space-x-1.5 text-[11px] font-mono font-bold pt-1.5 border-t ${isDark
                    ? "border-slate-800 text-slate-300"
                    : "border-slate-200 text-slate-700"
                  }`}
              >
                <span suppressHydrationWarning>{String(presCountdown.hours).padStart(2, "0")}h</span>
                <span>:</span>
                <span suppressHydrationWarning>{String(presCountdown.minutes).padStart(2, "0")}m</span>
                <span>:</span>
                <span
                  suppressHydrationWarning
                  className={isDark ? "text-blue-400" : "text-blue-600"}
                >
                  {String(presCountdown.seconds).padStart(2, "0")}s
                </span>
              </div>
            </div>
          </div>

          {/* Footer Backlink Bar */}
          <WidgetFooter isDark={isDark} backlink={pureNewsBacklink} />
        </div>
      )}
    </div>
  );
}

// Ensure the global site footer is not rendered inside embedded iframe
ElectionCountdownWidget.noFooter = true;

/**
 * Reusable TimeUnit Box
 */
function TimeUnit({ value, label, isDark, color }) {
  const getNumberColor = () => {
    if (color === "red") return isDark ? "text-red-400" : "text-red-600";
    if (color === "blue") return isDark ? "text-blue-400" : "text-blue-600";
    return isDark ? "text-white" : "text-slate-900";
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-2.5 rounded-lg border ${isDark
          ? "bg-slate-900/80 border-slate-800"
          : "bg-slate-50 border-slate-200 shadow-sm"
        }`}
    >
      <span
        suppressHydrationWarning
        className={`text-2xl sm:text-3xl font-black font-mono tracking-tight leading-none ${getNumberColor()}`}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
        {label}
      </span>
    </div>
  );
}

/**
 * Footer Backlink & Pure News Branding
 */
function WidgetFooter({ isDark, backlink }) {
  return (
    <div
      className={`px-4 py-2 border-t flex items-center justify-between text-xs shrink-0 ${isDark ? "border-slate-800 bg-[#080D1A]" : "border-slate-200 bg-slate-50"
        }`}
    >
      <a
        href={backlink}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-[#1b7340] hover:text-[#155b33] hover:underline flex items-center space-x-1"
      >
        <span>Get Embed Code</span>
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>

      <a
        href="https://pure.news"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center space-x-1 font-black tracking-tighter uppercase ${isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-black"
          }`}
        title="Pure News"
      >
        <span className="text-[11px]">PURE NEWS</span>
      </a>
    </div>
  );
}
