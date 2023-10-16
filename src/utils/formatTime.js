export default function formatTime(date) {
  const time = new Date(date * 1000);
  return (
    `${time.getHours()}`.padStart(2, "0") +
    ":" +
    `${time.getMinutes()}`.padStart(2, "0")
  );
}
