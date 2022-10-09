import LookUp from "./lookUp"
import LoginBtn from "./loginBtn";
import Logout from "./logout"
import firebase from "firebase/app";
import {useNavigate, Routes, Route, Link} from "react-router-dom"
import "firebase/auth";
import { useState, useEffect } from "react";
const Main = (loginState) =>{ 
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
                    console.log(isLoggedIn)
                }
                setInit(true);
                
            }) 
    }, [isLoggedIn]);
    return (
        <>
        {console.log(isLoggedIn)}
        {init ? 
            <div>
                {
                isLoggedIn === false?
                    (<Routes>
                        <Route path="/" element={<LoginBtn/>} />
                    </Routes>)
                    :
                    (<Routes>
                        <Route path="/" element={<Logout/>} />
                    </Routes>)
                }       
                <LookUp/>
            </div> : 
            "Initializing..." }
        </>);
}
export default Main