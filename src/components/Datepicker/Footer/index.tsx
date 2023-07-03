import { IFooterProps } from "interface";

const Footer: React.FC<IFooterProps> = ({
  menuDisplayDate,
  handleConfirm,
  time = "false",
}) => {
  const showDisplayTime = () => {
    if (time === "false") {
      return `${menuDisplayDate.year}/${String(
        menuDisplayDate.month + 1
      ).padStart(2, "0")}/${String(menuDisplayDate.date).padStart(2, "0")}`;
    }
    return `${menuDisplayDate.year}/${String(
      menuDisplayDate.month + 1
    ).padStart(2, "0")}/${String(menuDisplayDate.date).padStart(
      2,
      "0"
    )} ${String(menuDisplayDate.hours).padStart(2, "0")}:${String(
      menuDisplayDate.minutes
    ).padStart(2, "0")}`;
  };
  return (
    <div className="datepicker_modal_footer">
      <hr className="datepicker_modal_footer_divider" />
      <div className="datepicker_modal_footer_content">
        <div className="datepicker_modal_footer_content_text">
          {showDisplayTime()}
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
