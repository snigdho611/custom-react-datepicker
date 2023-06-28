import { ITimeProps } from "interface";
import { arrayFill } from "utils";

const DatepickerTime: React.FC<ITimeProps> = ({
  selected,
  onTimeClickHour,
  onTimeClickMinute,
  hoursRange,
  minutesRange,
}) => {
  // console.log(hoursRange, minutesRange);
  // console.log(
  //   arrayFill(hoursRange.start, hoursRange.end),
  //   arrayFill(minutesRange.start, minutesRange.end)
  // );
  return (
    <div className="datepicker_modal_time">
      <select
        onChange={(e) => onTimeClickHour(parseInt(e.target.value))}
        defaultValue={selected.hours}
      >
        {arrayFill(hoursRange.start, hoursRange.end).map((hour) => (
          <option key={hour} value={hour}>
            {hour < 10 ? "0" + hour : hour}
          </option>
        ))}
      </select>
      <span className="time-divider">:</span>
      <select
        onChange={(e) => onTimeClickMinute(parseInt(e.target.value))}
        defaultValue={selected.minutes}
      >
        {arrayFill(minutesRange.start, minutesRange.end).map((minute) => (
          <option key={minute} value={minute}>
            {minute < 10 ? "0" + minute : minute}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatepickerTime;
