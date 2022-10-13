import firebase from "firebase/app"
import "firebase/auth"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { withdraw_user } from "./signUp"
import {getData} from "../database/firebase.js"
import ApplyTeam from "./team/applyTeam"
import CreateTeamBtn from "./team/createTeamBtn"
import ApplyTeamBtn from "./team/applyTeamBtn"

const MyPage = () => {
    const navigate = useNavigate();
    const tomain = () =>{
        navigate("/");
    }


    const user = firebase.auth().currentUser;

    const [username,setUsername] = useState(); //이름
    const [useremail,setUseremail] = useState(); //이메일
    const [userstuid,setUserstuid] = useState(); //학번
    const [userbadpt,setUserbadpt] = useState(); //비매너 점수
    const [userplaycnt,setUserplaycnt] = useState(); //풋살장 이용횟수
    const [userTeam,setUserTeam] = useState(); //풋살장 이용횟수
    const userPromise = getData("userList",user.uid,"string");

    userPromise.then( (doc) => {
        setUsername(doc.name)
        setUseremail(doc.id)
        setUserstuid(doc.userID)
        setUserbadpt(doc.badPoint)
        setUserplaycnt(doc.playCount)
        setUserTeam(doc.team)
    })
    
    let badPoing_grade = "😄";

    if(userbadpt>20){
        badPoing_grade = "🙂";
        if(userbadpt>40){
            badPoing_grade = "😐";
            if(userbadpt>60){
                badPoing_grade = "😨";
                if(userbadpt>80){
                    badPoing_grade ="🤬";
                }
            }
        }
    }

    return (
        <div>
            <button onClick={tomain}>메인으로</button>
            <h1>마이페이지</h1>
            <CreateTeamBtn/> |  
            <ApplyTeamBtn/>
            <div>
                <p>개인정보</p>
                    <ul>
                        <li id="name1">이름: <label>{username}</label> </li> 
                        <li id="email">이메일: <label>{useremail}</label> </li>
                        <li id="stuID">학번: <label>{userstuid}</label> </li> 
                        <li id="team">팀: <label>{userTeam}</label> </li> 
                    </ul>
                <p>비매너온도 : <label>{badPoing_grade}</label></p>

                <p>풋살장 이용횟수 : <label>{userplaycnt}회</label></p>
            </div>
            <div>
                <p>현재 신청내역</p>
                {/* 신청 DB만들면 구축 */}
            </div>
            <div>
                <p>과거 신청내역</p>
            </div>
            <button onClick={()=>{
                withdraw_user();
                alert("회원탈퇴가 되었습니다");
                tomain();
            }}>회원탈퇴</button>
        </div>
    )
}
export default MyPage