/**
 * Convert instead of calling tomorrow.io again
 * @param celsius
 * @returns Temperature in fahrenheit
 */
export function toFahrenheit(celsius: number | string) {
  if (typeof celsius === "string") {
    celsius = parseFloat(celsius);
  }

  const fahrenheit = (celsius * 9) / 5 + 32;

  return Math.ceil(fahrenheit * 10) / 10;
}
