import React, { useEffect, useState } from "react";
import firebase from "firebase/app"
import "firebase/auth"
import { useLocation } from "react-router-dom";
import { getData } from "../../database/firebase";
import { ReserveInfo } from "../../database/ReserveInfo";
import "./reserve.css"
import ReserveTeamList from "./reserveTeamList";

const Reserve = ({ userInfo, teamInfo }) => {
    console.log(userInfo)
    console.log(teamInfo)
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
                <h1>풋살장 예약 신청</h1>
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
                </div>
            </div>
            <div>
                <article className={(isTeam === true) ? "art_team" : "art_indi"}>
                    <h2>팀 명단 작성</h2>
                    {/* 팀 DB 구현되면 작성 */}
                    <ReserveTeamList userInfo={userInfo} teamInfo={teamInfo}/>
                </article>
            </div>
            
        </div>
    );
}

export default Reserve