import React, { useState } from "react";
import "./reserve.css"
const Reserve = () => {
    const[isTeam,teamCheck] = useState([]);
    const clickRB = (e) => {
        console.log(e.target.value)
        teamCheck(e.target.value)
    }
    
    return (
        <div>
        <h1>풋살장 예약 신청</h1>
                {/* 현재 예약 정보는 예약 DB에서 긁어와야됨 */}
            <div> 현재 예약 정보 </div> 
                <div>
                    <input type="checkbox" id="match" name="match"></input>
                    <label for="match">(선택) 매칭</label>
                    <br/>
                    <input 
                        type="radio"
                        id="ck_team"
                        name="individual"
                        value="0"
                        checked={isTeam === "0"}
                        onChange={clickRB}>
                    </input> 
                    <label for="individual">개인</label> |
                    <input 
                        type="radio"
                        id="ck_team"
                        name="team"
                        value="1"
                        checked={isTeam === "1"}
                        onChange={clickRB}>
                    </input>
                    <label for="team">팀</label>
                </div>
            <div>
            <article className={(isTeam==="1")? "art_team" : "art_indi"}>
                <h2>팀 명단 작성</h2>
                    {/* 팀 DB 구현되면 작성 */}
            </article>
            </div>
        </div> 
        
        
        
    );

    
}

export default Reserve
