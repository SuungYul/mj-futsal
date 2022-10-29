import React, { useEffect, useState } from "react";
import firebase from "firebase/app"
import "firebase/auth"
import { useLocation } from "react-router-dom";
import { addData, getData, addDataCreateDoc } from "../../database/firebase";
import { User, Team, PlayTeam } from "../../database/data"
import { ReserveInfo } from "../../database/ReserveInfo";
import "./reserve.css"
import ReserveTeamList from "./reserveTeamList";

const applyReserve = (information) => {
    console.log("====예약신청 버튼 클릭 시작====");
    console.log(information);

    //유저정보 구성
    let currentUser = new User()
    currentUser = currentUser.buildObject(information.userInfo);

    //팀 정보 구성
    let currentTeam = new Team(-1, null, -1, null, null);
    let playCount = currentUser.playCount; 

    //만약 신청한 팀이 있다면 팀을 구성한다.
    if(information.isTeam){
        //팀이 있다면 playCount의 산정은 모든 멤버의 playCount 합의 평균
        currentTeam = currentTeam.buildObject(information.teamInfo);
    
    }

    //해당 예약 신청양식
    let playTeam = new PlayTeam(
        0, 
        currentTeam.teamName, 
        information.reserveInfo.state.date,
        information.reserveInfo.state.time,
        currentUser.id,
        0,
        playCount
    )
    
    //예약 DB에 등록
    addDataCreateDoc("reserveList", playTeam)
    .then((reserveRef) =>{
        //유저 history에 등록해야되기 때문에 유저 파일을 불러옴
        getData("userList", currentUser.userKey, currentUser)
        .then((userData)=>{
            console.log(reserveRef);
            console.log(userData);

            userData.history.push(reserveRef.id);

            addData("userList", userData.userKey, userData);

            console.log("예약DB 작성 완료");
        })
    })

    console.log("====예약신청 버튼 클릭 종료====");
}


const ReserveButton = (information) =>{
    return(
        <button onClick={()=>{applyReserve(information.information)}}>
            예약 신청
        </button>
    )
}


const Reserve = ({ userInfo, teamInfo }) => {
    
    const reserveInfo = useLocation();
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
        }
        if (event.target.id === "play_team") {
            setRadio(true)
            teamCheck(true)
        }
        // setRadio()
    }
    const result = []
    
    return (
        <div id="top_div">
            <div className="frame">
                <div id="title_3"><h1>풋살장 예약 신청</h1></div>
                {/* 현재 예약 정보는 예약 DB에서 긁어와야됨 */}
                <div> 현재 예약 정보 </div>

                {reserveInfo.state.date}일 {reserveInfo.state.time}시

                <div>
                    {/* {props.day} | {props.time} */}
                </div>
                <div>
                    <input
                        type="radio"
                        id="play_other"
                        name="play_check"
                        // value="0"
                        onChange={radioActive}>
                    </input>
                    <label htmlFor="play_other">다른 팀과 같이 찰래요</label>
                    |
                    <input
                        type="radio"
                        id="play_team"
                        name="play_check"
                        // value="1"
                        onChange={radioActive}>
                    </input>
                    <label htmlFor="play_team">우리끼리만 찰래요</label>
                    <br />
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
                    <label htmlFor="individual">개인</label> |
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
                    <article className={(isTeam === true) ? "art_team" : "art_indi"}>
                    <h2>팀 명단 작성</h2>
                    {/* 팀 DB 구현되면 작성 */}
                    <ReserveTeamList userInfo={userInfo} teamInfo={teamInfo}/>
                </article>
                </div>
                <ReserveButton information={
                    {   isTeam: isTeam, 
                        reserveInfo: reserveInfo,
                        userInfo: userInfo, 
                        teamInfo: teamInfo}
                }/>
            </div>
            <div>
                
            </div>
            
        </div>
    );
}

export default Reserve

