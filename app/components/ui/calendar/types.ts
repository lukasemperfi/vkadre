import type { CalendarDate, ZonedDateTime } from "@internationalized/date";

export interface UiCalendarSession {
  id: string | number;
  start: ZonedDateTime;
  end: ZonedDateTime;
  title: string;
  location?: string;
}

export interface UiCalendarDay {
  date: CalendarDate;
  isCurrentMonth: boolean;
}

export type UiCalendarSessionsMap = Record<string, UiCalendarSession[]>;

export const UI_CALENDAR_DEFAULT_LOCALE = "ru-RU" as const;
