import firebase from "firebase/app";
import { useNavigate } from "react-router-dom"
import "firebase/auth";
import "../button/button.css"

const Logout = () => {
    const navigate = useNavigate();
    const logout = () => {
        firebase.auth().signOut().then(() =>{
            console.log("로그아웃");
            navigate("/login");
            //navigate("/");
        })
    }
    return <button id="logoutbutton"
        style={{ float: "right" }}
        onClick={logout}>로그아웃
    </button>
}

export default Logout