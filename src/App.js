import React from "react"
import "./App.css"
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./component/login.js"
import Sign from "./component/signUp.js"
import Main from "./component/main/main"
import Reserve from "./reservation/reserve";
import MyPage from "./component/myPage";
import firebase from "firebase";
import "firebase/auth"
import CreateTeam from "./component/team/createTeam";
import ApplyTeam from "./component/team/applyTeam";
import {getData} from "./database/firebase.js"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태
  const [init, setInit] = useState(false)     //인증 응답 상태
  const [userInfo, setUserInfo] =useState();  //
  useEffect( () =>{
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userPromise = getData("userList",user.uid,"string");
      setIsLoggedIn(true);
      userPromise.then( (doc) =>{ //유저 정보 가져오기
        setUserInfo(doc);
        console.log("유저 정보 세팅 완료");
      })
      
    } else {
      setIsLoggedIn(false);
    }
    setInit(true);
})}, [])
  return (
    <div className="App">
    {init&&userInfo? 
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signUp" element={<Sign/>} />
      <Route path="/" element={<Main userInfo={userInfo} />} />
      <Route path="/reserve" element={isLoggedIn?<Reserve /> : <Login/>} />
      <Route path="/mypage" element={isLoggedIn?<MyPage userInfo={userInfo} /> : <Login/>} />
      <Route path="/applyTeam" element={isLoggedIn?<ApplyTeam/> : <Login/>} />
      <Route path="/createTeam" element={isLoggedIn?<CreateTeam userInfo={userInfo} /> : <Login/>} />
    </Routes>
    : "Initializing..."
    }
    </div>
  );
}

export default App;