import { ICalendarProps } from "interface";

const Calendar: React.FC<ICalendarProps> = ({
  menuDisplayDate,
  currentDateObj,
  onDateClick,
  min = null,
  max = null,
}) => {
  const daysInMonth = new Date(menuDisplayDate.year, menuDisplayDate.month + 1, 0).getDate();
  const startDay = new Date(menuDisplayDate.year, menuDisplayDate.month, 0).getDay();

  const getStartEmptyCells = (): JSX.Element[] => {
    const emptyCells = [];
    for (let i = 0; i < startDay; i += 1) {
      emptyCells.push(<div key={i} className="datepicker_modal_calendar_grid_cell" />);
    }

    return emptyCells;
  };

  const getDateCells = (): JSX.Element[] => {
    const dateCells = [];
    
    for (let i = 1; i <= daysInMonth; i += 1) {
      let dayClass: string = "datepicker_modal_calendar_grid_cell-normal";
      if (menuDisplayDate.date === i) {
        dayClass = "datepicker_modal_calendar_grid_cell-selected";
      }
      if (
        currentDateObj.date === i &&
        currentDateObj.month === menuDisplayDate.month &&
        currentDateObj.year === menuDisplayDate.year
      ) {
        dayClass = "datepicker_modal_calendar_grid_cell-current";
      }
      if (
        min &&
        new Date(`${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${i}`) <
          new Date(`${min.getFullYear()}-${min.getMonth() + 1}-${min.getDate()}`)
      ) {
        dayClass = "datepicker_modal_calendar_grid_cell-disabled";
      }
      if (
        max &&
        new Date(`${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${i}`) >
          new Date(`${max.getFullYear()}-${max.getMonth() + 1}-${max.getDate()}`)
      ) {
        dayClass = "datepicker_modal_calendar_grid_cell-disabled";
      }
      
      dateCells.push(
        <button
          type="button"
          key={i}
          onClick={
            (min &&
              new Date(`${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${i}`) <
                new Date(`${min.getFullYear()}-${min.getMonth() + 1}-${min.getDate()}`)) ||
            (max &&
              new Date(`${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${i}`) >
                new Date(`${max.getFullYear()}-${max.getMonth() + 1}-${max.getDate()}`))
              ? () => {}
              : () => {
                  // console.log(menuDisplayDate);
                  onDateClick(
                    menuDisplayDate.year,
                    menuDisplayDate.month,
                    i,
                    menuDisplayDate.hours,
                    menuDisplayDate.minutes,
                    menuDisplayDate.seconds
                  );
                }
          }
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
        <div className="datepicker_modal_calendar_week_cell">MON</div>
        <div className="datepicker_modal_calendar_week_cell">TUE</div>
        <div className="datepicker_modal_calendar_week_cell">WED</div>
        <div className="datepicker_modal_calendar_week_cell">THU</div>
        <div className="datepicker_modal_calendar_week_cell">FRI</div>
        <div className="datepicker_modal_calendar_week_cell">SAT</div>
        <div className="datepicker_modal_calendar_week_cell">SUN</div>
      </div>
      <div className="datepicker_modal_calendar_grid">
        {/* {Array(startDay)
          .fill(null)
          .map((element, i) => {
            console.log(element);
            return <div key={i} className="datepicker_modal_calendar_grid_day-empty" />;
          })} */}
        {getStartEmptyCells()}
        {getDateCells()}
      </div>
    </div>
  );
};

export default Calendar;
