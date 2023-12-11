import React, { useEffect, useState } from "react";
import UserIcon from "../assets/userIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../libs/ApiHelper";

function UserDetail() {
  const { state } = useLocation();
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();
  const UserDetail = () => {
    const body = {
      Id: state?.user?.id,
    };
    postRequest(
      body,
      "api/usersAdmin/getUsersDetailsById",
      JSON.parse(localStorage.getItem("user") ?? "").token
    ).then((user) => {
      console.log("resp", user);
      if (user?.res?.length > 0) setUser(user.res[0][0]);
    });
  };
  useEffect(() => {
    console.log("user", user);
    if (localStorage.getItem("user") === null) {
      navigate("/");
    } else {
      UserDetail();
    }
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="centerSection d-flex  flex-column mt-3 col-sm-8">
        <div className="mb-4 py-3 userHeading">
          {/* <img src={UserIcon} alt="" width={35} height={35} /> */}
          <h3>User Details</h3>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-4 d-flex justify-content-center profileDetailInput">
            {/* <label>Profile : </label> */}
            <img src={user?.picture} alt="" className="userImg" />
          </div>
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>User Id : </label>
            <label>{user?.userId}</label>
          </div>
          {/* <div className="mb-4 d-flex justify-content-around bookingDetailInput profileDetailInput">
            <label>Grade Id : </label>
            <label>{state?.user?.gradeId}</label>
          </div> */}
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Grade : </label>
            <label>{state?.user?.grade}</label>
          </div>
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Language : </label>
            <label>{state?.user?.language}</label>
          </div>
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Language Code : </label>
            <label>{state?.user?.languagecode}</label>
          </div>
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Gender : </label>
            <label>{state?.user?.gender}</label>
          </div>
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Gmail Id : </label>
            <label>{state?.user?.emailId}</label>
          </div>
          {/* <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Language : </label>
            <label>{user?.language}</label>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
