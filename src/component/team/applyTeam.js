import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";
import { addData } from "../../database/firebase";

const ApplyTeam = ({teamList}) =>{
    const applyTeam = () => {
    
    }

    return <>
        <select name="job">
            {       
                teamList.map((teamName) => {
                    return <option value={teamName}>{teamName}</option>
            })}
        </select>
        <button onClick={applyTeam}>팀 신청</button>
        
    </>
}

export default ApplyTeam