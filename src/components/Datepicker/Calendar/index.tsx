import { ICalendarProps } from "interface";

const Calendar: React.FC<ICalendarProps> = ({ dateObj, currentDateObj, onDateClick }) => {
  const daysInMonth = new Date(dateObj.year, dateObj.month, 0).getDate();
  const startDay = new Date(dateObj.year, dateObj.month, 0).getDay();

  const getStartEmptyCells = () => {
    const emptyCells = [];
    for (let i = 0; i < startDay; i++) {
      emptyCells.push(<div key={i} className="datepicker_modal_calendar_date_day-empty" />);
    }
    return emptyCells;
  };

  const getDateCells = () => {
    const dateCells = [];
    for (let i = 1; i <= daysInMonth; i++) {
      let dayClass: string = "";
      dayClass = "datepicker_modal_calendar_date_day-normal";
      if (
        currentDateObj.current.date === i &&
        currentDateObj.current.month === dateObj.month &&
        currentDateObj.current.year === dateObj.year
      ) {
        dayClass = "datepicker_calendar_date_day-normal current-day";
      }

      if (dateObj.date === i) {
        dayClass = "datepicker_modal_calendar_date_day-normal selected-day";
      }
      dateCells.push(
        <button
          key={i}
          onClick={() => {
            // console.log(dateObj);
            onDateClick(i, dateObj.month, dateObj.year);
          }}
          className={dayClass}
        >
          {i}
        </button>
      );
    }
    return dateCells;
  };

  return (
    <div className="datepicker_modal_calendar">
      <div className="datepicker_modal_calendar_week">
        <div className="datepicker_modal_calendar_week_day">MON</div>
        <div className="datepicker_modal_calendar_week_day">TUE</div>
        <div className="datepicker_modal_calendar_week_day">WED</div>
        <div className="datepicker_modal_calendar_week_day">THU</div>
        <div className="datepicker_modal_calendar_week_day">FRI</div>
        <div className="datepicker_modal_calendar_week_day">SAT</div>
        <div className="datepicker_modal_calendar_week_day">SUN</div>
      </div>
      <div className="datepicker_modal_calendar_date">
        {getStartEmptyCells()}
        {getDateCells()}
      </div>
    </div>
  );
};

export default Calendar;
