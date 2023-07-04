import { useState } from "react";
import Datepicker from "./components/Datepicker";

function App() {
  const [start, setStart] = useState<Date | null>(null);
  const [minDate, setMinDate] = useState<number>(new Date().getDate());
  const [minMonth, setMinMonth] = useState<number>(new Date().getMonth() + 1);
  const [minYear, setMinYear] = useState<number>(new Date().getFullYear());
  const [minHours, setMinHours] = useState<number>(new Date().getHours());
  const [minMinutes, setMinMinutes] = useState<number>(new Date().getMinutes());
  const [min, setMin] = useState<null | Date>(null);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="number"
        max={31}
        min={1}
        value={minDate}
        onChange={(e) => setMinDate(Number(e.target.value))}
      />
      <input
        type="number"
        max={12}
        min={1}
        value={minMonth}
        onChange={(e) => setMinMonth(Number(e.target.value))}
      />
      <input
        type="number"
        max={2050}
        min={1950}
        value={minYear}
        onChange={(e) => setMinYear(Number(e.target.value))}
      />
      <input
        type="number"
        max={23}
        min={0}
        value={minHours}
        onChange={(e) => setMinHours(Number(e.target.value))}
      />
      <input
        type="number"
        max={59}
        min={0}
        value={minMinutes}
        onChange={(e) => setMinMinutes(Number(e.target.value))}
      />
      <button
        onClick={() => {
          if (new Date(`${minYear}-${minMonth}-${minDate} ${minHours}:${minMinutes}`)) {
            // console.log(new Date(`${minYear}-${minMonth}-${minDate} ${minHours}:${minMinutes}`));
            setMin(new Date(`${minYear}-${minMonth}-${minDate} ${minHours}:${minMinutes}`));
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
        min={min}
      />
    </div>
  );
}

export default App;
