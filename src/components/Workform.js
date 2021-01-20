import React, { useState } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { formatDistanceToNow } from "date-fns/esm";

const Schema = yup.object().shape({
  wdate: yup
    .string()
    .required()
    .min(3)
});
function Workform() {
  const { handleSubmit, register, errors, control, watch } = useForm();
  const { startDate, endDate } = watch(["startDate", "endDate"]);
  const [frmdata, setFrmdata] = useState([]);
  const [whr, setWhr] = useState("");

  const onSubmit = formData => {
    const newTodos = [formData, ...frmdata];
    setFrmdata(newTodos);
    console.log(frmdata);
    var hourDiff =
      formData.todatetime.getTime() - formData.fromdatetime.getTime(); //in ms
    var secDiff = hourDiff / 1000; //in s
    var minDiff = hourDiff / 60 / 1000; //in minutes
    var hDiff = hourDiff / 3600 / 1000; //in hours
    var humanReadable = {};
    humanReadable.hours = Math.floor(hDiff);
    humanReadable.minutes = minDiff - 60 * humanReadable.hours;
    /*fetch("http://localhost/wks/pk.php", {
      method: "POST",
      body: JSON.stringify({
        title: "Pankaj",
        body: "Some Text",
        userid: 2
      }),
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
      .then(response => response.json)
      .then(json => console.log(json));
*/
    setWhr(humanReadable);
  };

  return (
    <>
      <h1> Welcome to Work Keeping form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="date"> From Date</label>
          <Controller
            control={control}
            name="fromdatetime"
            innerRef={register}
            render={({ onChange, onBlur, value, selected }) => (
              <DatePicker
                dateFormat="dd-MM-yyyy h:mm"
                showTimeSelect
                dateFormat="Pp"
                selectsStart
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
        </div>
        {errors.fromdatetime && (
          <p className="alert alert-danger">{errors.fromdatetime.message}</p>
        )}
        <div className="form-group">
          <label>End Date</label>
          <Controller
            control={control}
            name="todatetime"
            innerRef={register}
            render={({ onChange, onBlur, value, selected }) => (
              <DatePicker
                dateFormat="dd-MM-yyyy h:mm"
                showTimeSelect
                dateFormat="Pp"
                selectsStart
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
        </div>

        <div className="form-group">
          <label>Total Hours</label>
          <input
            type="text"
            className="form-control"
            placeholder="Total Hours"
            value={
              whr.hours != null
                ? whr.hours +
                  " hours and " +
                  Math.round(whr.minutes, 2) +
                  " minutes"
                : null
            }
            readOnly="readonly"
            name="hrs"
          />
        </div>

        <button type="submit">Submit</button>
        <h1>Form Listing</h1>
        <ul>
          {frmdata != null
            ? frmdata.map((i, x) => {
                <li id={i}>{x}</li>;
              })
            : ""}
        </ul>
      </form>
    </>
  );
}

export default Workform;
