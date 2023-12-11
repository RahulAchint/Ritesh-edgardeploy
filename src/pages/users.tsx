import { useContext, useEffect, useLayoutEffect, useState } from "react";
import image from "../assets/searchicon2.png";
// import CustomerDetailsModal from "../components/CustomerDetailsModal";
import i18n, { t } from "i18next";
import LanguageContext from "../libs/ContextHook";
import { useLocation, useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import EyeIcon from "../assets/eyeIcon.png";
import EditIcon from "../assets/editIcon.png";
import DeleteIcon2 from "../assets/deleteIcon2.png";
import { deleteRequest, getRequest, postRequest } from "../libs/ApiHelper";
import DeleteAlert from "../components/DeleteAlert";

function Users() {
  const [isEditWorkerDetail, setIsEditWorkerDetail] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [userList, setUserList] = useState([]);
  const { dispatch } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState();
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [selectedUid, setIsSelectedUid] = useState();
  const [pagination, setPagination] = useState(10);
  const [totalCount, setTotalCount] = useState(100);
  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState();
  const [status, setStatus] = useState();
  const [filteredResult, setFilteredResult] = useState([]);
  const [id, setId] = useState(-1);
  const setUsersData = (text?: string) => {
    const body = {
      startIndex: "1",
      endIndex: text ? 10 : pagination,
      searchAlphabet: text ?? name ?? "",
    };
    postRequest(
      body,
      "api/usersAdmin/getUsersDetails",
      JSON.parse(localStorage.getItem("user") ?? "").token
    ).then((user) => {
      if (
        user ==
        `SyntaxError: Unexpected token 'I', "Invalid Token" is not valid JSON`
      ) {
        localStorage.clear();
        navigate("/");
      } else {
        console.log("user", user);
        if (user[0]?.length > 0) {
          setUserList(user[0]);
          setFilteredResult(user[0]);
          setTotalCount(user[1][0]?.Total_User);
        }
        setIsLoading(false);
      }
    });
  };
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    } else {
      setUsersData();
    }
  }, [pagination]);

  // const handleSearch = (event:any) => {
  //   setName(event.target.value)
  // }

  const filter = (event: any) => {
    setName(event.target.value);
    setPagination(10);
    setUsersData(event.target.value);
    // if (event.target.value.length > 0) {
    //   const body = {
    //     startIndex: "1",
    //     endIndex: "20",
    //     firstname: event.target.value,
    //   };
    //   postRequest(
    //     body,
    //     "api/usersAdmin/getUsersSearch",
    //     JSON.parse(localStorage.getItem("user") ?? "").token
    //   ).then((user) => {
    //     console.log("user", user);
    //     if (user?.length > 0) {
    //       setFilteredResult(user);

    //     } else {
    //       setFilteredResult(userList);
    //     }
    //   });
    // } else {
    //   setFilteredResult(userList);
    // }
  };
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    } else {
      setFilteredResult(userList);
    }
  }, []);

  const deleteAlert = (id: any) => {
    setId(id);
    setIsDeleteAlert(true);
  };

  const deleteData = () => {
    const body = {
      id,
    };
    deleteRequest(
      "api/usersAdmin/DeleteUserById",
      body,
      JSON.parse(localStorage.getItem("user") ?? "").token
    ).then((user: any) => {
      console.log("user", user);
      setIsDeleteAlert(false);
      setUsersData();
    });
  };

  return (
    <div className="mb-5 overFlow p-4">
      <div className="searchView ">
        <div className="position-relative">
          <input
            type="search"
            className="inputBox"
            value={name}
            onChange={filter}
            placeholder="Search here by Email"
          />
          {name.length === 0 && (
            <img
              alt=""
              src={image}
              className={`searchIcon ${
                i18n.language === "he" ? "searchIconRtl" : ""
              }`}
            />
          )}
        </div>
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
                <th className="col-1">{t("S.No.")}</th>
                {/* <th className="col-1">{t("Id")}</th> */}

                <th className="col-2">{t("Image")}</th>
                <th className="col-4">{t("Email Id")}</th>
                <th className="col-2">{t("Grade")}</th>
                <th className="col-2">{t("Language")}</th>
                {/* <th className="col-1">{t("Grade")}</th>
                <th className="col-1">{t("Gender")}</th>
                <th className="col-1">{t("Language")}</th> */}
                <th className="col-1">{t("Action")}</th>
              </tr>
            </thead>
            {filteredResult &&
              filteredResult.length > 0 &&
              filteredResult.map((user: any) => {
                return (
                  <tbody className="tableBody">
                    <tr>
                      <th className="col-1 serialNoView">{user?.rownumber}</th>
                      {/* <th className="col-1 serialNoView">{user?.id}</th> */}
                      <th className="col-2 profilePictureView">
                        <img
                          src={user?.picture}
                          alt=""
                          className="profilePicture"
                        />
                      </th>
                      <th className="col-4">{user?.emailId}</th>
                      <th className="col-2">{user?.grade}</th>
                      <th className="col-2">{user?.language}</th>
                      {/* <th className="col-1">{user?.grade}</th>
                      <th className="col-1">{user?.gender}</th>
                      <th className="col-1">{user?.language}</th> */}
                      {/* <th className="col-2">{user?.picture}</th> */}
                      <th className="col-1">
                        <img
                          className="imgIcon"
                          src={EyeIcon}
                          width={20}
                          height={20}
                          onClick={() => {
                            navigate("/userDetail", {
                              state: { user: user },
                            });
                          }}
                          alt=""
                        />
                        {/* <img
                          className="imgIcon"
                          src={EditIcon}
                          width={20}
                          height={20}
                          onClick={() => {
                            navigate("/editUserDetail", {
                              state: { user: user },
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
                          onClick={() => deleteAlert(user?.id)}
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
            deleteData();
          }}
        />
      )}
    </div>
  );
}

export default Users;
