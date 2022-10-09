import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";

const Logout = () =>{
    const navigate = useNavigate();
    const logout = () =>{
        firebase.auth().signOut();
        console.log("로그아웃");
        navigate("/");
    }
    return <button onClick={logout}>로그아웃</button>
}

export default Logout