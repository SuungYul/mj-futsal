import firebase from "firebase/app";
import { getData, fieldUpdate,getFilteredDocs } from "../../database/firebase";
import "firebase/auth";
import { useState, useEffect } from "react";
import "./manageTeam.css"
const ManageTeam = ({userInfo}) => {
    const teamPromise = getData("teamList", userInfo.team, "string");
    const [init, setInit]  = useState(false);  //팀 정보 수신 상태
    const [teamInfo, setTeamInfo] = useState([]) //팀 정보
    const [waitingArray, setWaitingArray] = useState([]) //대기자배열
    const [update, setUpdate] = useState(false); //업데이트 갱신 리렌더링용
    useEffect( ()=>{
        teamPromise.then( (teamDB)=>{ //teamDB불러오고 대기자 배열 저장 
            setTeamInfo(teamDB);
            setWaitingArray(teamDB.waitingList);
            setInit(true);
        })
    } 
    , [update])

    const userUpdate = (key, teamName) =>{ //유저 정보 업데이트
        console.log(key);
        fieldUpdate("userList", key, {team:teamName})
    }

    const accept = (waiting) =>{ //수락 시 대기자에서 없애고 멤버로 추가, 개인 정보 업데이트
        console.log(waiting);
        const key = waiting.substr(waiting.indexOf(')')+1); //유저키만 따오기
        fieldUpdate("teamList", teamInfo.teamName, {waitingList:firebase.firestore.FieldValue.arrayRemove(waiting)});
        fieldUpdate("teamList", teamInfo.teamName,{member:firebase.firestore.FieldValue.arrayUnion(waiting)});
        userUpdate(key,teamInfo.teamName);
        setUpdate(!update);
        
    }
    const refuse = (waiting) =>{
        console.log(waiting);
        const key = waiting.substr(waiting.indexOf(')')+1); //유저키만 따오기
        fieldUpdate("teamList", teamInfo.teamName, {waitingList:firebase.firestore.FieldValue.arrayRemove(waiting)});
        userUpdate(key,"");
        setUpdate(!update);
    }
     return init? //팀DB 수신 완료 시 대기자 명단으로 li 태그 동적 생성
            <ul> 
            {
            waitingArray.map((waiting, index) => {
                console.log(waiting);
                return <li key={index}>{waiting.substring(0,waiting.indexOf(')')+1)} <button onClick={(e) =>{
                    accept(waiting);
                }} value={waiting} key={"1"+index}>수락</button>
                       <button onClick={(e) =>{
                            refuse(waiting);
                       }} value={waiting} key={"2"+index}>거부</button></li>
            })}
            </ul>   
            :
            <div>"대기자 불러오는 중."</div>

}
export default ManageTeam