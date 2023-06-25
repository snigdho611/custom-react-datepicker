import { useState } from "react";
import Datepicker from "./components/Datepicker";

function App() {
  const [start, setStart] = useState<Date | null>(new Date("2023-06-12 05:37:00"));
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
        min={new Date("2023-06-10 10:52:00")}
        max={new Date("2023-06-12 11:21:00")}
        // min={new Date("2023-06-10 09:20")}
        // max={new Date("2023-06-10 11:30:00")}
        // min={new Date(new Date().getTime() - 86400000)}
      />
    </div>
  );
}

export default App;
