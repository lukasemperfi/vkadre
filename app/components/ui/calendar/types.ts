import type { CalendarDate, ZonedDateTime } from "@internationalized/date";

export interface UiCalendarSession {
  id: string | number;
  /** Exact moment when the session starts (timezone-aware). */
  start: ZonedDateTime;
  /** Exact moment when the session ends (timezone-aware). */
  end: ZonedDateTime;
  title: string;
  location?: string;
}

export interface UiCalendarDay {
  /** Calendar date of the cell. `date.day` gives the day number. */
  date: CalendarDate;
  /** False for leading/trailing days that belong to neighbour months. */
  isCurrentMonth: boolean;
}

/**
 * Sessions grouped by day. The key is `CalendarDate.toString()`
 * (canonical "YYYY-MM-DD"), so the map stays JSON-serializable
 * and is safe to keep in Pinia / Nuxt SSR payload.
 */
export type UiCalendarSessionsMap = Record<string, UiCalendarSession[]>;

/** Default locale used to determine the first day of the week. */
export const UI_CALENDAR_DEFAULT_LOCALE = "ru-RU" as const;
