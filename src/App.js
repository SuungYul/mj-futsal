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
      <Route path="/" element={<Login/>} />
      <Route path="/component.signUp" element={<Sign/>} />
      <Route path="/component/main.main" element={<Main/>} />
    </Routes>
    </div>
  );
}

export default App;
