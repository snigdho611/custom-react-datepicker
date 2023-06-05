import { IDate } from "interface";
import { useRef } from "react";

interface ITimeProps {
  dateObj: IDate;
  onTimeClickHour: (hours: number) => void;
  onTimeClickMinute: (minutes: number) => void;
}

const DatepickerTime: React.FC<ITimeProps> = ({
  dateObj,
  onTimeClickHour,
  onTimeClickMinute,
}) => {
  const hours = Array.from({ length: 24 }, (_, index) => index);
  const minutes = Array.from({ length: 60 }, (_, index) => index);
  // const hours = Array.from({ length: 10 }, (_, index) => index );
  // const minutes = Array.from({ length: 10 }, (_, index) => index );

  console.log(dateObj.hours, dateObj.minutes);

  return (
    <div className="datepicker_time">
      <select
        onChange={(e) => onTimeClickHour(parseInt(e.target.value))}
        defaultValue={dateObj.hours}
      >
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {/* {String(hour).padStart(2, "0")} */}
            {hour < 10 ? "0" + hour : hour}
          </option>
        ))}
      </select>
      :
      <select
        onChange={(e) => onTimeClickMinute(parseInt(e.target.value))}
        defaultValue={dateObj.minutes}
      >
        {minutes.map((minute) => (
          <option key={minute}>
            {/* {String(minute).padStart(2, "0")} */}
            {minute < 10 ? "0" + minute : minute}
            {/* {minute} */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatepickerTime;
