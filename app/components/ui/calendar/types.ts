import type { CalendarDate, ZonedDateTime } from "@internationalized/date";

export interface UiCalendarEvent {
  id: string | number;
  title: string;
  start: ZonedDateTime;
  end: ZonedDateTime;
  location?: string | null;
  isBooked?: boolean | null;
  locationId?: string;
  city?: string;
}

export interface UiCalendarDay {
  date: CalendarDate;
  isCurrentMonth: boolean;
}

export const UI_CALENDAR_DEFAULT_LOCALE = "ru-RU" as const;
