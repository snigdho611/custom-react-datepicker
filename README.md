# React DateTime Selector

<p>The React DateTime Selector is a control for <a href="https://reactjs.org">React</a>. It makes a more customizable UI and allows date and time picking intricacies.</p>
<p>It provides with the option of selecting the default year, month, date, hours and minute.</p>

<b><i>Initial UI</i></b>
<img height="400px" src="https://res.cloudinary.com/drnym8nne/image/upload/v1688583880/datepicker/Screenshot_2023-07-06_010309_jqkdn4.png" alt="MUI logo">

<ul>
    <li>
        The current value for the picker is set to the current day and time.
    </li>
    <li>
        It can be changed as per requirement by passing a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date" >Date</a> object.
    </li>
    <li>
        Allows selection of the <b>minimum</b> and <b>maximum</b> values for range.
    </li>
</ul>

<b>Version Update: 1.0.1</b>

<ul>
    <li>Option to set Minimum date
        <ul>
            <li>Added a minimum range option that allows a dynamic date value to be passed</li>
            <li>Selecting any date or time before the minimum value that is set is not possible</li>
        </ul>
    </li>
    <li>Option to set Maximum date
        <ul>
            <li>Added a maximum range option that allows a dynamic date value to be passed</li>
            <li>Selecting any date or time beyond the maximum value that is set is not possible</li>
        </ul>
    </li>
    <li>Noticeable updates to the UI</li>
</ul>

For implementation, the Datepicker components needs to be imported to the component.

<ul>
    <li>
        The state of the Datepicker is held in a state, typed as a <span style="color: gold;">Date</span> or <span style="color: red;">null</span> value
    </li>
    <li>
        The onChange function works to get the newly set state back and update the original state variable
    </li>
</ul>

```ts
const [dateVal, setDateVal] = useState<Date | null>(null);

<Datepicker
  width="500px"
  value={dateVal}
  onChange={(date) => {
    setDateVal(date);
  }}
/>;
```

<b>Update 07.06.23</b>

<p>As of the current release (1.0.1), it is possible to add a range for minimum and maximum value in the datepicker, before and after which selection will not be possible respectively.

A single Date object can be passed into the Datepicker for both the minimum and the maximum value, the prop names being `min` and `max` for each.

```ts
const [dateVal, setDateVal] = useState<Date | null>(null);

<Datepicker
  width="500px"
  value={dateVal}
  onChange={(date) => {
    setDateVal(date);
  }}
  min={new Date("2023-07-02 01:02:00")}
  min={new Date("2023-07-28 12:55:00")}
/>;
```

Alternatively, the minimum and maximum can also be kept inside states in order to update them when needed.

```ts
const [dateVal, setDateVal] = useState<Date | null>(null);
const [min, setMin] = useState<Date>("2023-07-02 01:02:00");
const [max, setMax] = useState<Date>("2023-07-28 12:55:00");

<Datepicker
  width="500px"
  value={dateVal}
  onChange={(date) => {
    setDateVal(date);
  }}
  min={min}
  max={max}
/>;
```

<p>Note: Minimum and maximum ranges can work independently, i.e. one does not need to be set for the other to work</p>

<b><i>Updated UI after setting the minimum and maximum values respectively</i></b>
<img height="400px" src="https://res.cloudinary.com/drnym8nne/image/upload/v1688583880/datepicker/Screenshot_2023-07-06_010429_rx6xhk.png" alt="MUI logo">

Deployed <a href="https://custom-react-datepicker-pi.vercel.app/">here</a> in <a href="http://vercel.com">Vercel</a>
Developed with: TypeScript, React JS.
