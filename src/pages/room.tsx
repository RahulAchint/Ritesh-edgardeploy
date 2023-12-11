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
  getDocs,
  query,
  where,
  getFirestore,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  writeBatch,
  limit,
  getCountFromServer,
} from "firebase/firestore";
import firebase from "../connection/firebase";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import Button from "../components/Button/Button";
import DownArrow from "../assets/downArrow.png";
import EyeIcon from "../assets/eyeIcon.png";
import EditIcon from "../assets/editIcon.png";
import DeleteIcon2 from "../assets/deleteIcon2.png";
import DatePicker from "react-datepicker";
import { deleteRequest, getRequest, postRequest } from "../libs/ApiHelper";
import DeleteAlert from "../components/DeleteAlert";
import moment from "moment";

function Room() {
  const navigate = useNavigate();
  const [isEditCustomerDetail, setIsEditCustomerDetail] = useState(false);
  const [isDeleteCustomerDetail, setIsDeleteCustomerDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [rooms, setRooms] = useState([]);
  const [pagination, setPagination] = useState(10);
  const [totalCount, setTotalCount] = useState(100);
  // const [searchRoom, setSearchRoom] = useState();
  const [status, setStatus] = useState("");
  const [isCreateRoomModal, setIsCreateRoomModal] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [selectedUid, setIsSelectedUid] = useState();
  const [id, setId] = useState(-1);

  const Rooms = (text?: string) => {
    console.log("date", date);
    const body = {
      startIndex: "1",
      endIndex: text ? 10 : pagination,
      searchQuery: text?.length
        ? text
        : date.length !== 0
          ? moment(date).format("YYYY-MM-DD")
          : status,
    };

    postRequest(
      body,
      "api/roomAdmin/getRooms",
      JSON.parse(localStorage.getItem("user") ?? "").token
    ).then((user: any) => {
      if (
        user ==
        `SyntaxError: Unexpected token 'I', "Invalid Token" is not valid JSON`
      ) {
        localStorage.clear();
        navigate("/");
      } else {
        console.log("room", user[0]);
        if (user?.length > 0) setRooms(user[0]);
        setTotalCount(user[1][0]?.Total_Rooms);
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
      Rooms();
    }
  }, [pagination, date]);

  const deleteAlert = (id: any) => {
    setId(id);
    setIsDeleteAlert(true);
  };

  const deleteRoom = () => {
    const body = {
      id,
    };
    deleteRequest(
      "api/roomAdmin/deleteRoomById",
      body,
      JSON.parse(localStorage.getItem("user") ?? "").token
    ).then((user: any) => {
      setIsDeleteAlert(false);
      Rooms();
    });
  };

  const filter = (event: any) => {
    setIsLoading(true);
    setStatus(event?.target.value);
    Rooms(event?.target.value);
    setPagination(10);
  };

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
      <div className="roomSearchView ">
        <div className="position-relative  align-items-center roomSearchInput">
          <input
            type="search"
            value={status}
            onChange={filter}
            placeholder="Search by Invite Code"
          />
          {status.length === 0 && (
            <img
              alt=""
              src={image}
              className={`searchicon ${i18n.language === "he" ? "searchIconRtl" : ""
                }`}
            />
          )}
        </div>
        {/* <div className="d-flex align-items center justify-content-center"> */}
        <DatePicker />
        {/* </div> */}
        <div className="d-flex align-items-center createRoomButton">
          <Button
            shape="round"
            text="Create a Room"
            color={"#FE6969 "}
            onButtonClick={() => {
              navigate("/createGroupRoom");
            }}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="spinner">
          {" "}
          <SpinnerCircular color="rgba(14, 154, 161, 1)" />
        </div>
      ) : (
        <>
        <div className="col-md-12" style={{ overflow: "auto" }}>
          <table className="table">
            <thead className="tableHeading">
              <tr className="details">
                <th className="col-1">{t("S.No.")}</th>
                {/* <th className="col-1">{t("Id")}</th> */}
                <th className="col-2">{t("Start Date")}</th>
                <th className="col-3">{t("Subject")}</th>
                {/* <th className="col-1">{t("Grade id")}</th>
                <th className="col-1">{t("Grade")}</th> */}
                <th className="col-2">{t("Invite Code")}</th>
                <th className="col-2">{t("Session Time")}</th>
                <th className="col-2">{t("Action")}</th>

                {/* <th className="col-1">{t("Create group")}</th>
                <th className="col-1">{t("Language")}</th>
                <th className="col-1">{t("Region session")}</th> */}
                {/* <th className="col-1">{t("View")}</th> */}
              </tr>
            </thead>
            {rooms?.map((room: any) => {
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
              return (
                <tbody className="tableBody">
                  <tr>
                    <th className="col-1">{room?.rownumber}</th>
                    {/* <th className="col-1">{room?.id}</th> */}
                    <th className="col-2">
                      {room ? formatDate(room?.startdate) : "N/A"}
                    </th>
                    <th className="col-3">
                      {room?.subject.charAt(0).toUpperCase() +
                        room?.subject.slice(1)}
                    </th>
                    {/* <th className="col-1">{room?.gradeId}</th>
                    <th className="col-1">{room?.grade}</th> */}
                    <th className="col-2">{room?.invitecode}</th>
                    <th className="col-2">{room?.sessiontime}</th>
                    {/* <th className="col-1">{room?.creategrouproom}</th>
                    <th className="col-1">{room?.language}</th>
                    <th className="col-1">{room?.region_session_time}</th> */}
                    <th className="col-2">
                      {" "}
                      <img
                        className="imgIcon"
                        src={EyeIcon}
                        width={20}
                        height={20}
                        onClick={() => {
                          navigate("/roomDetail");
                        }}
                        alt=""
                      />
                      {/* <img
                        className="imgIcon"
                        src={EditIcon}
                        width={20}
                        height={20}
                        onClick={() => {
                          navigate("/editRoomDetail", {
                            state: { roomDetail: room },
                          });
                        }}
                        alt=""
                      /> */}
                      <img
                        className="imgIcon"
                        src={DeleteIcon2}
                        width={20}
                        height={20}
                        alt=""
                        onClick={() => deleteAlert(room?.id)}
                      />
                    </th>
                  </tr>
                </tbody>
              );
            })}
          </table>
          
        </div>
        {totalCount > pagination && (
        <p
          className="loadMoreView"
          onClick={() => setPagination(pagination + 10)}
        >
          Load More
        </p>
      )}
        </>
      )}
      
      {isDeleteAlert && (
        <DeleteAlert
          onClose={() => setIsDeleteAlert(false)}
          onDelete={() => {
            deleteRoom();
          }}
        />
      )}
    </div>
  );
}
export default Room;
