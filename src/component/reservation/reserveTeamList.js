const ReserveTeamList = ({teamInfo, userInfo}) =>{
    console.log(teamInfo, userInfo);
    return ( //팀DB 수신 완료 시 대기자 명단으로 li 태그 동적 생성
            <ul> 
            {
            teamInfo.member.map((teamMember, index) => {
                console.log();
                return <li key={index}>{teamMember.substring(0,teamMember.indexOf(')')+1)} <button onClick={(e) =>{
                    // accept(teamMember);
                }} value={teamMember} key={"1"+index}>선택</button>
            </li>
            })}
            </ul>   
    )

}

export default ReserveTeamList