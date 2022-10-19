import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";
import "./teambutton.css"

const CreateTeamBtn = () =>{
    const navigate = useNavigate();
    const toCreateTeam = () =>{
        navigate("/create-team");
    }
    return <button id="createbutton" onClick={toCreateTeam}>팀 개설</button>
}

export default CreateTeamBtn