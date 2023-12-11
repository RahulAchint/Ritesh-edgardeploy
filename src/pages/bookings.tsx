import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import image from "../assets/searchicon2.png";
// import CustomerDetailsModal from "../components/CustomerDetailsModal";
import i18n, { t } from "i18next";
import LanguageContext from "../libs/ContextHook";
import {
  collection,
  deleteDoc,
  getCountFromServer,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import firebase from "../connection/firebase";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import EyeIcon from "../assets/eyeIcon.png";
import EditIcon from "../assets/editIcon.png";
import DeleteIcon2 from "../assets/deleteIcon2.png";
import DeleteAlert from "../components/DeleteAlert";
import CustomerDetailsModal from "../components/CustomerDetailsModal";
import StarIcon from "../assets/starIcon.png";
import DownArrow from "../assets/downArrow.png";
import BookingDetailsModal from "../components/BookingDetailsModal";
import { deleteRequest, getRequest, postRequest } from "../libs/ApiHelper";
import moment from "moment";

function Bookings() {
  const [isEditWorkerDetail, setIsEditWorkerDetail] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [customerList, setCustomerList] = useState([]);
  const { dispatch } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState();
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [selectedUid, setIsSelectedUid] = useState();
  const [pagination, setPagination] = useState(10);
  const [totalCount, setTotalCount] = useState(100);
  const [foundWorker, setFoundWorker] = useState(customerList);
  const [phone, setSearch] = useState("");
  const [isBookingModal, setIsBookingModal] = useState(false);
  const [booking, setBooking] = useState([]);
  const [id, setId] = useState(-1);

  const getBookings = (text?: string) => {
    const body = {
      startIndex: "1",
      endIndex: text ? 10 : pagination,
      searchQuery: text?.length ? text : date.length !== 0 ? date : phone,
    };
    // searchQuery: phone ?? date
    // };

    postRequest(
      body,
      "api/bookingsAdmin/getBookings",
      JSON.parse(localStorage.getItem("user") ?? "").token
    ).then((res: any) => {
      if (
        res ==
        `SyntaxError: Unexpected token 'I', "Invalid Token" is not valid JSON`
      ) {
        localStorage.clear();
        navigate("/");
      } else {
        console.log("res", res);
        if (res[0]?.length > 0) setBooking(res[0]);
        setTotalCount(res[1][0]?.Total_UserBooking);
        setIsLoading(false);
      }
    });
  };
  const [date, setDate] = useState("");

  const handleChange = (e: any) => {
    setDate(e.target.value);
  };
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    } else {
      getBookings();
    }
  }, [pagination, date]);

  const deleteAlert = (id: any) => {
    setId(id);
    setIsDeleteAlert(true);
  };

  const deleteBooking = () => {
    const body = {
      id,
    };
    deleteRequest(
      "api/bookingsAdmin/deleteUserBookingById",
      body,
      JSON.parse(localStorage.getItem("user") ?? "").token
    ).then((user: any) => {
      setIsDeleteAlert(false);
      getBookings();
    });
  };
  const filter = (e: any) => {
    setIsLoading(true);
    setSearch(e.target.value);
    setPagination(10);
    getBookings(e.target.value);
  };

  // useLayoutEffect(() => {
  //   const language = localStorage.getItem("language");
  //   if (language === "en") {
  //     setSelectedLanguage("English");
  //     i18n.changeLanguage("en");
  //     dispatch({ dir: "ltr" });
  //   } else if (language === "he") {
  //     setSelectedLanguage("Hebrew");
  //     i18n.changeLanguage("he");
  //     dispatch({ dir: "rtl" });
  //   } else {
  //     setSelectedLanguage("English");
  //     i18n.changeLanguage("en");
  //     dispatch({ dir: "ltr" });
  //     localStorage.setItem("language", "en");
  //   }
  // });

  // const filter = (e: any) => {
  //   const keyword = e.target.value;

  //   if (keyword !== "") {
  //     (async () => {
  //       try {
  //         const q = query(
  //           collection(firebase, "users"),
  //           where("type", "==", "worker")
  //         );
  //         const querySnapshot = await getDocs(q);
  //         let workerData: any = [];
  //         querySnapshot.forEach((doc) => {
  //           workerData.push(doc.data());
  //         });
  //         const results = workerData.filter((worker: any) => {
  //           return worker?.phone
  //             .toLowerCase()
  //             .startsWith(keyword.toLowerCase());
  //           // Use the toLowerCase() method to make it case-insensitive
  //         });
  //         setFoundWorker(results);
  //       } catch (e) {
  //         setFoundWorker(customerList);
  //         console.error("Error adding document: ", e);
  //       }
  //     })();
  //   } else {
  //     setFoundWorker(customerList);
  //     // If the text field is empty, show all users
  //   }

  //   setPhone(keyword);
  // };

  // const getWorkers = async () => {
  //   try {
  //     const q = query(
  //       collection(firebase, "users"),
  //       where("type", "==", "worker"),
  //       limit(pagination)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     let workerData: any = [];
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //       workerData.push(doc.data());
  //     });
  //     setIsLoading(false);
  //     setCustomerList(workerData);
  //     setFoundWorker(workerData);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  // useEffect(() => {
  //   if (localStorage.getItem("user") === null) {
  //     navigate("/");
  //   }
  //   setIsLoading(true);
  //   (async () => {
  //     try {
  //       const q = query(
  //         collection(firebase, "users"),
  //         where("type", "==", "worker")
  //       );
  //       const snapShot = await getCountFromServer(q);
  //       setTotalCount(snapShot.data().count);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   getWorkers();
  // }, [pagination]);

  // const firestore = getFirestore(app);

  // const onDeleteConfirm = async (uid: any) => {
  //   try {
  //     const usersRef = collection(firebase, "users");
  //     const q = query(usersRef, where("uid", "==", uid));
  //     const querySnapshot = await getDocs(q);

  //     querySnapshot.forEach(async (doc) => {
  //       await deleteDoc(doc.ref);
  //     });
  //     setIsDeleteAlert(false);
  //     setTimeout(() => {
  //       alert("Deleted Successfully");
  //       getWorkers();
  //     }, 1000);

  //     console.log("Users deleted successfully.");
  //   } catch (error) {
  //     console.error("Error deleting users:", error);
  //   }
  // };

  // const deleteWorker = (uid: any) => {
  //   console.log("selectedUid", uid);

  //   setIsSelectedUid(uid);
  //   setIsDeleteAlert(true);
  // };

  const DatePicker = () => {
    return (
      <div className="datePicker datePickerView">
        <input type="date" value={date} onChange={handleChange} />
        <p style={{ display: "none" }}>{date}</p>
      </div>
    );
  };

  return (
    <div className="mb-5 overFlow p-4">
      <div className="searchView">
          <div className="position-relative searchInputView">
            {/* <input
              type="search"
              className="inputBox"
              value={phone}
              onChange={filter}
              placeholder="Search here"
            
            /> */}
            <select className="inputBox" value={phone} onChange={filter}>
              <option value="">Select Booking Status </option>
              <option value="1">Booked</option>
              <option value="2">completed</option>
              <option value="3">Cancelled</option>
              <option value="4">In Room</option>
              <option value="5">In Progress</option>
            </select>

             <div className="dropdown-icon">
      <img
        src={DownArrow}
        width={15}
        height={15}
        className={`downArrow ${i18n.language === "he" ? "downArrow" : ""}`}
        alt=""
      />
    </div>
          </div>
        {/* <div> */}
        <DatePicker />
        {/* </div> */}
      </div>
      {isLoading ? (
        <div className="spinner">
          {" "}
          <SpinnerCircular color="rgba(14, 154, 161, 1)" />
        </div>
      ) : (
        <div className="col-md-12" style={{ overflow: "auto" }}>
          <table className="table">
            <thead className="tableHeading">
              <tr className="details">
                <th className="col-1">{t("S. No.")}</th>
                {/* <th className="col-1">{t("Id")}</th> */}
                <th className="col-2">{t("User Id")}</th>
                {/* <th className="col-1">{t("Room id")}</th> */}
                <th className="col-4">{t("Booking Status")}</th>
                {/* <th className="col-1">{t("Edit")}</th> */}
                {/* <th className="col-1">{t("Session code")}</th> */}
                {/* <th className="col-2">{t("Joining Date")}</th> */}
                <th className="col-3">{t("Booking Date")}</th>
                <th className="col-2">{t("Action")}</th>
              </tr>
            </thead>
            {booking?.map((booking: any) => {
              function formatDate(startdate: any) {
                const date = new Date(startdate);
                const day = date.getDate();
                const month = date.getMonth() + 1; // Month index starts from 0
                const year = date.getFullYear();
                // Format day, month, and year with leading zeros if necessary
                const formattedDay = day < 10 ? "0" + day : day;
                const formattedMonth = month < 10 ? "0" + month : month;
                return `${formattedDay}/${formattedMonth}/${year}`;
              }
              function bookingStatus(bookingstatus: any) {
                const status: number = 0;

                switch (bookingstatus) {
                  case "0":
                    return "Not Booked";
                  case "1":
                    return "Booked";
                  case "2":
                    return "Completed";
                  case "3":
                    return "Cancelled";
                  case "4":
                    return "In Room";
                  case "5":
                    return "In Progress";
                  default:
                    return "Unknown Status";
                }
              }
              return (
                <tbody className="tableBody">
                  <tr>
                    <th className="col-1">{booking?.rownumber}</th>
                    {/* <th className="col-1">{booking?.id}</th> */}
                    <th className="col-2">{booking?.userId}</th>
                    {/* <th className="col-1">{booking?.roomId}</th> */}
                    <th className="col-4">
                      {booking ? bookingStatus(booking?.bookingstatus) : "NA"}
                    </th>
                    {/* <th className="col-1">{booking?.session_code}</th> */}
                    {/* <th className="col-2">
                      {booking ? formatDate(booking?.joining_date_time) : "NA"}
                    </th> */}
                    <th className="col-3">
                      {booking ? formatDate(booking?.bookingdatetime) : "NA"}
                    </th>
                    <th className="col-2">
                      <img
                        className="imgIcon"
                        src={EyeIcon}
                        width={20}
                        height={20}
                        onClick={() => {
                          navigate("/bookingDetail", {
                            state: { bookingDetail: booking },
                          });
                        }}
                        alt=""
                      />
                      <img
                        className="imgIcon"
                        src={DeleteIcon2}
                        width={20}
                        height={20}
                        alt=""
                        onClick={() => deleteAlert(booking?.id)}
                      />
                    </th>
                    {/* <th className="col-1">
                     
                    </th> */}
                  </tr>
                </tbody>
              );
            })}
          </table>
          {totalCount > pagination && (
            <p
              className="loadMoreView"
              onClick={() => setPagination(pagination + 10)}
            >
              Load More{" "}
            </p>
          )}
        </div>
      )}
      {isDeleteAlert && (
        <DeleteAlert
          onClose={() => setIsDeleteAlert(false)}
          onDelete={() => {
            deleteBooking();
          }}
        />
      )}
      {/* {isBookingModal && (
        <BookingDetailsModal
          onClose={() => setIsBookingModal(false)}
          data={selectedWorker}
        />
      )} */}
    </div>
  );
}
export default Bookings;
