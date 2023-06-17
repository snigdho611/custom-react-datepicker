import { useState, useEffect } from "react";
import Datepicker from "./components/Datepicker";

function App() {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <div style={{ width: "50%" }}>
      <Datepicker
        onChange={(e) => {
          setDate(e);
        }}
        min={new Date("2023-06-10")}
        max={new Date("2023-06-25")}
        selected={new Date("2023-06-21 15:25:25")}
      />
    </div>
  );
}

export default App;
