import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";
import { addData, fieldUpdate } from "../../database/firebase";

const ApplyTeam = ( {userInfo,teamList}) =>{
    let value;
    console.log(teamList, userInfo);
    const applyTeam = (e) => {
        e.preventDefault();
        const selectedTeam = value;
        fieldUpdate("teamList", selectedTeam,{waitingList:firebase.firestore.FieldValue.arrayUnion(userInfo.name+"("+userInfo.userID+")")});
    }
    return <form>
        <select name="job">{   
            teamList.map((teamName) => {
                return <option key={teamName} value={teamName}>{teamName}</option>
            })}
        </select>
        <button onClick={applyTeam}>팀 신청</button>
        
    </form>
}

export default ApplyTeam