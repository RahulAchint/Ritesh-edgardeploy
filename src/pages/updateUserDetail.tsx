import React, { useEffect, useState } from "react";
import Cross from "../assets/crossIcon.png";
import Button from "../components/Button/Button";
import { useTranslation } from "react-i18next";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import firebase from "../connection/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import DownArrow from "../assets/downArrow.png";
import i18n, { t } from "i18next";

const CustomerDetailsModal = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigation = useNavigate();
  const [isSubscribe, setIsSubscribe] = useState<string>(
    state?.customer?.isSubscribe
  );
  const [fullName, setfullName] = useState<string>(state?.customer?.fullname);
  const [email, setEmail] = useState<string>(state?.customer?.email);
  // const [phone, setPhone] = useState<string>(state?.customer?.phone);

  const updateCustomerData = async () => {
    try {
      // const db = getFirestore();
      const q = query(
        collection(firebase, "users"),
        where("uid", "==", state?.customer?.uid)
      );
      const querySnapshot = await getDocs(q);

      const batch: any = [];

      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        console.log("asdffggg", doc.data());
        const updatedData = {
          ...doc.data(),
          fullname: fullName /* add updated fields here */,
          email,
          // phone,
          isSubscribe: isSubscribe === "Yes" ? true : false,
        };
        batch.push(updateDoc(docRef, updatedData));
      });

      await Promise.all(batch);
      alert("Users details successfully updated!");
      navigation(-1);
      console.log("Users details successfully updated!");
    } catch (e) {
      console.error("Error updating users details: ", e);
      alert("Error updating users details: " + JSON.stringify(e));
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

  return (
    <div className="Container-fluid loginContainer">
      <div className="modalInner ">
        <div className="modalHeader mb-4 d-flex align-items-center justify-content-between px-3 py-2 w-100">
          <p>{t("EditDetails")}</p>
        </div>
        <label className="text-start pb-1 d-block label">{t("FullName")}</label>
        <input
          className="pb-2 formInput mb-3"
          defaultValue={state?.customer?.fullname}
          onChange={(event) => setfullName(event.target.value)}
        ></input>
        <label className="text-start pb-1 d-block label">{t("Email")}</label>
        <input
          className="pb-2 formInput mb-3"
          defaultValue={state?.customer?.email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <div className="d-flex subscriptionView px-4 mb-2">
          <span className="subscriptionText">{t("Subscription")}</span>
          <div className="dropDownSecondView">
            <select
              className="dropDownSecond"
              defaultValue={
                state?.customer?.isSubscribe === true ? "Yes" : "No"
              }
              onChange={(event) => setIsSubscribe(event.target.value)}
            >
              <option value={"Yes"}>{t("Yes")}</option>
              <option value={"No"}>{t("No")}</option>
            </select>
            <img
              src={DownArrow}
              width={18}
              height={18}
              alt=""
              className={`downArrowSecond ${
                i18n.language === "he" ? "downArrowRtl" : ""
              }`}
              // style={{ position: "absolute" }}
            />
          </div>
        </div>
        <Button
          text={t("Save")}
          onButtonClick={updateCustomerData}
          color={""}
        />
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
