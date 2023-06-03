import { IDate } from "interface";
import React from "react";

interface IFooterProps {
  dateObj: IDate;
}
const Footer: React.FC<IFooterProps> = ({ dateObj }) => {
  return (
    <div className="datepicker_footer">
      <div>
        {dateObj.year}/{dateObj.month + 1}/{dateObj.date} {dateObj.hours}:{dateObj.minutes}{" "}
        {dateObj.hours > 11 ? "PM" : "AM"}
      </div>
      <div className="datepicker_footer_buttons">
        <button className="datepicker_footer_buttons-cancel">Cancel</button>
        <button className="datepicker_footer_buttons-confirm">Apply</button>
      </div>
    </div>
  );
};

export default Footer;
