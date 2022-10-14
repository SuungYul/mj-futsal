// import $ from 'jquery'
// import "./lookUp.css"
// import { useState } from 'react';
// import { Route } from 'react-router-dom';


// const LookUp = () =>{
//     console.log(this.props); 
//     let now = new Date();
//     const week = ['일','월','화','수','목','금','토'];

//     let dateOfweek = now.getDate();    
//     return  <div id = "container">
//         <h2 id="title">풋살장 예약 현황 조회</h2>
//         <div className="weekContainer">
//             <button className="day0" defaultChecked>
//                 <p>{dateOfweek}</p>
//                 <span id={isSat(today())? "sat" : isSun(today()) ? "sun" : "week"}>{week[today()%7]}</span>
//             </button>
//             {/* {document.getElementsByClassName("day0")[0].click()} */}
//             <button className="day1">
//                 <p>{dateOfweek+1}</p>
//                 <span id={isSat(today()+1)? "sat" : isSun(today()+1) ? "sun" : "week"}>{week[(today()+1)%7]}</span>
//             </button>
//             <button className="day2">
//                 <p>{dateOfweek+2}</p>
//                 <span id={isSat(today()+2)? "sat" : isSun(today()+2) ? "sun" : "week"}>{week[(today()+2)%7]}</span>
//             </button>
//             <button className="day3">
//                 <p>{dateOfweek+3}</p>
//                 <span id={isSat(today()+3)? "sat" : isSun(today()+3) ? "sun" : "week"}>{week[(today()+3)%7]}</span>
//             </button>
//             <button className="day4">
//                 <p>{dateOfweek+4}</p>
//                 <span id={isSat(today()+4)? "sat" : isSun(today()+4) ? "sun" : "week"}>{week[(today()+4)%7]}</span>
//             </button>
//             <button className="day5">
//                 <p>{dateOfweek+5}</p>
//                 <span id={isSat(today()+5)? "sat" : isSun(today()+5) ? "sun" : "week"}>{week[(today()+5)%7]}</span>
//             </button>
//             <button className="day6">
//                 <p>{dateOfweek+6}</p>
//                 <span id={isSat(today()+6)? "sat" : isSun(today()+6) ? "sun" : "week"}>{week[(today()+6)%7]}</span>
//             </button>
//         </div>
//         <div id ="timeTable">
//             <div className="reInfo">17:00 ~ 17:50</div>
//             <div className="reInfo">18:00 ~ 18:50</div>
//             <div className="reInfo">19:00 ~ 19:50</div>
//             <div className="reInfo">20:00 ~ 20:50</div>
//         </div>
//     </div>;
// }
// export default LookUp

// function today () { // 오늘이 무슨날인지 구해줌 일(0)~토(6)
//     let now = new Date();
//     return now.getDay();
// }

// function isSat (whatday) {
//     return whatday%7 === 6 ? true : false;
// }

// function isSun (whatday) {
//     return whatday%7 === 0 ? true : false;
// }

// // document.getElementsByClassName("day0")[0].addEventListener('click', function(){
// //     if(this.checked){
// //         document.getElementsByClassName("day0").click();
// //     }
// // })

// // $('button').on('click', function(){
// //     $('button').removeClassName("active");
// //     $(this).addClass("active");
// // })