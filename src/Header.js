/* eslint-disable react-hooks/exhaustive-deps */
import firebase from "firebase";
import "firebase/auth";
import React, { useEffect, useState } from "react";
import "./App.css";
import LoginBtn from "./component/main/loginBtn";
import Logout from "./component/main/logout";
import ToMainBtn from "./component/main/ToMainBtn";
import MyPageBtn from "./component/myPageBtn";

function Header(isLoggedIn) {
  return (
    <div id="head_div"> <ToMainBtn/>
    {
      isLoggedIn ? <><Logout /><MyPageBtn /></> : <LoginBtn />
    }
    </div>
  );
}

export default Header;