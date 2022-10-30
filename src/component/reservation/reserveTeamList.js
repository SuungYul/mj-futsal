import { ReserveTeam } from "../../database/data";
import { pushTeamArray, deleteTeamArray } from "../reservation/reserve";
import "./reserve.css"

const ReserveTeamList = ({ teamInfo, userInfo, reserveInfo, pushFunc, deleteFunc, includeCheck}) => {

    console.log(teamInfo, userInfo, reserveInfo);
    //id, teamInfo, playerArray, playCount, day, timeSlotID
    const addPlayer = (tm) => {
        const newPT = new ReserveTeam(null,);

    }
    console.log(teamInfo);
    if (teamInfo===true) {
        return;
    }
    return ( //팀DB 수신 완료 시 대기자 명단으로 li 태그 동적 생성
        <ul id="writeTeamMem">
            {
                teamInfo.member.map((teamMember, index) => {
                    return <li key={index}>{teamMember.substring(0, teamMember.indexOf(')') + 1)} 
                    <input id="chBox" type="checkbox"  onChange={(e) => {
                        if(!e.target.checked){
                            deleteFunc(teamMember);
                            return;
                        }
                        pushFunc(teamMember);
                    }}/>
                    </li>
                })}
        </ul>
    )

}


export default ReserveTeamList