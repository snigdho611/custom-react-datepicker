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
  selected?: Date;
  disabled?: boolean;
  onChange: (date: Date) => void;
  min?: Date | null;
  max?: Date | null;
}

export interface ICalendarProps {
  dateObj: IDate;
  currentDateObj: MutableRefObject<IDate>;
  onDateClick: (date: number, month: number, year: number) => void;
  min?: Date | null;
  max?: Date | null;
}

export interface IFooterProps {
  dateObj: IDate;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export interface ITimeProps {
  selected: IDate;
  onTimeClickHour: (hours: number) => void;
  onTimeClickMinute: (minutes: number) => void;
  min?: Date | null;
  max?: Date | null;
}
