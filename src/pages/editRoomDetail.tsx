import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { patchRequest, postRequest } from "../libs/ApiHelper";
import { json } from "stream/consumers";
import Button from "../components/Button/Button";

function RoomDetail() {
  const { state } = useLocation();
  const [roomDetail, setRoomDetail] = useState<any>();
  console.log("roomDetail", roomDetail);
  const [id, setId] = useState(state?.roomDetail?.id);
  const [inviteCode, setInviteCode] = useState(state?.roomDetail?.inviteCode);
  const [subject, setSubject] = useState(state?.roomDetail?.subject);
  const [grade, setGrade] = useState(state?.roomDetail?.grade);
  const [sessionTime, setSessionTime] = useState(
    state?.roomDetail?.sessiontime
  );
  const [startDate, setStartDate] = useState(state?.roomDetail?.startdate);
  const [lastname, setLastName] = useState(state?.roomDetail?.lastname);
  const navigate = useNavigate();
  // const RoomDetail = () => {
  //   const body = {
  //     Id: state?.roomDetail?.id,
  //   };
  //   postRequest(
  //     body,
  //     "api/usersAdmin/getRoomsDetailsById",
  //     JSON.parse(localStorage.getItem("user") ?? "").token
  //   ).then((room) => {
  //     console.log("resp", room.res[0][0]);
  //     if (room?.res?.length > 0) setRoomDetail(room.res[0][0]);
  //   });
  // };
  useEffect(() => {
    console.log("room", roomDetail);
    if (localStorage.getItem("user") === null) {
      navigate("/");
    }
    //  else {
    //   RoomDetail();
    // }
  }, []);

  const UpdateRoomDetail = () => {
    const body = {
      id: id,
      invitecode: inviteCode,
      sessiontime: sessionTime,
      startdate: startDate,
      subject: subject,
    };
    patchRequest(
      "api/roomAdmin/updateRoomById",
      body,
      JSON.parse(localStorage.getItem("user") ?? "").token
    )
      .then((room) => {
        alert("Updated successfully");
        console.log("udpdated data", room);
        navigate(-1);
        if (room?.res?.length > 0) setRoomDetail(room);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="centerSection d-flex  flex-column">
        <div className="mb-4 py-3 userHeading">
          <h3>Room details</h3>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around profileDetailInput">
          <label>Invite code : </label>
          <label>{roomDetail?.invitecode}</label>
          {/* <input
            type="text"
            placeholder={roomDetail?.invitecode}
            onChange={(event) => setInviteCode(event.target.value)}
            value={inviteCode}
          /> */}
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around profileDetailInput">
          <label>Row Number : </label>
          <label>{roomDetail?.rownumber}</label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around profileDetailInput">
          <label>Session time : </label>
          <label>{roomDetail?.sessiontime}</label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around profileDetailInput">
          <label>Start date : </label>
          <label>{roomDetail?.startdate}</label>
        </div>
        <div className="mb-4 pb-3 d-flex justify-content-around profileDetailInput">
          <label>Subject : </label>
          <label>{roomDetail?.subject}</label>
        </div>
        <div className="pb-4 updateButton">
          <Button
            text={"Update"}
            color={"rgb(254, 105, 105)"}
            onButtonClick={UpdateRoomDetail}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
