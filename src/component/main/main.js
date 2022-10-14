import LookUp from "./lookUp"
import LoginBtn from "./loginBtn"
import Logout from  "./logout"
import Reserve from '../../reservation/reserve'
import MyPageBtn from "../myPageBtn"
import firebase from "firebase/app";
import {useNavigate, Routes, Route, Link} from "react-router-dom"
import "firebase/auth";
import { useState, useEffect } from "react";
// import TestBtn from "./testBtn";
const Main = ({data}) =>{ 
    const navigate = useNavigate();
    const [init, setInit] = useState(false); //로그인 상태 
    const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태를 관리
    useEffect( () => {firebase.auth().onAuthStateChanged((user) => {
                if (user) { //로그인 되어 있을 경우
                    setIsLoggedIn(true);
                }
                else{
                    setIsLoggedIn(false);
                }
                setInit(true);
                console.log(isLoggedIn);
                console.log("데이터",data);
            }) 
    }, []);
    return (
        <>
        {init ? 
            <div>
                {
                isLoggedIn === false?  //로그인 상태시 로그아웃, 로그아웃 상태시 로그인 버튼 띄움
                    <LoginBtn/>
                    :
                    <>
                    <Logout/>
                    <MyPageBtn/>
                    </>
                }       
                <LookUp/>
            </div> : 
            "Initializing..." }
        </>);
}
export default Main