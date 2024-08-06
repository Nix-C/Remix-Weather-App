import "dotenv/config";
// Define the structure of the forecast response - Generated by ChatGPT 🤖
export interface ForecastResponse {
  timelines: {
    minutely: ForecastEntry[];
    hourly: ForecastEntry[];
    daily: ForecastEntry[];
  };
}

export interface ForecastEntry {
  startTime: string; // ISO 8601 format date string
  values: ForecastValues;
}

export interface ForecastValues {
  temperature: number; // Temperature in the specified units
  temperatureApparent: number; // Feels-like temperature
  windSpeed: number; // Wind speed in the specified units
  humidity: number; // Relative humidity in percentage
  precipitationProbability: number; // Probability of precipitation
  [key: string]: number | string; // Other possible forecast values
}

type Unit = "metric" | "imperial";

export async function getForecast(location: string, units: Unit = "metric") {
  const options = { method: "GET", headers: { accept: "application/json" } };
  const url = encodeURI(
    `https://api.tomorrow.io/v4/weather/forecast?location=${location}&units=${units}&apikey=${process.env.TOMORROW_API_KEY}`
  );
  const response = await fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err, "url:", url));

  return response;
}
