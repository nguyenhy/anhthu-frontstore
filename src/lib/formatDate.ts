export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Remaining time broken down into calendar units.
 */
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
/**
 *
 * @param deadlineIso
 * @param now
 * @returns null mean expired
 */
export function getTimeRemaining(
  deadlineIso: string,
  now: number,
): TimeRemaining | null {
  const diff = new Date(deadlineIso).getTime() - now;

  if (diff < 0) {
    return null;
  }

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
