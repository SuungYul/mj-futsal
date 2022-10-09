import React from "react"
import "./App.css"
import { Routes, Route, Link } from "react-router-dom";
import Login from "./component/login.js"
import Sign from "./component/signUp.js"
import Main from "./component/main/main"



function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/signUp" element={<Sign/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </div>
  );
}

export default App;
