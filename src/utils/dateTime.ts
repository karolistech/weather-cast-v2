export function formatTime(dateTime: string): string {
  return new Date(dateTime).toLocaleTimeString(undefined, {
    hour: "numeric", minute: "2-digit"
  });
}

export function formatWeekday(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: "short"
  });
}
