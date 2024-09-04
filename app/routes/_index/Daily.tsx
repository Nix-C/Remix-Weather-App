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
  let isFirst = true;
  const days = dailyForecastData.map((day) => {
    const date = new Date(day.time);
    const dayText = isFirst ? "Today" : dateFormat.format(date);
    isFirst = false;
    return (
      <div key={crypto.randomUUID()} className="day">
        <h1>{dayText}</h1>
        <WeatherCodeIcon weatherCode={day.values.weatherCodeMax} />
        <h1>{Math.round(toFahrenheit(day.values.temperatureMax))}°</h1>
        <h1>{Math.round(toFahrenheit(day.values.temperatureMin))}°</h1>
      </div>
    );
  });

  return <section className="daily">{days}</section>;
}
