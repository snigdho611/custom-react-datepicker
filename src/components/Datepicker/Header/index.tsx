import { IDate } from "interface";
// import { ReactComponent as ArrowLeft} from 'icons/left-arrow.svg'
import RightArrrow from "icons/RightArrow";
import LeftArrow from "icons/LeftArrow";
import Close from "icons/Close";
// import test from 'icons/test'
import { ReactComponent as CloseIcon } from "icons/close.svg"

interface IHeaderProps {
  selected: IDate;
  onNext: () => void;
  onPrev: () => void;
  handleCancel: () => void;
}

const Header: React.FC<IHeaderProps> = ({ selected, onNext, onPrev, handleCancel }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="datepicker_modal_header">
      <button
        type="button"
        className="datepicker_modal_header_buttons-cancel"
        onClick={() => handleCancel()}
      >
      <CloseIcon />
      </button>
      <div className="datepicker_modal_header_buttons">
        <button type="button" onClick={onPrev}>
          <LeftArrow />
        </button>
        <div className="datepicker_modal_header_buttons_display">
          <span>{months[selected.month]}</span>
          <span>{selected.year}</span>
        </div>
        <button type="button" onClick={onNext}>
          <RightArrrow />
        </button>
      </div>
      <hr className="datepicker_modal_header_divider" />
    </div>
  );
};

export default Header;
