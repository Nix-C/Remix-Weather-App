export default function Glance({
  current,
  weatherCode,
}: {
  current: number | string;
  weatherCode: number;
}) {
  return (
    <>
      {weatherCode} {current ? current + " °C" : "Loading..."}
    </>
  );
}
