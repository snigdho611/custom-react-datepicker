import { IDate } from "interface";
import React from "react";

interface IFooterProps {
  dateObj: IDate;
}
const Footer: React.FC<IFooterProps> = ({ dateObj }) => {
  return (
    <div className="datepicker_footer">
      {dateObj.year}/{dateObj.month}/{dateObj.date}
    </div>
  );
};

export default Footer;
