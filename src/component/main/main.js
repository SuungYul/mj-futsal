import LookUp from "./lookUp"
import LoginBtn from "./loginBtn";
import Logout from "./logout"
import firebase from "firebase/app";
import {useNavigate, Routes, Route, Link} from "react-router-dom"
import "firebase/auth";
import { useState, useEffect } from "react";
import TestBtn from "./testBtn";
const Main = () =>{ 
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
            }) 
    }, [isLoggedIn]);
    return (
        <>
        {init ? 
            <div>
                {
                isLoggedIn === false?  //로그인 상태시 로그아웃, 로그아웃 상태시 로그인 버튼 띄움
                    (<Routes> 
                        <Route path="/" element={<LoginBtn/>} />
                    </Routes>)
                    :
                    (<Routes>
                        <Route path="/" element={<Logout/>} />
                    </Routes>)
                }       
                <LookUp/>
                <TestBtn/>
            </div> : 
            "Initializing..." }
        </>);
}
export default Main