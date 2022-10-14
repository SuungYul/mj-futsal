import "firebase/auth";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/login.js";
import Main from "./component/main/Main";
import MyPage from "./component/myPage";
import Sign from "./component/signUp.js";
import ApplyTeam from "./component/team/applyTeam";
import CreateTeam from "./component/team/createTeam";
import Header from "./Header";
import Reserve from "./reservation/reserve";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signUp" element={<Sign/>} />
        <Route path="/" element={<Main/>} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/apply-team" element={<ApplyTeam />} />
        <Route path="/create-team" element={<CreateTeam />} />
      </Routes>
    </div>
  );
}

export default App;