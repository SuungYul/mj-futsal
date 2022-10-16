import firebase from "firebase/app"
import "firebase/auth"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { withdraw_user } from "./signUp"
import {getData} from "../database/firebase.js"
import ApplyTeam from "./team/applyTeam"
import CreateTeamBtn from "./team/createTeamBtn"
import ApplyTeamBtn from "./team/applyTeamBtn"
import "./myPage.css"

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
        <div className="MyPage">
            <div className="frame">
                <h2 id="title">My Page</h2>
                <CreateTeamBtn/>   
                <ApplyTeamBtn/>
                <table >
                    <tr>
                        <th id="name1">이름</th>
                        <td><label>{username}</label></td>
                    </tr>
                    <tr>
                        <th id="email">Email</th>
                        <td><label>{useremail}</label></td>
                    </tr>
                    <tr>
                        <th id="stuID">학번</th>
                        <td><label>{userstuid}</label></td>
                    </tr>
                    <tr>
                        <th id="team">Your Team</th>
                        <td><label>{userTeam}</label></td>
                    </tr>
                    <tr>
                        <th>비매너온도</th>
                        <td><label>{badPoing_grade}</label></td>
                    </tr>
                    <tr>
                        <th>풋살장 이용횟수</th>
                        <td><label>{userplaycnt}회</label></td>
                    </tr>
                    <tr>
                        <th>현재 신청내역</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>과거 신청내역</th>
                        <td></td>
                    </tr>
                </table>

                <div><button id="tomainbutton" onClick={tomain}>메인으로</button></div>
                <div>
                    <button id="quitbutton" onClick={()=>{
                        withdraw_user();
                        alert("회원탈퇴가 되었습니다");
                        tomain();
                    }}>회원탈퇴</button>
                </div>
            </div>
        </div>
    )
}
export default MyPage