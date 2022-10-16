import firebase from "firebase/app";
import { useNavigate } from "react-router-dom"
import { getData } from "../../database/firebase";
import "firebase/auth";

const ManageTeam = () => {
    
    const navigate = useNavigate();
    
    return <button
        style={{ float: "right" }}
        onClick={logout}>로그아웃
    </button>
}

export default ManageTeam