import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";

const Login = () =>{
    const navigate = useNavigate();
    const login = () =>{
        //firebase.auth().signOut();
        //console.log("로그아웃");
        navigate("/login");
    }
    return <button onClick={login}>로그인</button>
}

export default Login