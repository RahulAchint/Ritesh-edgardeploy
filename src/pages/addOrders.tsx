// import { useEffect,useState } from "react";
import React, { useEffect, useState } from "react";
// import Checkmark from "../assets/checkmark.png";
// import ArrowDown from "../assets/arrowDown.png";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import firebase from "../connection/firebase";
// import { DASHBOARD_USER_TYPES } from "../libs/UtilityHelper";
// import { SpinnerCircular } from "spinners-react";
// import SidebarItems from "../components/SidebarItems";
// import { firebase as fb } from 'firebase/auth';
import Icon from "../assets/backButton.png";
import image from "../assets/loginbackgroundimage.png";
import Button from "../components/Button/Button";
import firebase from "../connection/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DownArrow from "../assets/downArrow.png";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import "react-datepicker/dist/react-datepicker.css";

function Login(route: any) {
  const navigation = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { t } = useTranslation();
  const { state } = useLocation();
  const orders = JSON.parse(state.order);
  const [ispayment, setIsPayment] = useState<string>(orders?.payment);
  const [status, setStatus] = useState<string>(orders?.status);
  const [hours, setHours] = useState<string>(orders?.hours);
  const [total, setTotal] = useState<string>(orders?.total);
  const [address, setAddress] = useState<string>(orders?.address);
  console.log("state", route, state);

  const updateCustomerData = async () => {
    try {
      // const db = getFirestore();
      const q = query(
        collection(firebase, "orders"),
        where("clientId", "==", orders?.clientId),
        where("workerId", "==", orders?.workerId)
      );
      const querySnapshot = await getDocs(q);

      const batch: any = [];

      querySnapshot.forEach((doc) => {
        if (doc.id === orders?.docId) {
          const docRef = doc.ref;
          console.log("asdffggg", doc.data());
          const updatedData = {
            ...doc.data(),
            // ispayment,
            status,
            hours,
            total,
            address,
            /* add updated fields here */
          };
          batch.push(updateDoc(docRef, updatedData));
        }
      });

      await Promise.all(batch);
      alert("orders details successfully updated!");
      navigation(-1);
      console.log("orders details successfully updated!");
    } catch (e) {
      console.error("Error updating orders details: ", e);
      alert("Error updating orders details: " + JSON.stringify(e));
    }
  };

  const onButtonClick = () => {
    updateCustomerData();
  };

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigation("/");
    }
  }, []);

  const onStartDate = (event: any) => {
    event.target.type = "date";
  };

  return (
    <div className="Container-fluid bookings">
      <div className="bookingCard py-3">
        <h1 className="orderHeading pb-5">{t("UpdateOrder")}</h1>
        {/* <div className="d-flex flex-direction-row bookingSectionView"> */}
        {/* <div className="pb-2 bookingSection"> */}
        <span className={"pb-1 payment"}>{t("Payment")}</span>
        <div className="d-flex align-items-start pb-2 subBookingSection">
          <select
            className={"px-5 py-2 dropDownSelect"}
            defaultValue={orders?.ispayment === true ? "Yes" : "No"}
            onChange={(event) => setIsPayment(event.target.value)}
          >
            <option value={"Yes"}>{t("Yes")}</option>
            <option value={"No"}>{t("No")}</option>
          </select>
          <img
            src={DownArrow}
            width={20}
            height={20}
            className="downArrowIcon"
            alt=""
          />
        </div>
        {/* </div> */}
        {/* <div className="pb-2 bookingSection"> */}
        <span className="pb-1 status">{t("Status")}</span>
        <div className="d-flex align-items-start pb-2 subBookingSection">
          <select
            className="px-5 py-2 dropDownSelect"
            defaultValue={orders?.status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value={"cancel"}>{t("Cancel")}</option>
            <option value={"done"}>{t("Done")}</option>
            <option value={"completed"}>{t("Completed")}</option>
            <option value={"progress"}>{t("Progress")}</option>
          </select>
          <img
            src={DownArrow}
            width={20}
            height={20}
            className="downArrowIcon"
            alt=""
          />
        </div>
        {/* </div> */}
        <div className="d-flex align-items-start pb-4 editCard">
          <span className="pb-1">{t("Hours")}</span>
          <input
            type="number"
            defaultValue={orders?.hours}
            onChange={(event) => setHours(event.target.value)}
            className="category py-2 mb-2"
          />

          {/* <div className="d-flex align-items-start pb-2"> */}
          <span className="pb-1">{t("Total")}</span>

          <input
            type="text"
            defaultValue={orders?.total}
            onChange={(event) => setTotal(event.target.value)}
            className="category py-2 mb-2"
          />
          {/* </div> */}
          {/* <div className="d-flex align-items-start mt-4 pb-2"> */}
          <span className="pb-1">{t("Address")}</span>

          {/* <div className="d-flex align-items-start pb-5"> */}
          <input
            type="text"
            defaultValue={orders?.address}
            onChange={(event) => setAddress(event.target.value)}
            className="category py-2 mb-1"
          />
        </div>
        <Button
          text={t("Update")}
          onButtonClick={updateCustomerData}
          shape="round"
          color={""}
        />
      </div>

      {/* <Button text={t("Delete")} onButtonClick={() => {}} /> */}
      {/* <div className="d-flex flex-direction-row justify-content-center">
            <p className="mx-2">{t("HaveAccount")} </p>

            <p onClick={() => setIsLogin(true)} className="signUp">
              {" "}
              {t("Login")}
            </p>
          </div> */}
    </div>
    //  </div>
  );
}

export default Login;
