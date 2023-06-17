import { useEffect, useState } from "react";
import Datepicker from "./components/Datepicker";
import RightArrow from "icons/RightArrow";

function App() {
  const [date, setDate] = useState<Date>();

  // useEffect(() => {
  //   console.log(date);
  // }, [date]);

  return (
    <div style={{ width: "50%" }}>
      <Datepicker
        onChange={(e) => {
          setDate(e);
        }}
        min={new Date("2023-06-10")}
      />
    </div>
  );
}

export default App;

// If schedule is true, the notification_status will also be "SCHEDULED"
