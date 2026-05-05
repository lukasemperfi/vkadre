import type { CalendarDate, ZonedDateTime } from "@internationalized/date";

export interface UiCalendarEvent {
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

export type UiCalendarEventsMap = Record<string, UiCalendarEvent[]>;

export const UI_CALENDAR_DEFAULT_LOCALE = "ru-RU" as const;
