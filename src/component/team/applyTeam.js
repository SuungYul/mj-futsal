import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";
import { addData } from "../../database/firebase";

const ApplyTeam = () =>{
    const applyTeam = () => {

    }

    return <button onClick={applyTeam}>팀 신청</button>
}

export default ApplyTeam