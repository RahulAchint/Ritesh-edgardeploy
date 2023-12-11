import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../libs/ApiHelper";

function RoomDetail() {
  const [roomDetail, setRoomDetail] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("booking", roomDetail);
    if (localStorage.getItem("user") === null) {
      navigate("/");
    }
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="centerSection d-flex  flex-column">
        <div className="mb-4 py-3 userHeading">
          <h3>Room details</h3>
        </div>

        <div className="mb-4 pb-3 d-flex justify-content-around profileDetailInput">
          <label>Invite code : </label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around profileDetailInput">
          <label>Row Number : </label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around profileDetailInput">
          <label>Session time : </label>
        </div>

        <div className="mb-4 pb-3 d-flex justify-content-around profileDetailInput">
          <label>Start date : </label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around profileDetailInput">
          <label>Subject : </label>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
