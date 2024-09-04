import WeatherCodeIcon from "~/helpers/WeatherCodeIcon";
import { toFahrenheit } from "~/helpers/utils";
import type { minuteEntry } from "~/services/tomorrow-io/forecast";
import { metric, imperial } from "~/services/tomorrow-io/fields";
type Unit = "imperial" | "metric";

export default function Glance({
  unit = "imperial",
  currentData,
}: {
  unit: Unit;
  currentData: minuteEntry;
}) {
  const date = new Date(currentData.time);
  const { weatherCode } = currentData.values;
  let { temperature } = currentData.values;
  let fields: typeof metric | typeof imperial = metric;
  const dateFormat = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (unit === "imperial") {
    temperature = toFahrenheit(temperature);
    fields = imperial;
  }

  if (temperature) {
    return (
      <section className="glance">
        <h4>{dateFormat.format(date)}</h4>
        <h1>
          <span>
            {Math.round(temperature)}°{unit === "imperial" ? "F" : "C"}
          </span>
        </h1>
        <h3>
          <WeatherCodeIcon weatherCode={weatherCode} />
          {fields.weatherCode[weatherCode.toString()]}
        </h3>
      </section>
    );
  } else {
    return <>Loading...</>;
  }
}
