import firebase from "firebase";
import "firebase/auth";
import React, { useState, useEffect } from "react";
import { getData, getDocs } from "./database/firebase";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/login/login.js";
import Main from "./component/main/Main";
import MyPage from "./component/myPage/myPage";
import Sign from "./component/signUp/signUp.js";
import ApplyTeam from "./component/team/applyTeam";
import CreateTeam from "./component/team/createTeam";
import Header from "./Header";
import Reserve from "./component/reservation/reserve";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태
  const [init, setInit] = useState(false)     //인증 응답 상태
  const [userInfo, setUserInfo] =useState();  //유저 정보
  const [teamList, setTeamList] = useState([]); //팀 리스트
  useEffect( () =>{
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userPromise = getData("userList",user.uid,"string");
      const teamPromise = getDocs("teamList");
      setIsLoggedIn(true);
      userPromise.then( (doc) =>{ //유저 정보 가져오기
          setUserInfo(doc);
          console.log("유저 정보 세팅 완료");
      })
      teamPromise.then( (docs) =>{
          console.log(docs);
          const teamNames = docs.map((doc) =>{ //docs 순회하며 name값 추출
            return doc = doc.id;
          })
          //console.log(teamNames);
          setTeamList(teamNames);
          console.log("팀 리스트 세팅 완료");
      })
    } else {
      setIsLoggedIn(false);
    }
    setInit(true);
})}, [])
  return (
    init? // 인증상태가 확정 될 시 렌더링 시작    ,정보가 필요한 컴포넌트는 정보가 불러와지면 렌더링
    <div className="App"> 
      <Header isLoggedIn={isLoggedIn}/>  
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signUp" element={<Sign/>} />
        <Route path="/" element={userInfo&&<Main userInfo={userInfo} />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/my-page" element={userInfo&&<MyPage userInfo={userInfo}/> } />
        <Route path="/apply-team" element={userInfo&&teamList&&<ApplyTeam teamList={teamList} userInfo={userInfo}/>} />
        <Route path="/create-team" element={userInfo&&<CreateTeam userInfo={userInfo} />} />
      </Routes>
    </div>
    :"Initializing..."
  );
}

export default App;