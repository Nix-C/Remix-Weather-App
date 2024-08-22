import { toFahrenheit } from "~/helpers/utils";
import WeatherCodeIcon from "~/helpers/WeatherCodeIcon";
import { ForecastEntry } from "~/services/tomorrow-io/forecast";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
});

export default function Daily({
  dailyForecastData,
}: {
  dailyForecastData: ForecastEntry[];
}) {
  const days = dailyForecastData.map((day) => {
    const date = new Date(day.time);

    return (
      <div key={crypto.randomUUID()} className="day">
        <h1>{dateFormat.format(date)}</h1>
        <WeatherCodeIcon weatherCode={day.values.weatherCodeMax} />
        <h1>High: {toFahrenheit(day.values.temperatureMax)} °F</h1>
        <h1>Low: {toFahrenheit(day.values.temperatureMin)} °F</h1>
      </div>
    );
  });

  return <section className="daily">{days}</section>;
}
