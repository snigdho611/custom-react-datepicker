import dayjs from "dayjs";
import { IDate } from "interface";

interface IHeaderProps {
  dateObj: IDate;
  onNext: () => void;
  onPrev: () => void;
}
const Header: React.FC<IHeaderProps> = ({ dateObj, onNext, onPrev }) => {
  return (
    <div className="datepicker_header">
      <button onClick={onPrev}>{"<"}</button>
      <div>
        {dayjs().locale("en").month(dateObj.month).format("MMMM")} {dateObj.year}
      </div>
      <button onClick={onNext}>{">"}</button>
    </div>
  );
};

export default Header;
