export default function Glance({ current }: { current: number }) {
  return <>Temperature: {current ? current : "Loading..."}</>;
}
