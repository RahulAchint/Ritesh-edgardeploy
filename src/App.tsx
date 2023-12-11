import React, { useReducer, useState } from "react";
import "./App.css";
// import "./style/Public.css";
import "./style/CleanaPublic.css";
import "./components/Layout/Layout.css";
import "./components/Sidebar/Sidebar.css";
import "./components/CustomerDetailsModal.css";
import "./components/DeleteAlert.css";
import Layout from "./components/Layout/Layout";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import he from "./translations/he.json";
import LanguageContext from "./libs/ContextHook";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en,
      he,
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

function App() {
  const [direction, setDirection] = useState("ltr");
  const AlertReducer = (item: any, action: any) => {
    setDirection(action.dir);
    // setAlertMessage(action.message);
    // setIsAlert(true);
    return item;
  };
  const [reducer, dispatch] = useReducer(AlertReducer, {});

  // EventEmitter.getEventListeners('','')
  return (
    <LanguageContext.Provider value={{ reducer, dispatch }}>
      <div dir={direction} className="App">
        <Layout />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
