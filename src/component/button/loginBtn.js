import {useNavigate} from "react-router-dom"
import "firebase/auth";

const LoginBtn = () =>{
    const navigate = useNavigate();
    const toLogin = () =>{
        navigate("login");
    }
    return <button style={{float: "right"}} onClick={toLogin}>로그인하기</button>
}

export default LoginBtn 