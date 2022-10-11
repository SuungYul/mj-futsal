import LookUp from "./lookUp"
import Login from "./main_login"
import Reserve from '../../reservation/reserve'
import firebase from "firebase/app";
import {useNavigate, Routes, Route, Link} from "react-router-dom"
import "firebase/auth";
import { useState, useEffect } from "react";

const Main = () =>{ 
    const navigate = useNavigate();
    const [init, setInit] = useState(false); //로그인 상태 
    const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태를 관리
    useEffect( () => {firebase.auth().onAuthStateChanged((user) => {
                if (user) { //로그인 되어 있을 경우
                    setIsLoggedIn(true);
                    console.log(isLoggedIn);
                }
                else{
                    setIsLoggedIn(false);
                }
                setInit(true)
            }) 
    }, []);
    return (
        <>
        {<div>
                <Login/>
                <myPageBtn/>
                <LookUp/>
                
                {/* <Reserve/> */}
            </div>
        }
        </>);
}
export default Main