import { useEffect, useState } from "react";
import Cross from "../assets/crossIcon.png";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firebase from "../connection/firebase";
import StarRatings from "react-star-ratings";
import DeleteIcon from "../assets/deleteIcon2.png";
import DeleteAlert from "./DeleteAlert";
import { SpinnerCircular } from "spinners-react";
import { t } from "i18next";

type Props = {
  onClose: () => void;
  data: any;
};

function CreateGroupRoomModal({ onClose, data }: Props) {
  return (
    <div className="modalOverlay" id="modalOverlay">
      <div className="modalInner pb-5">
        <div className="modalHeader d-flex align-items-center justify-content-between px-3 py-2 w-100">
          <h3 className="rating">Create a grouproom</h3>
          <img src={Cross} alt="Cross Icon" onClick={onClose} />
        </div>
        <div className="modalINner2 pt-2">
          <div className="spinner2">
            <SpinnerCircular color="rgba(14, 154, 161, 1)" size={40} />
          </div>
          {/* <div className=" mb-3 px-2">
                <div className="px-3 ratingCard">
                  <div className="d-flex">
                    <div className="col-10"></div>
                  </div>
                </div>
              </div> */}
        </div>
      </div>
    </div>
  );
}

export default CreateGroupRoomModal;
