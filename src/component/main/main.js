import LookUp from "./lookUp"
import Login from "./main_login"
import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";
import { useState, useEffect } from "react";
const Main = () =>{ 
    // const navigate = useNavigate();
    // const [init, setInit] = useState(false); //로그인 상태 
    // const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태를 관리
    // useEffect( () => {firebase.auth().onAuthStateChanged((user) => {
    //             if (user) { //로그인 되어 있을 경우
    //                 setIsLoggedIn(true);
    //                 console.log(isLoggedIn);
    //             }
    //             else{
    //                 setIsLoggedIn(false);
    //             }
    //             setInit(true)
    //         }) 
    // }, []);
    return (
        <>
        {<div>
                <Login/>
                <LookUp/>
            </div>
        }
        </>);
}
export default Main