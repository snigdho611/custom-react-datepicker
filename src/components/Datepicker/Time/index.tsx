import { ITimeProps } from "../../../../types/datepicker/index";

const DatepickerTime: React.FC<ITimeProps> = ({ dateObj, onTimeClickHour, onTimeClickMinute }) => {
  const hours = Array.from({ length: 24 }, (_, index) => index);
  const minutes = Array.from({ length: 60 }, (_, index) => index);

  return (
    <div className="datepicker_modal_time">
      <select
        onChange={(e) => onTimeClickHour(parseInt(e.target.value))}
        defaultValue={dateObj.hours}
      >
        {hours.map((hour) => (
          <option key={hour} value={hour}>
            {hour < 10 ? "0" + hour : hour}
          </option>
        ))}
      </select>
      <span className="time-divider">:</span>
      <select
        onChange={(e) => onTimeClickMinute(parseInt(e.target.value))}
        defaultValue={dateObj.minutes}
      >
        {minutes.map((minute) => (
          <option key={minute}>{minute < 10 ? "0" + minute : minute}</option>
        ))}
      </select>
    </div>
  );
};

export default DatepickerTime;
