import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../libs/ApiHelper";
import moment from "moment";

function BookingDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    }
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="centerSection d-flex  flex-column">
        <div className="mb-4 py-3 userHeading">
          <h3>Booking details</h3>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Row Number : </label>
          <label>{state?.bookingDetail?.rownumber}</label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Room Id : </label>
          <label>{state?.bookingDetail?.roomId}</label>
        </div>

        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Booking Date Time : </label>

          <label>
            {moment(state?.bookingDetail?.bookingdatetime).format(
              "YYYY-MM-DD HH:mm"
            )}
          </label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Booking Status : </label>
          <label>{state?.bookingDetail?.bookingstatus}</label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Joining date time : </label>
          <label>
            {moment(state?.bookingDetail?.joining_date_time).format(
              "YYYY-MM-DD HH:mm"
            )}
          </label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around bookingDetailInput profileDetailInput">
          <label>Email Id : </label>
          <label>{state?.bookingDetail?.emailId}</label>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
