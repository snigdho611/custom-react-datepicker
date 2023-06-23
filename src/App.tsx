import { useState, useEffect } from "react";
import Datepicker from "./components/Datepicker";
import { IDate } from "interface";

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
        min={new Date(new Date().getTime() - 86400000)}
      />
      <Datepicker
        width="500px"
        value={end}
        onChange={(date) => {
          setEnd(date);
        }}
        // min={new Date(new Date().getTime() - 86400000)}
        min={start ? new Date(start.getTime() - 86400000) : null}
      />
    </div>
  );
}

export default App;
