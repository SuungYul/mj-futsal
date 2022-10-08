import React from "react"
import "./App.css"
import { Routes, Route, Link } from "react-router-dom";
import Login from "./component/login.js"
import Sign from "./component/signUp.js"

function App() {
  return (
    <div className="App">
      {/* <nav>
        <Link to="/component.login">로그인</Link> | 
        <Link to="/component.signUp">회원가입</Link>
      </nav> */}
      
      <Routes>
        {/* <Route path="/component.login" element={<Show/>}></Route> */}
        <Route path="/" element={<Login/>} />
        <Route path="/component.signUp" element={<Sign/>}/>
      </Routes>
    </div>
  );
}

export default App;