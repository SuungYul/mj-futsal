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


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false)
  useEffect(firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setInit(true);
  }), [])
  return (
    <div className="App">
    
    {init? 
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signUp" element={<Sign/>} />
      <Route path="/" element={<Main/>} />
      <Route path="/reserve" element={isLoggedIn?<Reserve/> : <Login/>} />
      <Route path="/mypage" element={isLoggedIn?<MyPage/> : <Login/>} />
    </Routes>
    : "Initializing..."
    }
    </div>
  );
}

export default App;