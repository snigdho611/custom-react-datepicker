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
        onChange={(e)=>{
          setDate(e)
        }}
      />
    </div>
  );
}

export default App;

// If schedule is true, the notification_status will also be "SCHEDULED"