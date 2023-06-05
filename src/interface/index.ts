import { MutableRefObject } from "react";

export interface IDate {
  date: number;
  month: number;
  year: number;
  hours: number;
  minutes: number;
}

export interface IDatepickerProps {
  width?: string;
}

export interface ICalendarProps {
  dateObj: IDate;
  currentDateObj: MutableRefObject<IDate>;
  onDateClick: (date: number, month: number, year: number) => void;
}

export interface IFooterProps {
  dateObj: IDate;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export interface ITimeProps {
  dateObj: IDate;
  onTimeClickHour: (hours: number) => void;
  onTimeClickMinute: (minutes: number) => void;
}
