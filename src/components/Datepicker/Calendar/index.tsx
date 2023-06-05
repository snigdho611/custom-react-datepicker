import { IDate } from "interface";
import { MutableRefObject } from "react";

interface ICalendarProps {
  dateObj: IDate;
  currentDateObj: MutableRefObject<IDate>;
  onDateClick: (date: number, month: number, year: number) => void;
}

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
      // const isSelectedDate = i === new Date().getDate();
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

  // const getEndEmptyCells = () => {
  //   const emptyCells = [];
  //   for (let i = 0; i < (getStartEmptyCells().length + getDateCells().length) % 7; i++) {
  //     emptyCells.push(<div className="datepicker_calendar_date_day-empty" />);
  //   }
  //   return emptyCells;
  // };

  // console.log(dateObj);

  return (
    <div className="datepicker_modal_calendar">
      {/* <hr style={{ width: "70%" }} /> */}
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
        {/* {getEndEmptyCells()} */}
      </div>
      {/* <div className="calendar-grid">{calendarDays}</div> */}
    </div>
  );
};

export default Calendar;
