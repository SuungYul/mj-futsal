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
import { addData, getData, addDataCreateDoc, db, fieldUpdateConvertor } from "../../database/firebase"
import { User, Team, ReserveTeam } from "../../database/data"

const cancelReserve = async (info) => {
    let userInfo = info.userInfo;
    let teamInfo = info.teamInfo;

    if (userInfo.currentReserve == null) {
        alert("하신 예약이 존재하지 않습니다");
        return;
    }

    if (window.confirm("정말 취소하시겠습니까?")) {
        console.log("===예약취소절차===")

        let docs = await db.collection("reserveList").doc(userInfo.currentReserve).get();
        if (!docs.exists) alert("해당 예약이 존재하지 않습니다 관리자에게 문의해주세요");

        let reserveData = docs.data();

        //개인 신청
        if (reserveData.teamInfo == -1) {
            reserveData.playerArray = reserveData.playerArray.filter(
                (element) => element !== `${userInfo.name}(${userInfo.userID})${userInfo.userKey}`
            );

            console.log(reserveData.playerArray);

            //만약 길이가 0인 경우
            if (reserveData.playerArray.length == 0) {
                let result = await db.collection("reserveList").doc(userInfo.currentReserve).delete();
            }
            else {
                //다시 플레이카운트 산출
                let playCount = 0;
                for (let idx in reserveData.playerArray) {
                    let player = new User();
                    //유저 key만 추출하는 부분
                    let playerKey = reserveData.playerArray[idx].substring(reserveData.playerArray[idx].indexOf(')') + 1);
                    let data = await getData("userList", playerKey, player);
                    playCount += data.playCount;
                }

                reserveData.playCount = playCount /= reserveData.playerArray.length;
                await fieldUpdateConvertor("reserveList", docs.id, reserveData);
            }

        }
        //팀 신청
        else {
            for (let idx in reserveData.playerArray) {
                let player = new User();
                //유저 key만 추출하는 부분
                let playerKey = reserveData.playerArray[idx].substring(reserveData.playerArray[idx].indexOf(')') + 1);
                let data = await getData("userList", playerKey, player);
                data.currentReserve = null;
                await db.collection("userList").doc(playerKey).update({ currentReserve: null });
            }
            let result = await db.collection("reserveList").doc(userInfo.currentReserve).delete();
        }

        await db.collection("userList").doc(userInfo.userKey).update({ currentReserve: null });
        console.log("===예약취소절차종료===")
        alert("예약을 취소하였습니다.");
        window.location.replace("/my-page")
        return;
    }
    else {
        alert("예약을 취소하지 않았습니다.");
        return;
    }
}


const CancelReserve = (userInfo, teamInfo) => {
    return(
        <button id="cancelButton" onClick={()=>{cancelReserve(userInfo, teamInfo)}}>예약 취소</button>
    );
}

const MyPage = ({ userInfo, teamInfo }) => {
    const [isLeader, setIsLeader] = useState();
    const [init, setInit] = useState(false)     //인증 응답 상태
    const navigate = useNavigate();
    const tomain = () => {
        navigate("/");
    }

    const user = firebase.auth().currentUser;
    const [day, setDay] = useState()
    const [time, setTime] = useState()
    const [userbadpt, setUserbadpt] = useState(); //비매너 점수
    const [userplaycnt, setUserplaycnt] = useState(); //풋살장 이용횟수
    const userPromise = getData("userList", user.uid, "string");

    userPromise.then((doc) => {
        setUserbadpt(doc.badPoint)
        setUserplaycnt(doc.playCount)
    })

    const reserveDB = getData("reserveList",userInfo.currentReserve,"string")
    reserveDB.then((doc)=>{
        setDay(doc.day)
        setTime(doc.time)
    })

    const currentInfo = userInfo.currentReserve === null ? "현재 예약 정보가 없습니다" : day + "일 " + time + "시" + " (명지대 자연캠퍼스 풋살장) "

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
        console.log("teamInfo", teamInfo);
        if (userInfo.team != "" && userInfo.team != "waiting...") {
            const leaderKey = teamInfo.leader.substr(teamInfo.leader.indexOf(')') + 1);
            if (userInfo.userKey === leaderKey) {
                setIsLeader(true);
            }
        }
        else {
        }
        setInit(true)
    }, [])

    return (
        init ?
            <div className="MyPage">
                <div id="mypageFrame">
                    <div id="myPageTitle"><h2>마이페이지</h2></div>

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
                            <td><CancelReserve userInfo={userInfo} teamInfo={teamInfo}/></td>
                        </tr>
                        <tr>
                            <th rowspan="3">과거 신청내역</th>
                            <td colspan="3"></td>
                        </tr>
                        <tr>



                        </tr>
                        <tr>

                        </tr>



                    </table>
                    <div id="managebutton">
                        {isLeader ? <ManageTeamBtn /> : <><CreateTeamBtn /> <ApplyTeamBtn /></>}
                    </div>

                    <div>
                        <button id="quitbutton" onClick={() => {
                            withdraw_user();
                            //tomain();
                        }}>회원탈퇴</button>
                    </div>
                </div>
            </div>
            : ""

    )
}
export default MyPage