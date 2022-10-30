import firebase from "firebase/app";
import { getData, fieldUpdate, getFilteredDocs } from "../../database/firebase";
import "firebase/auth";
import { useState, useEffect } from "react";
import "./manageTeam.css"
const ManageTeam = ({ userInfo, teamInfo }) => {
    const teamPromise = getData("teamList", userInfo.team, "string");
    const [init, setInit] = useState(false);  //팀 정보 수신 상태
    const [waitingArray, setWaitingArray] = useState([]) //대기자배열
    const [update, setUpdate] = useState(false); //업데이트 갱신 리렌더링용
    const [userName, setUserName] = useState([]);
    const [userStuId, setUserStuId] = useState([]);
    const [init2, setInit2] = useState(false);
    useEffect(() => {
        if (teamInfo.waitingList === undefined || teamInfo.waitingList.length === 0) {
            alert("대기자가 없습니다")
            window.location.replace("/my-page")
            return;
        }
        else {
            setWaitingArray(teamInfo.waitingList);
            let temp = []
            let temp2 = []
            for (let i = 0; i < teamInfo.waitingList.length && !init2; i++) {
                getData("userList", teamInfo.waitingList[i], "string").then((doc) => {
                    console.log(doc);
                    temp.push(doc.name)
                    temp2.push(doc.userID)
                    if (i === teamInfo.waitingList.length - 1) {
                        setUserName(temp);
                        setUserStuId(temp2);
                        setInit2(true);
                    }
                })
            }
            
            setInit(true);
        }
    }, [update])

    const userUpdate = (key, teamName) => { //유저 정보 업데이트
        console.log(key);
        fieldUpdate("userList", key, { team: teamName })
    }

    const accept = (waiting) => { //수락 시 대기자에서 없애고 멤버로 추가, 개인 정보 업데이트
        console.log(waiting);
        fieldUpdate("teamList", teamInfo.teamName, { waitingList: firebase.firestore.FieldValue.arrayRemove(waiting) });
        fieldUpdate("teamList", teamInfo.teamName, { member: firebase.firestore.FieldValue.arrayUnion(waiting) });
        userUpdate(waiting, teamInfo.teamName);
        for(let i = 0; i < waitingArray.length; i++) {
            if(waitingArray[i] === waiting)  {
              waitingArray.splice(i, 1);
              i--;
            }
          }
        setUpdate(!update);
        if (teamInfo.waitingList === undefined || teamInfo.waitingList.length === 0) {
            alert("대기자가 없습니다")
            window.location.replace("/my-page")
            return;
        }
    }
    const refuse = (waiting) => {
        console.log(waiting);
        fieldUpdate("teamList", teamInfo.teamName, { waitingList: firebase.firestore.FieldValue.arrayRemove(waiting) });
        userUpdate(waiting, "");
        for(let i = 0; i < waitingArray.length; i++) {
            if(waitingArray[i] === waiting)  {
              waitingArray.splice(i, 1);
              i--;
            }
          }
        setUpdate(!update);
        if (teamInfo.waitingList === undefined || teamInfo.waitingList.length === 0) {
            alert("대기자가 없습니다")
            window.location.replace("/my-page")
            return;
        }
    }
    return init ? //팀DB 수신 완료 시 대기자 명단으로 li 태그 동적 생성
        <ul>
            {
                waitingArray.map((waiting, index) => {
                    console.log(waiting);
                    return <li key={index}>{userName[index] + userStuId[index]} <button onClick={(e) => {
                        accept(waiting);
                    }} value={waiting} key={"1" + index}>수락</button>
                        <button onClick={(e) => {
                            refuse(waiting);
                        }} value={waiting} key={"2" + index}>거부</button></li>
                })}
        </ul>
        :
        <div>"대기자 불러오는 중."</div>

}
export default ManageTeam

