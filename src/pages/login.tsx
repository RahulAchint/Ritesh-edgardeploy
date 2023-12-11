import React, { useEffect, useState } from "react";
import Icon from "../assets/backButton.png";
import image from "../assets/edgarLogo.png";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../libs/ApiServices";
import { useTranslation } from "react-i18next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../connection/firebase";
function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { t } = useTranslation();

  const onLogin = () => {
    if (email === '' || password === '') {
      alert(`UserName or Password can't be empty`)
    }
    else apiLogin(email, password).then((response) => {
      console.log("response", response);
      if (response == 'TypeError: Failed to fetch') {
        alert('Please enter valid UserName and Password')
      }
      if (response && response.id) {
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/dashboard");
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="Container-fluid loginContainer">
      <div className="d-flex align-items-center justify-content-center loginCardView">
        <div className="loginCard pb-5">
          <img src={image} alt="" width={40} height={40} />
          <h1 className="heading mb-5">{t("Login")}</h1>
          <div className="contact">
            <p>{t("UserName")}</p>
            <input
              type="email"
              className="mb-4  inputStyle"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("EnterUserName") ?? "Enter UserName"}
            ></input>
          </div>

          <div className="contact">
            <p>{t("Password")}</p>

            <input
              type="password"
              className="mb-5  inputStyle"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("Password") ?? "Enter password"}
            ></input>
          </div>
          <div className="loginButton">
            <Button
              text={t("Login")}
              onButtonClick={() => {
                onLogin();
              }}
              color={"rgb(254, 105, 105)"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
