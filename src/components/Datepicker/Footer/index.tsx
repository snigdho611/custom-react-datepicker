/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import { IFooterProps } from "interface";

const Footer: React.FC<IFooterProps> = ({ menuDisplayDate, handleConfirm }) => {
  return (
    <div className="datepicker_modal_footer">
      <hr className="datepicker_modal_footer_divider" />
      <div className="datepicker_modal_footer_content">
        <div className="datepicker_modal_footer_content_text">
          {`${menuDisplayDate.year}/${String(menuDisplayDate.month + 1).padStart(2, "0")}/${String(
            menuDisplayDate.date
          ).padStart(2, "0")} ${String(menuDisplayDate.hours).padStart(2, "0")}:${String(
            menuDisplayDate.minutes
          ).padStart(2, "0")}`}
          {/* {menuDisplayDate.hours > 11 ? 'PM' : 'AM'} */}
          {/* {menuDisplayDate.hours} */}
        </div>
        <div className="datepicker_modal_footer_content_buttons">
          
          <button
            type="button"
            className="datepicker_modal_footer_content_buttons-confirm"
            onClick={() => handleConfirm()}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
