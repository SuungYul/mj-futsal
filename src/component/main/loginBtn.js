import {useNavigate} from "react-router-dom"
import "firebase/auth";
import "./button.css"

const LoginBtn = () =>{
    const navigate = useNavigate();
    const toLogin = () =>{
        navigate("login");
    }
    return <button id="loginbutton" style={{float: "right"}} onClick={toLogin}>로그인하기</button>
}

export default LoginBtn