import "./lookUp.css"
const LookUp = () =>{ 
    
    return  <div id = "container">
        <h2 id="title">풋살장 예약 현황 조회</h2>
        <div className="weekContainer">
            <button className="mon">월</button>
            <button className="tue">화</button>
            <button className="wed">수</button>
            <button className="thu">목</button>
            <button className="fri">금</button>
            <button className="sat">토</button>
            <button className="sun">일</button>
        </div>
        <div id ="timeTable">
            <div className="reInfo">17:00 ~ 17:50</div>
            <div className="reInfo">18:00 ~ 18:50</div>
            <div className="reInfo">19:00 ~ 19:50</div>
            <div className="reInfo">20:00 ~ 20:50</div>
        </div>
    </div>;
}
export default LookUp

function buttonlistener () {
    
}
