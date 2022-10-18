import firebase from "firebase/app"
import "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { withdraw_user } from "../signUp"
import ApplyTeam from "../team/applyTeam"
import CreateTeamBtn from "../button/createTeamBtn"
import ApplyTeamBtn from "../button/applyTeamBtn"
import "./myPage.css"
import ManageTeamBtn from "../button/manageTeamBtn"
import { getData } from "../../database/firebase"
const MyPage = ({ userInfo }) => {
    const [isLeader, setIsLeader] = useState(false);
    const navigate = useNavigate();
    const tomain = () => {
        navigate("/");
    }


    const user = firebase.auth().currentUser;

    const [username, setUsername] = useState(); //이름
    const [useremail, setUseremail] = useState(); //이메일
    const [userstuid, setUserstuid] = useState(); //학번
    const [userbadpt, setUserbadpt] = useState(); //비매너 점수
    const [userplaycnt, setUserplaycnt] = useState(); //풋살장 이용횟수
    const [userTeam, setUserTeam] = useState(); //풋살장 이용횟수
    const userPromise = getData("userList", user.uid, "string");

    userPromise.then((doc) => {
        setUsername(doc.name)
        setUseremail(doc.id)
        setUserstuid(doc.userID)
        setUserbadpt(doc.badPoint)
        setUserplaycnt(doc.playCount)
        setUserTeam(doc.team)
    })

    let badPoing_grade = "😄";

    if (userbadpt > 20) {
        badPoing_grade = "🙂";
        if (userbadpt > 40) {
            badPoing_grade = "😐";
            if (userbadpt > 60) {
                badPoing_grade = "😨";
                if (userbadpt > 80) {
                    badPoing_grade = "🤬";
                }
            }
        }
    }
    useEffect(() => {
        if (userInfo.team != "") {
            getData("teamList", userInfo.team, "string").then((teamInfo) => {
                const leaderKey = teamInfo.leader.substr(teamInfo.leader.indexOf(')') + 1);
                if (userInfo.userKey === leaderKey) {
                    setIsLeader(true);
                }

            })
        }
    }, [])

    return (
        <div className="MyPage">
            <div className="frame">
                <h2 id="title">My Page</h2>
                <CreateTeamBtn />
                <ApplyTeamBtn />
                {isLeader && <ManageTeamBtn />}
                <table >
                    <tr>
                        <th id="name1">이름</th>
                        <td><label>{userInfo.name}</label></td>
                    </tr>
                    <tr>
                        <th id="email">Email</th>
                        <td><label>{userInfo.id}</label></td>
                    </tr>
                    <tr>
                        <th id="stuID">학번</th>
                        <td><label>{userInfo.userID}</label></td>
                    </tr>
                    <tr>
                        <th id="team">Your Team</th>
                        <td><label>{userInfo.team}</label></td>
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
                        <button id="quitbutton" onClick={() => {
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