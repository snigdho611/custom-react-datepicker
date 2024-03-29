export interface IDate {
  date: number;
  month: number;
  year: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface IDatepickerProps {
  width?: string;
  value: Date | null;
  disabled?: boolean;
  onChange: (date: Date) => void;
  min?: Date | null;
  max?: Date | null;
  timepicker?: boolean;
  style?: {
    foreground: string;
    background: string;
    dateRadius: string;
  };
}

export interface ICalendarProps {
  menuDisplayDate: IDate;
  currentDateObj: IDate;
  onDateClick: (
    date: number,
    month: number,
    year: number,
    hours: number,
    minutes: number,
    seconds: number
  ) => void;
  min?: Date | null;
  max?: Date | null;
}

export interface IFooterProps {
  menuDisplayDate: IDate;
  handleConfirm: () => void;
}

export interface ITimeProps {
  selected: IDate;
  onTimeClickHour: (hours: number) => void;
  onTimeClickMinute: (minutes: number) => void;
  hoursRange: { start: number; end: number };
  minutesRange: { start: number; end: number };
}
