import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";

const CreateTeamBtn = () =>{
    const navigate = useNavigate();
    const toCreateTeam = () =>{
        navigate("/createTeam");
    }
    return <button onClick={toCreateTeam}>팀 개설</button>
}

export default CreateTeamBtn