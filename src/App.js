import firebase from "firebase";
import "firebase/auth";
import React, { useState, useEffect } from "react";
import { getData, getDocs } from "./database/firebase";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/login/login.js";
import Main from "./component/main/main.js";
import MyPage from "./component/myPage/myPage";
import Sign from "./component/signUp/signUp.js";
import ApplyTeam from "./component/team/applyTeam";
import CreateTeam from "./component/team/createTeam";
import Header from "./Header";
import Reserve from "./component/reservation/reserve";
import ManageTeam from "./component/team/manageTeam";
import MyReserve from "./component/main/MyReserve";
import { confirmMatch } from "./component/match/matchConfirm";
import Review from "./component/myPage/review";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태
  const [init, setInit] = useState(false)     //인증 응답 상태
  const [userInfo, setUserInfo] = useState();  //유저 정보
  const [teamInfo, setTeamInfo] = useState(null); //소속 팀 정보
  const [teamList, setTeamList] = useState([]); //팀 리스트

  useEffect(() => {
    // confirmMatch();
    firebase.auth().onAuthStateChanged((user) => {
      
      if (user) {
        const userPromise = getData("userList", user.uid, "string");
        const teamListPromise = getDocs("teamList");
        setIsLoggedIn(true);
        userPromise.then((doc) => { //유저 정보 가져오기
          setUserInfo(doc);
          if (doc.team == "waiting..." || doc.team == "") { //소속팀이 없거나 대기상태면 소속 팀 정보 불러오지 않음
            setTeamInfo(true);
            return;
          }
          const teamInfoPromise = getData("teamList", doc.team, "string"); //소속 팀 정보 가져오기
          teamInfoPromise.then((team) => {
            setTeamInfo(team);
          })
        })
        teamListPromise.then((docs) => {
          const teamNames = docs.map((doc) => { //docs 순회하며 name값 추출
            return doc = doc.id;
          })
          //console.log(teamNames);
          setTeamList(teamNames);
        })
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);

      // const schedule = require('node-schedule');
 
      // const j = schedule.scheduleJob('10 * * * *', function(){
      //     console.log('매 10초에 실행');
      // });
      const schedule = require('node-schedule');
      const rule = new schedule.RecurrenceRule();
      // const jobWeekDay = schedule.scheduleJob({hour: 15, minute: 0, dayOfWeek: [1, 2, 3, 4, 5]}, function(){
      //     confirmMatch();
      // });
      // const jobWeekend = schedule.scheduleJob({hour: 0, minute: 0, dayOfWeek: [0,6]}, function(){
      //     confirmMatch();
      // });
    })
    
  }, [])
  return (
    init ? // 인증상태가 확정 될 시 렌더링 시작    ,정보가 필요한 컴포넌트는 정보가 불러와지면 렌더링
      <div className="App">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Sign />} />
          <Route path="/" element={(!isLoggedIn || userInfo) && <Main isLoggedIn={isLoggedIn} userInfo={userInfo} />} />
          <Route path="/reserve" element={userInfo && teamInfo && <Reserve userInfo={userInfo} teamInfo={teamInfo} />} />
          <Route path="/my-page" element={userInfo && teamInfo && <MyPage userInfo={userInfo} teamInfo={teamInfo} />} />
          <Route path="/apply-team" element={userInfo && teamList && <ApplyTeam teamList={teamList} userInfo={userInfo} />} />
          <Route path="/create-team" element={userInfo && <CreateTeam userInfo={userInfo} />} />
          <Route path="/manage-team" element={userInfo && teamInfo &&<ManageTeam userInfo={userInfo} teamInfo={teamInfo}/>} />
          <Route path="/review" element={<Review/>} />
        </Routes>
      </div>
      : "Initializing..."

  );
}

export default App;