import {getData} from "../../database/firebase.js"
import "./lookUp.css"
const LookUp = () =>{ 
    
    return  <div id = "container">
        <h2>풋살장 예약 현황 조회</h2>
        <div className="weekContainer">
            <div className="week">월</div>
            <div className="week">화</div>
            <div className="week">수</div>
            <div className="week">목</div>
            <div className="week">금</div>
            <div className="week">토</div>
            <div className="week">일</div>
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