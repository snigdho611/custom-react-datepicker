import { IDate } from "interface";
// import test from 'icons/test'
import { ReactComponent as CloseIcon } from "icons/close.svg";
import { Dispatch, SetStateAction } from "react";
import RightArrrow from "icons/RightArrow";
import LeftArrow from "icons/LeftArrow";

interface IHeaderProps {
  menuDisplayDate: IDate;
  onNext: () => void;
  onPrev: () => void;
  handleCancel: () => void;
  setMenuDisplayDate: Dispatch<SetStateAction<any>>;
}

const Header: React.FC<IHeaderProps> = ({
  onNext,
  onPrev,
  handleCancel,
  menuDisplayDate,
  setMenuDisplayDate,
}) => {
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
  const years = () => {
    const _: number[] = []
    for (let index = 1500; index < 2500; index++) {
      _.push(index);
    }
    return _;
  }

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
        <div className="datepicker_modal_header_buttons_display">
          <select
            name=""
            id=""
            defaultValue={menuDisplayDate.month}
            onChange={(e) => {
              setMenuDisplayDate((prevState: IDate) => ({
                ...prevState,
                month: parseInt(e.target.value),
              }));
            }}
          >
            {months.map((element, i) => {
              return <option key={i} value={i}>{element}</option>;
            })}
          </select>
          <select
            name=""
            id=""
            defaultValue={menuDisplayDate.year}
            onChange={(e) => {
              setMenuDisplayDate((prevState: IDate) => ({
                ...prevState,
                year: parseInt(e.target.value),
              }));
            }}
          >
            {years().map((element) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
          {/* <span>{months[selected.month]}</span>
          <span>{selected.year}</span> */}
        </div>
        {/* <button type="button" onClick={onNext}>
          <RightArrrow />
        </button> */}
      </div>
      <hr className="datepicker_modal_header_divider" />
    </div>
  );
};

export default Header;
