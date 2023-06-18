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
        min={new Date(new Date().getTime() - 86400000)}
        max={new Date(new Date().getTime())}
        selected={new Date()}
      />
    </div>
  );
}

export default App;
