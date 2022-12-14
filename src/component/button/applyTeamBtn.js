import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";

const ApplyTeamBtn = () =>{
    const navigate = useNavigate();
    const toApplyTeam = () =>{
        navigate("/apply-team");
    }
    return <button id="applybutton" onClick={toApplyTeam}>팀 신청</button>
}

export default ApplyTeamBtn