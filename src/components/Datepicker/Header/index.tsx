import { IDate } from "interface";

interface IHeaderProps {
  dateObj: IDate;
  onNext: () => void;
  onPrev: () => void;
}
const Header: React.FC<IHeaderProps> = ({ dateObj, onNext, onPrev }) => {
  const getMonthName = (monthIndex: number) => {
    switch (monthIndex) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        break;
    }
  };

  return (
    <div className="datepicker_modal_header">
      <button onClick={onPrev}>{"<"}</button>
      <div>
        {/* {dayjs().locale("en").month(dateObj.month).format("MMMM")}{" "} */}
        {getMonthName(dateObj.month)} {dateObj.year}
      </div>
      <button onClick={onNext}>{">"}</button>
    </div>
  );
};

export default Header;
