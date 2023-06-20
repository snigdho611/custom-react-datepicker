import { useState, useEffect } from "react";
import Datepicker from "./components/Datepicker";
import { IDate } from "interface";

function App() {
  // const [date, setDate] = useState<Date>();
  const [start, setStart] = useState<Date | null>(new Date("2023-06-21 15:25:25"));
  const [end, setEnd] = useState<Date | null>(null);

  // useEffect(() => {
  //   console.log("Start date:", start);
  //   console.log("End date: ", end);
  // }, [start, end]);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Datepicker
        width="500px"
        value={start}
        onChange={(date) => {
          if (end && date > end) {
            setEnd(null);
          }
          setStart(date);
        }}
        min={new Date(new Date().getTime() - 86400000)}
      />
      <Datepicker
        width="500px"
        value={end}
        onChange={(date) => {
          setEnd(date);
        }}
        // min={new Date(new Date().getTime() - 86400000)}
        min={start ? new Date(start.getTime()) : null}
      />
    </div>
  );
}

export default App;
