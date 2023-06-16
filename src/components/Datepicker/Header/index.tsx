import { IDate } from 'interface'
// import { ReactComponent as ArrowLeft} from 'icons/left-arrow.svg'
// import { ReactComponent as ArrowRight} from '../../../icons/right-arrow.svg'
// import test from 'icons/test'

interface IHeaderProps {
  selected: IDate
  onNext: () => void
  onPrev: () => void
}

const Header: React.FC<IHeaderProps> = ({ selected, onNext, onPrev }) => {
  const getMonthName = (monthIndex: number) => {
    switch (monthIndex) {
      case 0:
        return 'January'
      case 1:
        return 'February'
      case 2:
        return 'March'
      case 3:
        return 'April'
      case 4:
        return 'May'
      case 5:
        return 'June'
      case 6:
        return 'July'
      case 7:
        return 'August'
      case 8:
        return 'September'
      case 9:
        return 'October'
      case 10:
        return 'November'
      case 11:
        return 'December'
      default:
        break
    }
  }

  return (
    <div className='datepicker_modal_header'>
      <div className='datepicker_modal_header_buttons'>
        <button type="button" onClick={onPrev}>
          {"<"}
          </button>
        <div>
          {getMonthName(selected.month)} {selected.year}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
          </button>
      </div>
      <hr className='datepicker_modal_header_divider' />
    </div>
  )
}

export default Header
