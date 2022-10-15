import "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { withdraw_user } from "./signUp"
import CreateTeamBtn from "./team/createTeamBtn"
import ApplyTeamBtn from "./team/applyTeamBtn"
import "./myPage.css"

const MyPage = ({ userInfo }) => {
    const navigate = useNavigate();
    const tomain = () => {
        navigate("/");
    }
    let badPoing_grade = "😄";
    useEffect(() => {
        const userbadpt = userInfo.badPoint;
        switch (userbadpt) {
            case userbadpt > 20:
                badPoing_grade = "🙂";
                break;
            case userbadpt > 40:
                badPoing_grade = "😐";
                break;
            case userbadpt > 60:
                badPoing_grade = "😨";
                break;
            case userbadpt > 80:
                badPoing_grade = "🤬";
                break;
        }
    }, [])

    return (
        <div id="top_div">
            <div id="h1_div"><h1>마이페이지</h1></div>
            <div>
                <CreateTeamBtn /> |
                <ApplyTeamBtn />
                <p>개인정보</p>
                <ul>
                    <li id="name1">이름: <label>{userInfo.name}</label> </li>
                    <li id="email">이메일: <label>{userInfo.id}</label> </li>
                    <li id="stuID">학번: <label>{userInfo.userID}</label> </li>
                    <li id="team">팀: <label>{userInfo.team}</label> </li>
                </ul>
                <p>비매너온도 : <label>{badPoing_grade}</label></p>

                <p>풋살장 이용횟수 : <label>{userInfo.playCount}회</label></p>
            </div>
            <div>
                <p>현재 신청내역</p>
                {/* 신청 DB만들면 구축 */}
            </div>
            <div>
                <p>과거 신청내역</p>
            </div>
            <button onClick={() => {
                withdraw_user();
                alert("회원탈퇴가 되었습니다");
                tomain();
            }}>회원탈퇴</button>
        </div>
    )
}
export default MyPage

