import React, { useState } from "react";
import "./index.scss";

interface IDate{
    date: number;
    month: number;
    year: number;
}
interface IDatepickerHeaderProps {
    dateObj: IDate;
}

const DatepickerHeader: React.FC<IDatepickerHeaderProps> = ({dateObj}) => {
  return (
    <div className="datepicker_header">
      <div>{"<"}</div>
      <div>{dateObj.month} {dateObj.year}</div>
      <div>{">"}</div>
    </div>
  );
};

const Datepicker = () => {
  const [dateObj, setDateObj] = useState<IDate>({ date: 1, month: 0, year: 1970 });
  return (
    <div className="datepicker">
      <DatepickerHeader dateObj={dateObj} />
    </div>
  );
};

export default Datepicker;
