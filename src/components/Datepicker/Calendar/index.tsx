import { ICalendarProps } from "interface";

const Calendar: React.FC<ICalendarProps> = ({
  menuDisplayDate,
  currentDateObj,
  onDateClick,
  min = null,
  max = null,
}) => {
  const daysInMonth = new Date(menuDisplayDate.year, menuDisplayDate.month, 0).getDate();
  const startDay = new Date(menuDisplayDate.year, menuDisplayDate.month, 0).getDay();

  const getStartEmptyCells = (): JSX.Element[] => {
    const emptyCells = [];
    for (let i = 0; i < startDay; i += 1) {
      emptyCells.push(<div key={i} className="datepicker_modal_calendar_grid_cell" />);
    }

    return emptyCells;
  };

  const getDateCells = () => {
    const dateCells = [];
    for (let i = 1; i <= daysInMonth; i += 1) {
      let dayClass: string = "datepicker_modal_calendar_grid_cell-normal";

      if (
        currentDateObj.current.date === i &&
        currentDateObj.current.month === menuDisplayDate.month &&
        currentDateObj.current.year === menuDisplayDate.year
      ) {
        dayClass = "datepicker_modal_calendar_grid_cell-current";
      }
      if (menuDisplayDate.date === i) {
        dayClass = "datepicker_modal_calendar_grid_cell-selected";
      }
      if (min && new Date(`${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${i}`) < min) {
        dayClass = "datepicker_modal_calendar_grid_cell-disabled";
      }
      if (max && new Date(`${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${i}`) > max) {
        dayClass = "datepicker_modal_calendar_grid_cell-disabled";
      }

      dateCells.push(
        <button
          type="button"
          key={i}
          onClick={
            (min && new Date(`${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${i}`) < min) || 
            (max && new Date(`${menuDisplayDate.year}-${menuDisplayDate.month + 1}-${i}`) > max)
              ? () => {}
              : () => {
                  // console.log(menuDisplayDate);
                  onDateClick(i, menuDisplayDate.month, menuDisplayDate.year);
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
