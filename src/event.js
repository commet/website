export const APPLICATION_DEADLINE = Date.parse("2026-11-15T23:59:59.999+09:00");
export const EVENT_END = Date.parse("2026-12-05T18:00:00+09:00");
export function eventState(now) {
  if (now <= APPLICATION_DEADLINE) return "applications-open";
  if (now < EVENT_END) return "upcoming";
  return "past";
}
