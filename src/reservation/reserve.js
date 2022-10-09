import { useState } from "react";

const Reserve = () => {
    const[isTeam,teamCheck] = useState(false);
    console.log(teamCheck);
    return (<>{
        <div>
        <h1>풋살장 예약 신청</h1>
            <div className="1">
            <div> 현재 예약 정보 </div>
                <div>
                    <input type="checkbox" id="match" name="match"/>
                    <label for="match">(선택) 매칭</label>
                    <input type="radio" id="individual" name="individual" value="1" checked>개인</input>
                    <input type="radio" id="team" name="team" value="2">팀</input>
                </div>
            <div>
            <article>
                <h2>팀 명단 작성</h2>

            </article>
            </div>
        </div> 
        </div>}
        
        
        </>);

    
}

export default Reserve

// function selected_team(obj){
//     var bool_obj = document.getElementById()
// }