import { ITimeProps } from "interface";
import { arrayFill } from "utils";

const DatepickerTime: React.FC<ITimeProps> = ({
  selected,
  onTimeClickHour,
  onTimeClickMinute,
  min = null,
  max = null,
}) => {
  return (
    <div className="datepicker_modal_time">
      <select
        onChange={(e) => onTimeClickHour(parseInt(e.target.value))}
        defaultValue={selected.hours}
      >
        {arrayFill(0, 24).map((hour) => (
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
        {arrayFill(0, 60).map((minute) => (
          <option key={minute} value={minute}>
            {minute < 10 ? "0" + minute : minute}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatepickerTime;
