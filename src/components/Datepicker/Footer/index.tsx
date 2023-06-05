import { IFooterProps } from "interface";

const Footer: React.FC<IFooterProps> = ({ dateObj, handleConfirm, handleCancel }) => {
  return (
    <div className="datepicker_modal_footer">
      <div>
        {`${dateObj.year}/${String(dateObj.month + 1).padStart(2, "0")}/${String(
          dateObj.date
        ).padStart(2, "0")} ${String(dateObj.hours).padStart(2, "0")}:${String(
          dateObj.minutes
        ).padStart(2, "0")}`}
        {dateObj.hours > 11 ? "PM" : "AM"}
      </div>
      <div className="datepicker_modal_footer_buttons">
        <button className="datepicker_modal_footer_buttons-cancel" onClick={() => handleCancel()}>
          Cancel
        </button>
        <button className="datepicker_modal_footer_buttons-confirm" onClick={() => handleConfirm()}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default Footer;
