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
      <div onClick={onPrev}>{"<"}</div>
      <div>
        {dayjs().locale("en").month(dateObj.month).format("MMMM")} {dateObj.year}
      </div>
      <div onClick={onNext}>{">"}</div>
    </div>
  );
};

export default Header;
