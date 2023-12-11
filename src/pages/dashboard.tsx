import { useContext, useEffect, useLayoutEffect, useState } from "react";
import image from "../assets/searchicon2.png";
// import CustomerDetailsModal from "../components/CustomerDetailsModal";
import i18n, { t } from "i18next";
import LanguageContext from "../libs/ContextHook";
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  writeBatch,
  Firestore,
  startAt,
  endAt,
  orderBy,
  limit,
  getCountFromServer,
} from "firebase/firestore";
import firebase, { auth } from "../connection/firebase";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import Button from "../components/Button/Button";
import CustomerDetailsModal from "../components/CustomerDetailsModal";
import EyeIcon from "../assets/eyeIcon.png";
import EditIcon from "../assets/editIcon.png";
import DeleteIcon2 from "../assets/deleteIcon2.png";
import StarIcon from "../assets/starIcon.png";
import DeleteAlert from "../components/DeleteAlert";
import App from "../App";
import { User, deleteUser } from "firebase/auth";
import DownArrow from "../assets/downArrow.png";
import UserIcon from "../assets/userIcon.png";
import BookingIcon from "../assets/bookingIcon.png";
import HomeIcon from "../assets/homeIcon.png";
import { getRequest, postRequest } from "../libs/ApiHelper";

function Analytics() {
  const navigate = useNavigate();
  const [isEditCustomerDetail, setIsEditCustomerDetail] = useState(false);
  const [isDeleteCustomerDetail, setIsDeleteCustomerDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedClient, setselectedClient] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [selectedUid, setIsSelectedUid] = useState();
  const [pagination, setPagination] = useState(30);
  const [totalCount, setTotalCount] = useState(0);
  const [isNoDataFound, setIsNoDataFound] = useState(false);
  const [foundUsers, setFoundUsers] = useState();
  const [phone, setPhone] = useState("");
  const [data, setData] = useState<any>([]);

  const { dispatch } = useContext(LanguageContext);

  const getData = () => {
    getRequest(
      "api/usersAdmin/getAllUsersData",
      JSON.parse(localStorage.getItem("user") ?? "").token
    ).then((res) => {
      if (res ==
        `SyntaxError: Unexpected token 'I', "Invalid Token" is not valid JSON`) {
        localStorage.clear()
          navigate("/");
      } else {
        setData(res);
      }
      console.log("res", res);
    }).catch((error) => {
      console.log("error", error);
    })
  };

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    }else getData();
  }, [pagination]);

  const getTitle = (res: any) => {
    if (res[0].Total_UserBooking !== undefined) {
      return "Total booking";
    } else if (res[0].Total_Rooms !== undefined) {
      return "Total rooms";
    } else if (res[0].Today_UserBooking !== undefined) {
      return "Today Bookings";
    } else if (res[0].Total_Users !== undefined) {
      return "Total users";
    }
  };

  return (
    // <div className="d-flex flex-direction-row justify-content-evenly mb-3">
    <div className="d-flex flex-direction-row justify-content-evenly w-80 flex-wrap  vh-100 dashboardContainer">
      {data.length > 0 && data?.map((res: any, index: number) => {
        return (
          <div className="d-flex col-5 col-sm-6 col-md-8 col-lg-6 justify-content-center align-items-center p-2">
            {index !== 4 ? (
              <div className="firstBox d-flex justify-content-center align-items-center ">
                <img src={UserIcon} alt="" className="mb-3" />
                <h4 className="mb-2 mt-2">{getTitle(res)}</h4>
                <h3>
                  {res[0]?.Total_UserBooking ??
                    res[0]?.Total_Rooms ??
                    res[0]?.Total_Users ??
                    res[0]?.Today_UserBooking}
                </h3>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
    // </div>
  );
}
export default Analytics;
