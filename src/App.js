import React, { useState, useEffect, useRef } from "react";
import { useIdentityContext } from "react-netlify-identity";

import { ToastContext } from "./Context";

import Defaults from "./Defaults";
import Auth from "./Auth";
import PostAuth from "./PostAuth";
import NewPostAuth from "./NewPostAuth";
import Toast from "./components/Toast";

const App = () => {
  const { user } = useIdentityContext();
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    triggered: false,
    message: "",
    persistent: false,
    otherFuncs: []
  });

  const timeoutRef = useRef(null);
  useEffect(() => {
    setToastDisplayed(false);
    clearTimeout(timeoutRef.current);
    if (toastInfo.triggered) {
      requestAnimationFrame(() => {
        setToastDisplayed(true);
      });

      if (!toastInfo.persistent) {
        timeoutRef.current = setTimeout(() => {
          setToastInfo({ ...toastInfo, triggered: false });
        }, 4000);
      }
    }
  }, [toastInfo]);

  return (
    <>
      <Defaults />
      <ToastContext.Provider value={setToastInfo}>
        {user ? <NewPostAuth /> : <Auth />}
        {/* <PostAuth /> */}
      </ToastContext.Provider>
      <Toast
        toastDisplayed={toastDisplayed}
        message={toastInfo.message}
        otherFuncs={toastInfo.otherFuncs}
        dismissFunc={() => {
          setToastInfo({ ...toastInfo, triggered: false });
        }}
      />
    </>
  );
};

export default App;
