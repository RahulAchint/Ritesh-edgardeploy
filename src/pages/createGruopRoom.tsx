import React, { useEffect, useRef, useState } from "react";
import UserIcon from "../assets/userIcon.png";
import Button from "../components/Button/Button";
import DownArrow from "../assets/downArrow.png";
import { postRequest } from "../libs/ApiHelper";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

function CreateGroupRoom() {
  const navigate = useNavigate();
  const [createRoom, setCreateRoom] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const allTimeZones = moment.tz.names();

  const onCreateRoom = () => {
    const gmtDateTime = moment
      .tz(date + " " + time, timeZone)
      .utc()
      .format("YYYY-MM-DD HH:mm");
    // console.log('createRoom', date, time, subject, gmtDateTime)
    const body = {
      startdate: date,
      gradeId: "",
      grade: "",
      subject: subject,
      sessiontime: `${time}:00`,
      regiontime: `${gmtDateTime}:00`,
    };
    console.log("createRoom", body);
    postRequest(
      body,
      "api/roomAdmin/createRoom",
      JSON.parse(localStorage.getItem("user") ?? "").token
    ).then((res: any) => {
      console.log("res", res);
      navigate(-1);
    });
  };
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    }
  }, []);

  const onTimeChange = (e: any) => {
    setTime(e.target.value);
  };

  const onChangeSubject = (e: any) => {
    setSubject(e.target.value);
  };

  const dateInputRef = useRef(null);

  const handleChange = (e: any) => {
    setDate(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="centerSection d-flex  flex-column">
        <div className="mb-5 pt-2 userHeading">
          {/* <img src={UserIcon} alt="" width={35} height={35} /> */}
          <h3>Create a Room</h3>
        </div>
        <div className="inputMainContainer">
          {}
          <div className="mb-4 d-flex justify-content-between datePickerRoom ">
            <label>Date : </label>
            <input
              type="date"
              className="inputTime"
              onChange={handleChange}
              ref={dateInputRef}
            />
            <p style={{ display: "none" }}>{date}</p>
          </div>
          <div className="mb-4 d-flex justify-content-between datePickerRoom">
            <label>Time : </label>
            <input
              type="time"
              className="inputTime"
              value={time}
              onChange={onTimeChange}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between datePickerRoom">
            <label>Subject : </label>
            <input
              type="search"
              className="inputTime"
              value={subject}
              onChange={onChangeSubject}
            />
          </div>
          <div className="mb-4 d-flex justify-content-between position-relative datePickerRoom">
            <label>TimeZone : </label>
            <div
              className="d-flex align-items-start pb-2 position-relative roomGradeDropdownView"
              style={{ width: "57%" }}
            >
              <select
                className="px-5 py-1 roomGradeDropdown"
                defaultValue={""}
                onChange={(event) => setTimeZone(event.target.value)}
              >
                <option>Select TimeZone</option>
                {allTimeZones.map((tz) => (
                  <option value={tz}>{tz}</option>
                ))}
              </select>
              <img
                src={DownArrow}
                width={20}
                height={20}
                className="downArrowIcon"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center pb-5">
          <Button
            shape="round"
            text="Create a Room"
            color={"#FE6969 "}
            onButtonClick={onCreateRoom}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateGroupRoom;
