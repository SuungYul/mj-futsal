import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";
import ManageTeam from "../team/manageTeam";

const ManageTeamBtn = () =>{
    const navigate = useNavigate();
    const toCreateTeam = () =>{
        navigate("/manage-team");
    }
    return <button onClick={toCreateTeam}>팀 관리</button>
}

export default ManageTeamBtn