import firebase from "firebase/app";
import {useNavigate} from "react-router-dom"
import "firebase/auth";
import { addData, getData, checkDocConflict,fieldUpdate } from "../../database/firebase";
import { User } from "../../database/data";
import { useState, useEffect } from "react";

const CreateTeam = () =>{ //팀 개설 컴포넌트
    const user = firebase.auth().currentUser; //유저 정보 미리 받아와서 필요한 정보 컴포넌트내에 저장
    const userPromise = getData("userList",user.uid, "string");
    const [userName,setUserName] = useState(); 
    const [userStuId,setUserStuId] = useState(); 
    const [userBadpt,setUserBadpt] = useState(); 
    const [userPlaycnt,setUserPlaycnt] = useState(); 
    const [userTeam, setUserTeam] = useState();
    userPromise.then( (doc) => {
        setUserName(doc.name);
        setUserStuId(doc.userID);
        setUserBadpt(doc.badPoint);
        setUserPlaycnt(doc.playCount);
        setUserTeam(doc.team);
        console.log(userTeam);
    });
    const createTeam = (e) =>{ //팀 개설 클릭시 받아온 정보 바탕으로 DB에 팀추가(동시에 필드에 팀 정보 추가, Member컬렉션에 팀장 정보 추가(member로써))
        const checkBelongTo = () =>{
            return userTeam === '' ? false : true;
        }
        e.preventDefault();
        const TeamName = document.getElementById('teamName').value;
        const conflictPromise = checkDocConflict("teamList",TeamName); //충돌 확인 프로미스
        console.log(userTeam);

        if(checkBelongTo() === true){ //소속된 팀이 있으면 경고
            alert("이미 소속이 있습니다.");
            return;
        }
        conflictPromise.then( (conflict) =>{ 
            if (conflict){ 
                alert("이미 존재하는 팀명입니다.");  //존재하는 팀명을 사용하면 경고
            } 
            else{
                addData("teamList", TeamName, { //teamList 컬렉션에 팀명, 리더 이름(학번),멤버 배열 추가
                    teamName:TeamName,
                    leader:userName +"("+userStuId+")",
                    member:[]
                }); 
               fieldUpdate("userList", user.uid, {team:TeamName}); //팀 개설자의 DB에 팀 반영
               fieldUpdate("teamList", TeamName,{member:firebase.firestore.FieldValue.arrayUnion(userName+"("+userStuId+")")});//팀 DB에 개설자 Member로 추가
            } 
        } )
    
    
    }
    return <form>
        <div> 팀 이름 <input type="text" id="teamName" maxLength="20"/></div>
        <button type="submit" id="teamName" onClick ={createTeam} >팀 신청하기</button>
    </form>
}

export default CreateTeam