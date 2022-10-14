import LoginBtn from "./loginBtn"
import Logout from "./logout"
import Reserve from '../../reservation/reserve'
import MyPageBtn from "../myPageBtn"
import firebase from "firebase/app";
import { useNavigate, Routes, Route, Link, Navigate } from "react-router-dom"
import "firebase/auth";
import React, { useState, useEffect } from "react";
// import TestBtn from "./testBtn";

export default class Main extends React.Component {
    // isLoggedIn = false;
    // constructor() {
    //     console.log('isLoggedIn', this.isLoggedIn);
    // }
    render() {
        const navigate = this.useNavigate();
        const [init, setInit] = this.useState(false);
        const[isLoggedIn, setIsLoggedIn] = this.useState(false);
        this.useEffect(() => {
            firebase.auth().onAuthStateChanged((user) => {
                setIsLoggedIn(user ? true : false);
                setInit(true);
            })
        })
        return (
            <div>
                <Navigate to='/look-up' />
            </div>
        );
    }
}