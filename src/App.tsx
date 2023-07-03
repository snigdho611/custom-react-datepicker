import { useState } from "react";
import Datepicker from "./components/Datepicker";

function App() {
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(null);

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
        min={start}
        max={new Date("2023-07-29 11:21:00")}
        time={"true"}
      />
    </div>
  );
}

export default App;
