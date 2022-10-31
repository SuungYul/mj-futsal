import React, { useEffect, useState } from "react";
import firebase from "firebase/app"
import "firebase/auth"
import { isRouteErrorResponse, useLocation } from "react-router-dom";
import { addData, getData, addDataCreateDoc, db, fieldUpdateConvertor } from "../../database/firebase";
import { User, Team, ReserveTeam } from "../../database/data"
import { ReserveInfo } from "../../database/ReserveInfo";
import "./reserve.css"
import ReserveTeamList from "./reserveTeamList";

let teamArray = new Array();
const includeCheck = (player) => {
    return teamArray.includes(player);
}

const pushTeamArray = (player) => {
    teamArray.push(player);
    console.log(teamArray);
}

const deleteTeamArray = (player) => {
    teamArray = teamArray.filter((p) => p !== player);
    console.log(teamArray);
}

const applyReserve = async (information) => {
    console.log("====예약신청 버튼 클릭 시작====");
    console.log(information);

    //유저정보 구성
    let currentUser = new User()
    currentUser = currentUser.buildObject(information.userInfo);


    let playerArray = new Array();
    playerArray.push(`${currentUser.name}(${currentUser.userID})${currentUser.userKey}`);
    let playCount = 0;

    //팀 정보 구성
    let currentTeam = new Team(-1, null, -1, null, null);
    let order = 0;

    //만약 신청한 팀이 있다면 팀을 구성한다.
    if (information.isTeam) {
        //제한 사항
        console.log(information.withOther,playerArray.length)
        
        currentTeam = currentTeam.buildObject(information.teamInfo);
        playerArray = teamArray;
        if (information.withOther && (playerArray.length < 6 || 8 < playerArray.length)) {
            alert("다른 팀과 함께 찰 때, 팀의 예약인원은 최소 6명이상이거나 최대 8명이하 입니다");
            return;
        }

        if (!information.withOther && (playerArray.length < 12 || 16 < playerArray.length)) {
            alert("같은 팀으로 구성되었을 때, 팀의 예약인원은 최소 12명이상이거나 최대 16명이하 입니다");
            return;
        }

        let teamCheck = await db.collection("reserveList")
            .where("teamInfo", "==", currentTeam.teamName)
            .where("day", "==", information.reserveInfo.state.date)
            .where("time", "==", information.reserveInfo.state.time)
            .get();

        //이미 팀이 예약되어있을 경우
        if (teamCheck.empty == false) {
            alert("이미 예약이 완료되어있습니다.");
            return;
        }
    }
    else { //팀이 없는 경우
        let indvReserveDoc = await db.collection("reserveList")
            .where("teamInfo", "==", -1)
            .where("day", "==", information.reserveInfo.state.date)
            .where("time", "==", information.reserveInfo.state.time)
            .get();

        if (indvReserveDoc.empty == false) {
            let reserveTeam = indvReserveDoc.docs[0].data();
            //이미 예약한 경우
            if (reserveTeam.playerArray.includes(playerArray[0])) {
                alert("이미 예약이 완료되어있습니다.");
                return;
            }

            //playCount 산출
            reserveTeam.playerArray.push(playerArray[0]);
            for (let idx in reserveTeam.playerArray) {
                let player = new User();
                //유저 key만 추출하는 부분
                let playerKey = reserveTeam.playerArray[idx].substring(reserveTeam.playerArray[idx].indexOf(')') + 1);
                const data = await getData("userList", playerKey, player);
                playCount += data.playCount;
            }

            //current Reserve 등록 과정
            let playerKey = playerArray[0].substring(playerArray[0].indexOf(')') + 1);
            let userData = await getData("userList", playerKey, new User());
            userData.currentReserve = indvReserveDoc.docs[0].id;
            await addData("userList", userData.userKey, userData);

            reserveTeam.playCount = playCount /= reserveTeam.playerArray.length;
            await fieldUpdateConvertor("reserveList", indvReserveDoc.docs[0].id, reserveTeam);
            console.log("예약DB 작성 완료");
            console.log("====예약신청 버튼 클릭 종료====");
            alert("예약 완료");
            return;
        }

    }



    //playCount의 산정은 모든 멤버의 playCount 합의 평균
    for (let idx in playerArray) {
        let player = new User();
        //유저 key만 추출하는 부분
        let playerKey = playerArray[idx].substring(playerArray[idx].indexOf(')') + 1);
        const data = await getData("userList", playerKey, player);
        playCount += data.playCount;
    }

    playCount /= playerArray.length;
    //해당 예약 신청양식
    let reserveTeam = new ReserveTeam(
        currentTeam.teamName,
        playerArray,    //playerArray
        playCount,
        information.reserveInfo.state.date,
        information.reserveInfo.state.time,
        order,
        information.withOther
    )

    let reserveRef = await addDataCreateDoc("reserveList", reserveTeam);

    //playerArray에 있는 모든 유저에게 currentReserve 등록
    for (let idx in playerArray) {
        let playerKey = playerArray[idx].substring(playerArray[idx].indexOf(')') + 1);
        let userData = await getData("userList", playerKey, new User());
        userData.currentReserve = reserveRef.id;
        await addData("userList", userData.userKey, userData);
    }
    console.log("예약DB 작성 완료");
    console.log("====예약신청 버튼 클릭 종료====");
    alert("예약 완료");
    setTimeout(() => {
        window.location.replace("/")
    }, 300)
    return;
}


const ReserveButton = (information) => {
    return (
        <button id="resrvButton" onClick={() => { applyReserve(information.information) }}>
            예약하기
        </button>
    )
}


const Reserve = ({ userInfo, teamInfo }) => {

    const reserveInfo = useLocation();
    const [withOther, setWithOther] = useState(false);
    const [isTeam, teamCheck] = useState(false);
    const [radio_click, setRadio] = useState(true);
    const clickRB = (e) => {
        if (e.target.id === "team") {
            teamCheck(true)
        }
        else {
            teamCheck(false)
        }
    }
    const radioActive = (event) => {
        if (event.target.id === "play_other") {
            setRadio(false)
            teamCheck(false)
            setWithOther(true);
        }
        if (event.target.id === "play_team") {
            setRadio(true)
            teamCheck(true)
            setWithOther(false);
        }
        // setRadio()
    }
    const result = []

    return (
        <div id="top_div">
            <div className="reserveFrame">
                <div id="reserveTitle"><h1>풋살장 예약 신청</h1></div>
                <div id="jb-division-line"></div>
                <div id="dayhour">{reserveInfo.state.date}일 {reserveInfo.state.time}시</div>
                <div id="jb-division-line"></div>
                <div>
                    {/* {props.day} | {props.time} */}
                </div>
                <br />
                <br />
                <br />

                <div className="choice">
                    <input
                        type="radio"
                        id="play_other"
                        name="play_check"
                        // value="0"
                        onChange={radioActive}>
                    </input>
                    <label htmlFor="play_other">다른 팀과 같이 찰래요</label>

                    <input
                        type="radio"
                        id="play_team"
                        name="play_check"
                        // value="1"
                        onChange={radioActive}>
                    </input>
                    <label htmlFor="play_team">우리끼리만 찰래요</label>
                </div>
                <div className="choice">
                    <input
                        type="radio"
                        id="individual"
                        name="ck_team"
                        value={false}
                        disabled={radio_click}
                        // checked={isTeam === fa}
                        onChange={clickRB}
                    >
                    </input>
                    <label htmlFor="individual">개인</label>
                    <input
                        type="radio"
                        id="team"
                        name="ck_team"
                        value={true}
                        disabled={radio_click && !isTeam}
                        onChange={clickRB}
                        checked={isTeam}

                    >
                    </input>
                    <label htmlFor="team">팀</label>
                </div>

                <div className="teamlist">
                    <article className={(isTeam === true) ? "art_team" : "art_indi"}>
                        <div id="teamlistTitle"><h2>팀 명단 작성</h2></div>
                        {/* 팀 DB 구현되면 작성 */}
                        {teamInfo && <ReserveTeamList userInfo={userInfo} teamInfo={teamInfo} pushFunc={pushTeamArray} deleteFunc={deleteTeamArray}
                        includeCheck={includeCheck}/>}
                    </article>
                </div>
                <ReserveButton id="Rbutton" information={
                    {
                        isTeam: isTeam,
                        reserveInfo: reserveInfo,
                        userInfo: userInfo,
                        teamInfo: teamInfo,
                        withOther: withOther
                    }
                } />
            </div>
            <div>

            </div>

        </div>
    );
}

export default Reserve