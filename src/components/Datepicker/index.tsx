import React, { useState } from "react";
import "./index.scss";
import dayjs from "dayjs";

interface IDate {
  date: number;
  month: number;
  year: number;
}
interface IDatepickerHeaderProps {
  dateObj: IDate;
  onNext: () => void;
  onPrev: () => void;
}

const DatepickerHeader: React.FC<IDatepickerHeaderProps> = ({
  dateObj,
  onNext,
  onPrev,
}) => {
  console.log(dayjs().month(dateObj.month));
  return (
    <div className="datepicker_header">
      <div onClick={onPrev}>{"<"}</div>
      <div>
        {dayjs().locale("en").month(dateObj.month).format("MMMM")}{" "}
        {dateObj.year}
      </div>
      <div onClick={onNext}>{">"}</div>
    </div>
  );
};

const Datepicker = () => {
  const [dateObj, setDateObj] = useState<IDate>({
    date: 0,
    month: 0,
    year: 2023,
  });

  function getLastDayOfMonth(year: number, month: number) {
    // Create a new Date object set to the next month's first day
    const nextMonth: any = new Date(year, month + 1, 1);

    // Subtract 1 day from the next month's first day to get the last day of the current month
    const lastDayOfMonth = new Date(nextMonth - 1);

    // Return the day component of the last day of the month
    return lastDayOfMonth.getDate();
  }
  
  const onNext = () => {
    if (dateObj.month === 11) {
      console.log("Go to next year");
      return setDateObj((prevState) => ({
        ...prevState,
        date: 0,
        month: 0,
        year: dateObj.year + 1,
      }));
    }
    // if((dateObj.month ===  3 || dateObj.month ===  5 || dateObj.month ===  8 || dateObj.month ===  10) && dateObj.date === 30 ){
    //     return console.log("Go to next month")
    // }
    return setDateObj((prevState) => ({
      ...prevState,
      month: dateObj.month + 1,
    }));
  };

  const onPrev = () => {
    if (dateObj.month === 0) {
      console.log("Go to previous year");
      return setDateObj((prevState) => ({
        ...prevState,
        date: 0,
        month: 11,
        year: dateObj.year - 1,
      }));
    }
    // if((dateObj.month ===  3 || dateObj.month ===  5 || dateObj.month ===  8 || dateObj.month ===  10) && dateObj.date === 30 ){
    //     return console.log("Go to next month")
    // }
    return setDateObj((prevState) => ({
      ...prevState,
      month: dateObj.month - 1,
    }));
  };

  //   const getLastDayOfMonth = (month: number) => {
  //     if((month ===  3 || month ===  5 || month ===  8 || month ===  10) && dateObj.date === 30 ){
  //         return 30;
  //     }
  //     return 31;
  //   }

  // const year = 2023;
  // const month = 1; // 0-based index, where 0 represents January

  // const lastDay = getLastDayOfMonth(year, month);
  // console.log(lastDay); // Output: 28 (assuming February in a non-leap year)
  // Usage example

  // console.log(getLastDayOfMonth(2024, 1))

  return (
    <div className="datepicker">
      <DatepickerHeader dateObj={dateObj} onNext={onNext} onPrev={onPrev} />
    </div>
  );
};

export default Datepicker;
