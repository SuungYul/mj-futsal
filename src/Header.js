/* eslint-disable react-hooks/exhaustive-deps */
import firebase from "firebase";
import "firebase/auth";
import React, { useEffect, useState } from "react";
import "./App.css";
import LoginBtn from "./component/button/loginBtn";
import Logout from "./component/login/logout";
import MyPageBtn from "./component/button/myPageBtn";
import ToMainBtn from "./component/main/ToMainBtn";
function Header(prop) {
  return (
    <div id="head_div"> <ToMainBtn/>
    {
      prop.isLoggedIn ? <><Logout /><MyPageBtn /></> : <LoginBtn />
    }
    </div>
  );
}

export default Header;