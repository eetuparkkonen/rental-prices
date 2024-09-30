export function generateQuarterlyDates(startYear: number, startQuarter: number) {
  const quarterItems = [];
  const currentDate = new Date();

  // Get current year and quarter
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-indexed
  const currentQuarter = Math.ceil(currentMonth / 3);

  let year = startYear;
  let quarter = startQuarter;

  // Loop until reaching the current quarter
  while (year < currentYear || (year === currentYear && quarter <= currentQuarter)) {
    quarterItems.push(`${year}Q${quarter}`);

    // Increment the quarter
    quarter++;

    // If quarter exceeds 4, move to the next year
    if (quarter > 4) {
      quarter = 1;
      year++;
    }
  }

  return quarterItems;
}
