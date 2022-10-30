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
const MyPage = ({ userInfo, teamInfo }) => {
    const [isLeader, setIsLeader] = useState();
    const [init, setInit] = useState(false)     //인증 응답 상태
    const navigate = useNavigate();
    const tomain = () => {
        navigate("/");
    }

    const user = firebase.auth().currentUser;

    const [userbadpt, setUserbadpt] = useState(); //비매너 점수
    const [userplaycnt, setUserplaycnt] = useState(); //풋살장 이용횟수
    const userPromise = getData("userList", user.uid, "string");

    userPromise.then((doc) => {
        setUserbadpt(doc.badPoint)
        setUserplaycnt(doc.playCount)
    })

    let badPoint_grade = "😄";

    if (userbadpt > 20) {
        badPoint_grade = "🙂";
        if (userbadpt > 40) {
            badPoint_grade = "😐";
            if (userbadpt > 60) {
                badPoint_grade = "😨";
                if (userbadpt > 80) {
                    badPoint_grade = "🤬";
                }
            }
        }
    }
    useEffect(() => {
        if (userInfo.team != "" && userInfo.team != "waiting...") {
            const leaderKey = teamInfo.leader.substr(teamInfo.leader.indexOf(')') + 1);
            if (userInfo.userKey === leaderKey) {
                setIsLeader(true);    
            }
         }
        else{
        }
        setInit(true)
    }, [])

    return (
        init ?
            <div className="MyPage">
                <div className="frame">
                    <h2 id="title">My Page</h2>
                    <div>
                        {isLeader ? <ManageTeamBtn /> : <><CreateTeamBtn /> <ApplyTeamBtn /></>}
                    </div>
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
                            <td><label>{badPoint_grade}</label></td>
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
            : ""
    )
}
export default MyPage