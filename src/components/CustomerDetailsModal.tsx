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

function CustomerDetailsModal({ onClose, data }: Props) {
  const [ratingList, setRatingList] = useState<any>([]);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isNoData, setIsNoData] = useState(false);

  const getRating = async () => {
    try {
      const q = query(
        collection(
          firebase,
          data.type === "client" ? "client_rates" : "worker_rates"
        ),
        where(
          data.type === "client" ? "clientId" : "workerId",
          "==",
          data?.docId
        )
      );
      const querySnapshot = await getDocs(q);
      let rating: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        rating.push(doc.data());
      });
      setRatingList(rating);
      setIsLoading(false);
      if (rating?.length === 0) {
        setIsNoData(true);
      } else {
        setIsNoData(false);
      }
      console.log("rating", rating);
      // setIsLoading(false);
      // setCustomerList(clientData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getRating();
  }, []);

  const onDeleteConfirm = async (uid: any) => {
    console.log("selectedUid", selectedOrderId);

    try {
      const usersRef = collection(
        firebase,
        data.type === "client" ? "client_rates" : "worker_rates"
      );
      const q = query(usersRef, where("orderId", "==", selectedOrderId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setIsDeleteAlert(false);
      setTimeout(() => {
        alert("Deleted Successfully");
        getRating();
      }, 1000);

      console.log("Users deleted successfully.");
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const deleteCustomer = (orderId: any) => {
    console.log("orderId", orderId);

    setSelectedOrderId(orderId);
    setIsDeleteAlert(true);
  };
  return (
    <div className="modalOverlay" id="modalOverlay">
      <div className="modalInner pb-5">
        <div className="modalHeader d-flex align-items-center justify-content-between px-3 py-2 w-100">
          <h1 className="rating">{t("Rating")}</h1>
          <img src={Cross} alt="Cross Icon" onClick={onClose} />
        </div>
        <div className="modalINner2 pt-2">
          {isLoading ? (
            <div className="spinner2">
              {" "}
              <SpinnerCircular color="rgba(14, 154, 161, 1)" size={40} />
            </div>
          ) : isNoData ? (
            <h3>{t("NoData")}</h3>
          ) : (
            ratingList?.map((rating: any) => {
              return (
                <div className=" mb-3 px-2">
                  <div className="px-3 ratingCard">
                    <div className="d-flex">
                      <div className="col-10">
                        <div className="pb-2 d-flex align-items-start flex-direction-column">
                          {rating?.text}
                        </div>
                        <div className="pb-2 d-flex align-items-start flex-direction-column">
                          <StarRatings
                            rating={rating?.rate}
                            starRatedColor="yellow"
                            // changeRating={this.changeRating}
                            numberOfStars={5}
                            name="rating"
                            starDimension={"20px"}
                            starSpacing={"2px"}
                          />
                        </div>
                      </div>
                      <div className="col-2 d-flex justify-content-center align-items-center">
                        <img
                          src={DeleteIcon}
                          alt=""
                          width={20}
                          height={20}
                          onClick={() => deleteCustomer(rating.orderId)}
                          // className="col-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {isDeleteAlert && (
        <DeleteAlert
          onClose={() => setIsDeleteAlert(false)}
          onDelete={() => {
            onDeleteConfirm(selectedOrderId);
          }}
        />
      )}
    </div>
  );
}

export default CustomerDetailsModal;
