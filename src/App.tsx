import { useEffect, useState } from "react";
import Datepicker from "./components/Datepicker";

function App() {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <div style={{ width: "50%" }}>
      <Datepicker
        onChange={setDate}
        // date={new Date(2023, 10, 10, 6, 50)}
      />
    </div>
  );
}

export default App;
