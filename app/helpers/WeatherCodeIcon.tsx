//import icon from "../assets/V2_icons/large/png/10000_clear_large.png";
import { metric } from "../services/tomorrow-io/fields";
export default function WeatherCodeIcon({
  weatherCode,
  isDay = true,
  isLarge = false,
  isTwoX = false,
}: {
  weatherCode: number;
  isDay: boolean;
  isLarge: boolean;
  isTwoX: boolean;
}) {
  const size = isLarge ? "large" : "small";
  const twoX = isTwoX ? "@2x" : "";

  return (
    <img
      src={`./app/assets/V2_icons/${size}/png/${weatherCode}${
        isDay ? "0" : "1"
      }_${size}${twoX}.png`}
      alt={metric.weatherCode[weatherCode]}
    />
  );
}
