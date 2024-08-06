import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { getForecast } from "~/services/tomorro-io";
import type { ForecastResponse } from "~/services/tomorro-io";
import type { MetaFunction } from "@remix-run/node";
import Glance from "./Glance";

export const meta: MetaFunction = () => {
  return [
    { title: "Tanuki Weather" },
    { name: "description", content: "A simple weather app." },
  ];
};

export const loader: LoaderFunction = async () => {
  const forecast: ForecastResponse = await getForecast("new york");
  if (forecast == null) {
    return null;
  }
  return forecast;
};

export default function Index() {
  const forecast: ForecastResponse = useLoaderData<typeof loader>();

  console.log(JSON.stringify(forecast.timelines.minutely.values.temperature));
  const current = forecast.timelines.daily[0].values.temperatureAvg;

  return (
    <div className="font-sans p-4">
      <Glance current={current} weatherCode={1001} />
    </div>
  );
}
