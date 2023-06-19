import { useState, useEffect } from "react";
import Datepicker from "./components/Datepicker";

function App() {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <div style={{ width: "50%",
     margin: "0 auto"
      }}>
      <Datepicker
        onChange={(e) => {
          setDate(e);
        }}
        min={new Date("2023-06-05")}
        max={new Date("2023-06-25")}
        selected={new Date()}
      />
    </div>
  );
}

export default App;
