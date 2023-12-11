import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../libs/ApiHelper";

function BookingDetail() {
  const { state } = useLocation();
  const [booking, setBooking] = useState<any>();
  const [grade, setGrade] = useState(booking?.grade);
  const navigate = useNavigate();
  const Booking = () => {
    const body = {
      Id: "74",
    };
    postRequest(
      body,
      "api/usersAdmin/getRoomsDetailsById",
      JSON.parse(localStorage.getItem("user") ?? "").token
    ).then((booking) => {
      console.log("resp", booking.res[0][0]);
      if (booking?.res?.length > 0) setBooking(booking.res[0][0]);
    });
  };
  useEffect(() => {
    console.log("booking", booking);
    if (localStorage.getItem("user") === null) {
      navigate("/");
    } else {
      Booking();
    }
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="centerSection d-flex  flex-column">
        <div className="mb-4 py-3 userHeading">
          <h3>Booking details</h3>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Grade : </label>
          <input
            type="text"
            placeholder={booking?.grade}
            onChange={(event) => setGrade(event.target.value)}
            value={grade}
            disabled={true}
          />
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Invite code : </label>
          <label>{booking?.invitecode}</label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Session time : </label>
          <label>{booking?.sessiontime}</label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Start date : </label>
          <label>{booking?.startdate}</label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Subject : </label>
          <label>{booking?.subject}</label>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
