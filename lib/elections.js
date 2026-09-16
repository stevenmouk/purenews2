/**
 * Election Date Calculations & Countdown Utilities for Pure News
 * Compliant with 2 U.S. Code § 7 (Tuesday after the first Monday in November).
 */

/**
 * Calculates the exact US Federal General Election date for any given year.
 * Federal election day is the Tuesday next after the first Monday in November.
 * Polls typically begin opening at 7:00 AM EST.
 *
 * @param {number} year
 * @returns {Date}
 */
export function getElectionDate(year) {
  // Month 10 in JS Date is November (0-indexed: 0=Jan, 10=Nov)
  const nov1 = new Date(year, 10, 1);
  const dayOfWeek = nov1.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Determine date of first Monday in November
  let firstMonday;
  if (dayOfWeek === 1) {
    firstMonday = 1;
  } else if (dayOfWeek === 0) {
    firstMonday = 2;
  } else {
    firstMonday = (8 - dayOfWeek) + 1;
  }

  // Election day is the Tuesday directly following the first Monday
  const electionDay = firstMonday + 1;

  // Set target time to 7:00 AM on election day
  return new Date(year, 10, electionDay, 7, 0, 0);
}

/**
 * Dynamically determines the NEXT US Presidential and Midterm elections
 * based on the provided current date (defaults to now).
 *
 * As each election date passes, the function automatically rolls over
 * to the next 4-year cycle (e.g. 2026 -> 2030, 2028 -> 2032).
 *
 * @param {Date} [currentDate=new Date()]
 * @returns {{
 *   presidential: { type: string, year: number, date: Date, name: string, subtitle: string, formattedDate: string },
 *   midterm: { type: string, year: number, date: Date, name: string, subtitle: string, formattedDate: string }
 * }}
 */
export function getNextElections(currentDate = new Date()) {
  const currentYear = currentDate.getFullYear();

  // Returns the end of election day (23:59:59) so the election remains active through Election Day
  const getEndOfElectionDay = (year) => {
    const d = getElectionDate(year);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
  };

  // 1. Next Presidential Election (even years divisible by 4: 2024, 2028, 2032...)
  let presYear = currentYear;
  while (presYear % 4 !== 0) {
    presYear++;
  }
  if (currentDate.getTime() > getEndOfElectionDay(presYear).getTime()) {
    presYear += 4;
  }
  let presDate = getElectionDate(presYear);

  // 2. Next Midterm Election (even years NOT divisible by 4: 2026, 2030, 2034...)
  let midYear = currentYear;
  while (midYear % 2 !== 0 || midYear % 4 === 0) {
    midYear++;
  }
  if (currentDate.getTime() > getEndOfElectionDay(midYear).getTime()) {
    midYear += 4;
  }
  let midDate = getElectionDate(midYear);

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return {
    presidential: {
      type: "presidential",
      year: presYear,
      date: presDate,
      name: `${presYear} Presidential Election`,
      subtitle: "Race for the White House",
      formattedDate: formatDate(presDate),
    },
    midterm: {
      type: "midterm",
      year: midYear,
      date: midDate,
      name: `${midYear} Midterm Elections`,
      subtitle: "U.S. House & Senate Races",
      formattedDate: formatDate(midDate),
    },
  };
}

/**
 * Calculates remaining days, hours, minutes, and seconds to a target date.
 *
 * @param {Date|string|number} targetDate
 * @param {Date} [currentDate=new Date()]
 * @returns {{ totalMs: number, days: number, hours: number, minutes: number, seconds: number, isPassed: boolean }}
 */
export function getTimeRemaining(targetDate, currentDate = new Date()) {
  const totalMs = new Date(targetDate).getTime() - new Date(currentDate).getTime();

  if (totalMs <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPassed: true,
    };
  }

  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / 1000 / 60) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
    isPassed: false,
  };
}

/**
 * Returns upcoming elections calendar list for reference/SEO tables.
 */
export function getUpcomingElectionsSchedule() {
  const years = [2026, 2028, 2030, 2032, 2034, 2036];
  return years.map((year) => {
    const isPres = year % 4 === 0;
    const date = getElectionDate(year);
    return {
      year,
      type: isPres ? "Presidential" : "Midterm",
      title: isPres ? `${year} Presidential Election` : `${year} Midterm Elections`,
      date,
      formattedDate: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      description: isPres
        ? "President & Vice President, all 435 U.S. House seats, and 33-34 U.S. Senate seats."
        : "All 435 U.S. House seats, 33-34 U.S. Senate seats, and 36 state gubernatorial races.",
    };
  });
}
