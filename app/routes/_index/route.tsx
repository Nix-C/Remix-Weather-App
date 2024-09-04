import { useLoaderData, useSearchParams } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";
import { useEffect } from "react";
import { getForecast } from "~/services/tomorrow-io/forecast";
import getForecastExample from "~/services/tomorrow-io/tomorro-io-example";
import type { ForecastResponse } from "~/services/tomorrow-io/forecast";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Glance from "./Glance";
import Daily from "./Daily";

export const meta: MetaFunction = () => {
  return [
    { title: "Tanuki Weather" },
    { name: "description", content: "A simple weather app." },
  ];
};

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const location = url.searchParams.get("location"); // get location data from url param 'location'
  const latitude = url.searchParams.get("latitude");
  const longitude = url.searchParams.get("longitude");
  // const forecast: ForecastResponse = await getForecast(locationQuery);
  let forecast: ForecastResponse | null = null;

  if (location) {
    console.log(`Getting data for ${location}`);
    forecast = await getForecast(location);
  } else if (latitude && longitude) {
    console.log(`Getting data for ${latitude}, ${longitude}`);
    forecast = await getForecast(`${latitude}, ${longitude}`);
  } else {
    console.log(`No location data. Defaulting to new york`);
    forecast = await getForecast(`new york`);
  }

  if (forecast == (null || undefined)) {
    console.error(
      "Error: No response from tomorrow.io. Showing example data instead."
    );
    return getForecastExample;
  }

  // TODO: Handle tomorrow.io api error codes
  if (forecast.code) {
    console.error(
      "Error: Received error from tomorrow.io. Showing example data instead.",
      forecast.code
    );
    return getForecastExample;
  }

  console.log("Getting forecast...");
  return json(forecast);
};

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const forecast: ForecastResponse = useLoaderData<typeof loader>();
  const current = forecast.timelines.minutely[0];

  // Use useEffect or action to get geolocation inside the browser
  useEffect(() => {
    const params = new URLSearchParams();
    navigator.geolocation.getCurrentPosition((pos) => {
      params.set("latitude", pos.coords.latitude.toString());
      params.set("longitude", pos.coords.longitude.toString());
      setSearchParams(params, {
        preventScrollReset: true,
      });
    });
  }, [setSearchParams, searchParams]);

  return (
    <div className="highlight">
      <Glance unit="imperial" currentData={current} />
      <Daily dailyForecastData={forecast.timelines.daily} />
    </div>
  );
}
