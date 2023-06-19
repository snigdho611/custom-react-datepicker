import { ITimeProps } from "interface";

const DatepickerTime: React.FC<ITimeProps> = ({ selected, onTimeClickHour, onTimeClickMinute, min=null, max=null }) => {

  const hours_ = () => {
    const minHours = []
      for (let i = min ? min.getHours() : 0; i < 24; i++) {
        minHours.push(i);
      }
    return minHours
  }
  
  const minutes_ = () => {
    const minMinutes = []
      for (let i = min ? min.getMinutes() : 0; i < 60; i++) {
        minMinutes.push(i);
      }
    return minMinutes
  }

  return (
    <div className="datepicker_modal_time">
      <select
        onChange={(e) => onTimeClickHour(parseInt(e.target.value))}
        defaultValue={selected.hours}
      >
        {hours_().map((hour) => (
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
        {minutes_().map((minute) => (
          <option key={minute}>
            {minute < 10 ? "0" + minute : minute}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatepickerTime;
