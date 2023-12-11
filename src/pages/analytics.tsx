import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
// import { Line } from 'react-chartjs-2';
import "chart.js/auto";
import Button from "../components/Button/Button";
import DownArrow from "../assets/downArrow.png";
import LineArrow from "../assets/lineArrow.png";
import { postRequest } from "../libs/ApiHelper";
import { useNavigate } from "react-router-dom";
import AnalyticsComponent, { NewBarGraph } from "../components/AnalyticsComponent";
import moment from "moment";
import { SpinnerCircular } from "spinners-react";


// const Analytics = () => {
export const Analytics = (): JSX.Element => {
  // const ref = useRef();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<any>()
  const [isLoading, setIsLoading] = useState<any>(true)
  const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const dateInputRef = useRef(null);

  const handleStartDateChange = (e: any) => {
    console.log('setStartDate', e.target.value)
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: any) => {
    console.log('setEndDate', e.target.value)
    setEndDate(e.target.value);
  };

  const getAnalytics = () => {
    if (moment(startDate).isAfter(endDate)) {
      alert(`start Date can't exceed end Date`)
    }
    else {
      setIsLoading(true)
      const body = {
        StartDate: startDate,
        EndDate: endDate
      };
      postRequest(
        body,
        "api/bookingsAdmin/getUserAnalytics",
        JSON.parse(localStorage.getItem("user") ?? "").token
      ).then((res: any) => {
        if (res ==
          `SyntaxError: Unexpected token 'I', "Invalid Token" is not valid JSON`) {
          localStorage.clear()
          navigate("/");
        } else {
          console.log("res", res);
          // if (res?.length > 0) {
          setAnalytics(res)
          // }
          // setBooking(res);
        }
        setIsLoading(false)
      });
    }
  };

  useEffect(() => {
    getAnalytics()
  }, [])


  // const data = {
  //   labels: analytics?.slots ?? ["5:00", "5:30", "6:00", "6:30"],
  //   datasets: [
  //     {
  //       data: analytics?.ActiveUsers ?? [20, 50, 10, 90],
  //       fill: true,
  //       borderColor: "rgba(75,192,192,0.2)",
  //       backgroundColor: [
  //         "rgba(31, 183, 241, 1)",
  //         "rgba(41, 179, 75, 1)",
  //         "rgba(248, 185, 20, 1)",
  //         "rgba(245, 126, 32, 1)",
  //         // "rgba(237, 28, 36, 1)",
  //       ],
  //     },
  //   ],
  // };






  return (
    <div className="mb-5 overFlow p-4 vh-100 container">
      <div className="d-flex  mb-5 justify-content-center gap-3 align-items-center graphContainer">
        <p style={{ color: "black" }}>From</p>
        <div className="datePicker">

          <input type="date" onChange={handleStartDateChange} ref={dateInputRef} value={startDate} />
          <p style={{ display: "none" }}>{startDate}</p>
        </div>
        <p style={{ color: "black" }}>To</p>
        <div className="datePicker">
          <input type="date" onChange={handleEndDateChange} ref={dateInputRef} value={endDate} />
          <p style={{ display: "none" }}>{endDate}</p>
        </div>
        {/* <DatePicker />

        <DatePicker /> */}

        {/* <div className="d-flex align-items-start subBookingSection">
          <select
            className="px-5 dropDownSelect"
            defaultValue={""}
            onChange={(event) => { }}
          >
            <option value={"select"}>Select</option>
            <option value={"cancel"}>Cancel</option>
            <option value={"done"}>Done</option>
            <option value={"completed"}>Completed</option>
            <option value={"progress"}>Progress</option>
          </select>
          <img
            src={DownArrow}
            width={20}
            height={20}
            className="downArrowIconAnalytics"
            alt=""
          />
        </div> */}
        <Button
          shape="round"
          text="Submit"
          color={"#FE6969 "}
          onButtonClick={getAnalytics}
        />
      </div>
      {/* Grouped Bar Graph */}
      {isLoading ?
        <div className="spinner">
          <SpinnerCircular color="rgba(14, 154, 161, 1)" />
        </div> :
        analytics === undefined || analytics.length < 1 ?
          (
            <h3 style={{ color: 'black' }}>
              No data Found
            </h3>
          ) :
          <div className="mb-5">
            <div className="d-flex justify-content-center align-items-center mt-5">
              <div className="position-relative barGraphArrow">
                <img src={DownArrow} alt="" className="barGraphDownArrow" />
                <p className="bothSideArrow"></p>
                <img src={DownArrow} alt="" className="barGraphUpArrow" />
                <label className="barGraphText">Users</label>
              </div>

              <NewBarGraph analytics={analytics} />

              {/* <Bar ref={ref} data={data} /> */}
            </div>
            <div className="position-relative d-flex justify-content-center horizontalBarGraphArrow">
              <img
                src={DownArrow}
                alt=""
                className="barGraphHorizontalLeftArrow"
                color={"red"}
              />
              {/* <div className='bothSideArrowContainer'> */}
              <p className="bothSideHorizontalArrow"></p>
              <img src={DownArrow} alt="" className="barGraphHorizontalRightArrow" />
            </div>
            <label className="barGraphUserText">Time slots</label>
          </div>
      }
      {/* {analytics !== undefined && analytics.map((analytic: any) => {
        return (
          <div className="mb-5">
            <label>Date: {moment(analytic?.date).format('YYYY-MM-DD')}</label>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <div className="position-relative barGraphArrow">
                <img src={DownArrow} alt="" className="barGraphDownArrow" />
                <p className="bothSideArrow"></p>
                <img src={DownArrow} alt="" className="barGraphUpArrow" />
                <label className="barGraphText">Users</label>
              </div>

              <AnalyticsComponent analytics={analytic} />

            </div>
            <div className="position-relative d-flex justify-content-center horizontalBarGraphArrow">
              <img
                src={DownArrow}
                alt=""
                className="barGraphHorizontalLeftArrow"
                color={"red"}
              />
              <p className="bothSideHorizontalArrow"></p>
              <img src={DownArrow} alt="" className="barGraphHorizontalRightArrow" />
            </div>
            <label className="barGraphUserText">Time slots</label>
          </div>
        )
      })} */}

    </div>
  );
};

export default Analytics;
