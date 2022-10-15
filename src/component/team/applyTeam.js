import firebase from "firebase/app";
import { useState, useEffect } from "react";
import "firebase/auth";
import { addData, fieldUpdate } from "../../database/firebase";

const ApplyTeam = ( {userInfo,teamList}) =>{ 
    const user = firebase.auth().currentUser;
    const [selectedTeam, setSelectedTeam] = useState();
    useEffect( () =>{
        setSelectedTeam(teamList[0]);
    }, [])
    //console.log(teamList, userInfo);
    const teamChange = (e) =>{ //팀선택 바꿀 때마다 selectedTeam set
        const value = e.target.value;
        console.log("value",value);
        setSelectedTeam(value);
    }
    const checkBelongTo = () =>{ //나중에 리팩토링 예정
        console.log(userInfo.team);
        return userInfo.team === '' ? false : true;
    }
    const checkWaiting = () =>{
        return userInfo.team === "waiting..." ? true : false;
    }
    const applyTeam = (e) => { // 신청 시 신청한팀에 대기자 명단에 이름(학번) 올라감
        e.preventDefault(); 
        if(checkBelongTo() === true){ //소속된 팀이 있으면 경고
            alert("이미 소속이 있습니다.");
            return;
        }
        if(checkWaiting() === true){ //신청 대기중이면 경고
            alert("신청 대기중 입니다.")
            return;
        }
        fieldUpdate("teamList", selectedTeam,{waitingList:firebase.firestore.FieldValue.arrayUnion(userInfo.name+"("+userInfo.userID+")")});
        fieldUpdate("userList", user.uid, {team:"waiting..."})
        
    }
    return <>
        <select value={selectedTeam} onChange={teamChange}>{    //팀 선택 html 동적으로 만들기
            teamList.map((teamName, index) => {
                return <option key={index} value={teamName}>{teamName}</option>
            })}
        </select>
        <button onClick={applyTeam}>팀 신청</button>
        
    </>
}

export default ApplyTeam