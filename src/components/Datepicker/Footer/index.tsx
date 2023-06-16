/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import { IFooterProps } from 'interface'

const Footer: React.FC<IFooterProps> = ({
  dateObj,
  handleConfirm,
  handleCancel
}) => {
  return (
    <div className='datepicker_modal_footer'>
      <hr className="datepicker_modal_footer_divider"/>
      <div className='datepicker_modal_footer_content'>
        <div className='datepicker_modal_footer_content_text'>
          {`${dateObj.year}/${String(dateObj.month + 1).padStart(
            2,
            '0'
          )}/${String(dateObj.date).padStart(2, '0')} ${String(
            dateObj.hours
          ).padStart(2, '0')}:${String(dateObj.minutes).padStart(2, '0')}`}
          {dateObj.hours > 11 ? 'PM' : 'AM'}
        </div>
        <div className='datepicker_modal_footer_content_buttons'>
          <button
            type="button"
            className='datepicker_modal_footer_content_buttons-cancel'
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button
            type="button"
            className='datepicker_modal_footer_content_buttons-confirm'
            onClick={() => handleConfirm()}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default Footer
