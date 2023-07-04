import { useState } from "react";
import Datepicker from "./components/Datepicker";

function App() {
  const [start, setStart] = useState<Date | null>(null);
  const [date, setDate] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [hours, setHours] = useState<number>(new Date().getHours());
  const [minutes, setMinutes] = useState<number>(new Date().getMinutes());
  const [min, setMin] = useState<null | Date>(null);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="number"
        max={31}
        min={1}
        value={date}
        onChange={(e) => setDate(Number(e.target.value))}
      />
      <input
        type="number"
        max={12}
        min={1}
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      />
      <input
        type="number"
        max={2050}
        min={1950}
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      />
      <input
        type="number"
        max={23}
        min={0}
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
      />
      <input
        type="number"
        max={59}
        min={0}
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
      />
      <button
        onClick={() => {
          if (new Date(`${year}-${month}-${date} ${hours}:${minutes}`)) {
            console.log(new Date(`${year}-${month}-${date} ${hours}:${minutes}`));
            setMin(new Date(`${year}-${month}-${date} ${hours}:${minutes}`));
          }
        }}
      >
        Set
      </button>
      <Datepicker
        width="500px"
        value={start}
        onChange={(date) => {
          setStart(date);
        }}
        min={new Date("2023-07-04 16:40:00")}
      />
    </div>
  );
}

export default App;
