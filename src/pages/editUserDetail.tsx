import React, { useEffect, useState } from "react";
import UserIcon from "../assets/userIcon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { patchRequest, postRequest } from "../libs/ApiHelper";
import Button from "../components/Button/Button";
import { MenuItem } from "react-pro-sidebar";
import image from '../assets/downArrow.png'

const gradeData = [
    
  {
    value: 7,
    placeholder: "7th grade",
    
    
  },
  {
    value: 8,
    placeholder: "8th grade",
  },
  {
    value: 9,
    placeholder: "9th grade",
  },
  {
    value: 10,
    placeholder: "First Year of High School",
    id :4,
  },
  {
    value: 11,
    placeholder: "Second Year of High School",
  },
  {
    value: 12,
    placeholder: "Last Year of High School",
  },
];
const languageData = [
  {
    value: 1,
    placeholder: "Svenska",
  },
  {
    value: 2,
    placeholder: "English",
  },
  {
    value: 3,
    placeholder: "عربي",
  },
  {
    value: 4,
    placeholder: "Deutsch",
  },
  {
    value: 5,
    placeholder: "Español",
  },
  {
    value: 6,
    placeholder: "中文",
  },
];
function UserDetail() {
  const { state } = useLocation();
  const [user, setUser] = useState<any>();
  const [id, setId] = useState(state?.user?.id);
  const [email, setEmail] = useState(state?.user?.emailId);
  const [gender, setGender] = useState(state?.user?.gender);
  const [grade, setGrade] = useState(state?.user?.grade);
  const [language, setLanguage] = useState(state?.user?.language);
  const [firstname, setFirstName] = useState(state?.user?.firstname);
  const [lastname, setLastName] = useState(state?.user?.lastname);
  const[selectedLanguage,setSelectedLanguage]=useState(languageData.find(item => item.placeholder === state?.user?.language)?.value);
  const [selectedGrade, setSelectedGrade] = useState(gradeData.find(item => item.placeholder === state?.user?.grade)?.value);
  const handleGradeChange = (event: any) => {
    console.log(event.target.value, grade)
    setSelectedGrade(event.target.value);
    setGrade(gradeData.find(item => item.value == event.target.value)?.placeholder)
  };

  const handleLanguageChange = (event: any) => {
    setSelectedLanguage(event.target.value)
    setLanguage(languageData.find(item => item.value == event.target.value)?.placeholder)
  };
  



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
  console.log("stat", state.user);

  const UpdateUserDetail = () => {
    console.log('grade', grade, selectedGrade)
    // setGrade({ placeholder: user?.grade, value: user?.grade });
    const body = {
      emailId: email,
      id: id,
      firstname: firstname,
      lastname: lastname,
      grade: grade,
      gradeId: Number(selectedGrade),
      gender: gender,
      language: language,
      languagecode:(selectedLanguage)
    };
    patchRequest(
      "api/usersAdmin/updateUserById",
      body,
      JSON.parse(localStorage.getItem("user") ?? "").token
    )
      .then((user) => {
        alert("Updated successfully");
        console.log("udpdated data", user);
        navigate(-1);
        if (user?.res?.length > 0) setUser(user.res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="centerSection d-flex  flex-column mt-3">
        <div className="mb-4 py-3 userHeading">
          {/* <img src={UserIcon} alt="" width={35} height={35} /> */}
          <h3>User Details</h3>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-4 d-flex justify-content-center profileDetailInput">
            <img src={user?.picture} alt="" className="userImg" />
          </div>
          {/* <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Id : </label>
            <input
              type="text"
              placeholder={user?.id}
              onChange={(event) => setId(event.target.value)}
              value={id}
              disabled={true}
            />
          </div> */}
           <div className="mb-4 d-flex justify-content-around profileDetailInput">
          <label>User Id : </label>
          <label>{ state?.user?.userId}</label>
        </div>
        <div className="mb-4 d-flex justify-content-around profileDetailInput">
          <label>Grade Id : </label>
          <label>{ state?.user?.gradeId}</label>
        </div>
        <div className="mb-4 d-flex justify-content-around profileDetailInput">
          <label>Row Number : </label>
          <label>{ state?.user?.rownumber}</label>
        </div>
     <div className="mb-4 d-flex justify-content-around profileDetailInput">
          <label>Language : </label>
          <label>{ state?.user?.language}</label>
        </div>
       
        
       
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Gmail : </label>
            <label>{ state?.user?.emailId}</label>
            {/* <input
              type="text"
              placeholder={user?.emailId}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              disabled={true}
            /> */}
          </div>
          {/* <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Google Id : </label>
            <input
              type="text"
              placeholder={user?.googleId}
              onChange={(event) => setGoogleId(event.target.value)}
              value={googleId}
              disabled={true}
            />
          </div> */}
          {/* <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>First Name : </label>
            <input
              type="text"
              placeholder={user?.firstname}
              onChange={(event) => setFirstName(event.target.value)}
              value={firstname}
              disabled={true}
            />
          </div>
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Last Name : </label>
            <input
              type="text"
              placeholder={user?.lastname}
              onChange={(event) => setLastName(event.target.value)}
              value={lastname}
            />
          </div> */}
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Gender : </label>
            <input
              type="text"
              placeholder={user?.gender}
              onChange={(event) => setGender(event.target.value)}
              value={gender}
              disabled
            />
          </div>
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Grade : </label>
            <select className="gradeDropdown" value={selectedGrade} onChange={handleGradeChange}>
              {gradeData.map((item) => (
                <option
                  value={item.value}
                  key={item.placeholder}
                >
                  {item.placeholder}
                </option>
              ))}

            </select>

            <img
              src={image}
              width={20}
              height={20}

              className="arrow"
              alt=""
            />
            {/* <input
              type="text"
              placeholder={user?.grade}
              onChange={(event) => setGrade(event.target.value)}
              value={grade}
            /> */}
          </div>

          {/* <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label>Language : </label>
            <input
              type="text"
              placeholder={user?.language}
              onChange={(event) => setLanguage(event.target.value)}
              value={language}
            />
          </div> */}
          <div className="mb-4 d-flex justify-content-around profileDetailInput">
            <label> Language: </label>
            <select className="gradeDropdown" value={selectedLanguage}  onChange={handleLanguageChange}>
              {languageData.map((item) => (
                <option
                  value={item.value}
                  key={item.placeholder}
                 
                >
                  {item.placeholder}
                </option>
              ))}
            </select>
            <img
              src={image}
              width={20}
              height={20}

              className="arrow"
              alt=""
            />
            {/* <input
              type="text"
              placeholder={user?.grade}
              onChange={(event) => setGrade(event.target.value)}
              value={grade}
            /> */}
          </div>
          <div className="pb-4 updateButton">
            <Button
              text={"Update"}
              color={"rgb(254, 105, 105)"}
              onButtonClick={UpdateUserDetail}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
