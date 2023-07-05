import { useState } from "react";
import Datepicker from "./components/Datepicker";

function App() {
  const [dateVal, setDateVal] = useState<Date | null>(null);
  const [minDate, setMinDate] = useState<number>(2);
  const [minMonth, setMinMonth] = useState<number>(new Date().getMonth());
  const [minYear, setMinYear] = useState<number>(new Date().getFullYear());
  const [minHours, setMinHours] = useState<number>(new Date().getHours());
  const [minMinutes, setMinMinutes] = useState<number>(new Date().getMinutes());
  const [min, setMin] = useState<null | Date>(null);

  const [maxDate, setMaxDate] = useState<number>(28);
  const [maxMonth, setMaxMonth] = useState<number>(new Date().getMonth());
  const [maxYear, setMaxYear] = useState<number>(new Date().getFullYear());
  const [maxHours, setMaxHours] = useState<number>(new Date().getHours());
  const [maxMinutes, setMaxMinutes] = useState<number>(new Date().getMinutes());
  const [max, setMax] = useState<null | Date>(null);

  return (
    <>
      <div className="rangebar">
        <div className="rangebar_row">
          <div></div>
          <div className="rangebar_row_cell">Date</div>
          <div className="rangebar_row_cell">Month</div>
          <div className="rangebar_row_cell">Year</div>
          <div className="rangebar_row_cell">Hours</div>
          <div className="rangebar_row_cell">Minutes</div>
        </div>
        <div className="rangebar_row">
          <div className="rangebar_row_cell">Min Date:</div>
          <div className="rangebar_row_cell">
            <input
              type="number"
              className="rangebar_row_cell_input"
              max={31}
              min={1}
              value={minDate}
              onChange={(e) => setMinDate(Number(e.target.value))}
            />
          </div>
          <div className="rangebar_row_cell">
            <input
              type="number"
              className="rangebar_row_cell_input"
              max={11}
              min={0}
              value={minMonth}
              onChange={(e) => setMinMonth(Number(e.target.value))}
            />
          </div>
          <div className="rangebar_row_cell">
            <input
              type="number"
              className="rangebar_row_cell_input"
              max={2050}
              min={1950}
              value={minYear}
              onChange={(e) => setMinYear(Number(e.target.value))}
            />
          </div>
          <div className="rangebar_row_cell">
            <input
              type="number"
              className="rangebar_row_cell_input"
              max={23}
              min={0}
              value={minHours}
              onChange={(e) => setMinHours(Number(e.target.value))}
            />
          </div>
          <div className="rangebar_row_cell">
            <input
              type="number"
              className="rangebar_row_cell_input"
              max={59}
              min={0}
              value={minMinutes}
              onChange={(e) => setMinMinutes(Number(e.target.value))}
            />
          </div>
          <div className="rangebar_row_cell">
            <button
              className="rangebar_row_cell_button"
              onClick={() => {
                if (new Date(`${minYear}-${minMonth + 1}-${minDate} ${minHours}:${minMinutes}`)) {
                  if (max) {
                    if (
                      max.getTime() <
                      new Date(
                        `${minYear}-${minMonth + 1}-${minDate} ${minHours}:${minMinutes}`
                      ).getTime()
                    ) {
                      alert("Maximum date cannot be less than minimum date");
                    } else {
                      setMin(
                        new Date(`${minYear}-${minMonth + 1}-${minDate} ${minHours}:${minMinutes}`)
                      );
                    }
                  } else {
                    setMin(
                      new Date(`${minYear}-${minMonth + 1}-${minDate} ${minHours}:${minMinutes}`)
                    );
                  }
                }
              }}
            >
              Set
            </button>
          </div>
          <div className="rangebar_row_cell">
            <button
              className="rangebar_row_cell_button"
              onClick={() => {
                setMin(null);
              }}
            >
              Clear
            </button>
          </div>
          <div className="rangebar_row_cell">
            <span>{min ? new Date(min).toString() : ""}</span>
          </div>
        </div>

        <div className="rangebar_row">
          <div className="rangebar_row_cell">Max Date:</div>
          <div className="rangebar_row_cell">
            <input
              type="number"
              className="rangebar_row_cell_input"
              max={31}
              min={1}
              value={maxDate}
              onChange={(e) => setMaxDate(Number(e.target.value))}
            />
          </div>
          <div className="rangebar_row_cell">
            <input
              type="number"
              className="rangebar_row_cell_input"
              max={11}
              min={0}
              value={maxMonth}
              onChange={(e) => setMaxMonth(Number(e.target.value))}
            />
          </div>
          <div className="rangebar_row_cell">
            <input
              type="number"
              className="rangebar_row_cell_input"
              max={2050}
              min={1950}
              value={maxYear}
              onChange={(e) => setMaxYear(Number(e.target.value))}
            />
          </div>
          <div className="rangebar_row_cell">
            <input
              type="number"
              className="rangebar_row_cell_input"
              max={23}
              min={0}
              value={maxHours}
              onChange={(e) => setMaxHours(Number(e.target.value))}
            />
          </div>
          <div className="rangebar_row_cell">
            <input
              type="number"
              className="rangebar_row_cell_input"
              max={59}
              min={0}
              value={maxMinutes}
              onChange={(e) => setMaxMinutes(Number(e.target.value))}
            />
          </div>
          <div className="rangebar_row_cell">
            <button
              className="rangebar_row_cell_button"
              onClick={() => {
                if (new Date(`${maxYear}-${maxMonth + 1}-${maxDate} ${maxHours}:${maxMinutes}`)) {
                  if (min) {
                    if (
                      min.getTime() >
                      new Date(
                        `${maxYear}-${maxMonth + 1}-${maxDate} ${maxHours}:${maxMinutes}`
                      ).getTime()
                    ) {
                      alert("Minimum date cannot be greater than maximum date");
                    } else {
                      setMax(
                        new Date(`${maxYear}-${maxMonth + 1}-${maxDate} ${maxHours}:${maxMinutes}`)
                      );
                    }
                  } else {
                    setMax(
                      new Date(`${maxYear}-${maxMonth + 1}-${maxDate} ${maxHours}:${maxMinutes}`)
                    );
                  }
                }
              }}
            >
              Set
            </button>
          </div>
          <div className="rangebar_row_cell">
            <button
              className="rangebar_row_cell_button"
              onClick={() => {
                setMax(null);
              }}
            >
              Clear
            </button>
          </div>
          <div className="rangebar_row_cell">
            <span>{max ? new Date(max).toString() : ""}</span>
          </div>
        </div>
      </div>
      <Datepicker
        width="500px"
        value={dateVal}
        onChange={(date) => {
          setDateVal(date);
        }}
        min={min}
        max={max}
      />
    </>
  );
}

export default App;
