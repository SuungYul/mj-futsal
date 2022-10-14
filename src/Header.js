/* eslint-disable react-hooks/exhaustive-deps */
import firebase from "firebase";
import "firebase/auth";
import React, { useEffect, useState } from "react";
import "./App.css";
import LoginBtn from "./component/main/loginBtn";
import Logout from "./component/main/logout";
import MyPageBtn from "./component/myPageBtn";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }), [])
  return (
    <>
    {
      isLoggedIn ? <><Logout /><MyPageBtn /></> : <LoginBtn />
    }
    </>
  );
}

export default Header;