const ReserveTeamList = ({teamInfo}) =>{
    

    return init? //팀DB 수신 완료 시 대기자 명단으로 li 태그 동적 생성
    <div>
        <ul> 
        {
        waitingArray.map((waiting, index) => {
            console.log(waiting);
            return <li key={index}>{waiting.substring(0,waiting.indexOf(')')+1)} <button onClick={(e) =>{
                accept(waiting);
            }} value={waiting} key={"1"+index}>수락</button>
                <button onClick={(e) =>{
                        refuse(waiting);
                }} value={waiting} key={"2"+index}>거부</button></li>
        })}
        </ul>   
    </div>
    :
    <div>"대기자 불러오는 중."</div>

}