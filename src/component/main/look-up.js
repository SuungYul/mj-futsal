import $ from 'jquery'
import "./lookUp.css"
import React, { useState } from 'react';
import { Route } from 'react-router-dom';

export default class LookUpComponent extends React.Component {
    today () { // 오늘이 무슨날인지 구해줌 일(0)~토(6)
        let now = new Date();
        return now.getDay();
    }
    
    isSat (whatday) {
        return whatday%7 === 6 ? true : false;
    }
    
    isSun (whatday) {
        return whatday%7 === 0 ? true : false;
    }
    render() {
        console.log(this.props); 
        let now = new Date();
        const week = ['일','월','화','수','목','금','토'];
    
        let dateOfweek = now.getDate();    
        return  <div id = "container">
            <h2 id="title">풋살장 예약 현황 조회</h2>
            <div className="weekContainer">
                <button className="day0" defaultChecked>
                    <p>{dateOfweek}</p>
                    <span id={this.isSat(this.today())? "sat" : this.isSun(this.today()) ? "sun" : "week"}>{week[this.today()%7]}</span>
                </button>
                {/* {document.getElementsByClassName("day0")[0].click()} */}
                <button className="day1">
                    <p>{dateOfweek+1}</p>
                    <span id={this.isSat(this.today()+1)? "sat" : this.isSun(this.today()+1) ? "sun" : "week"}>{week[(this.today()+1)%7]}</span>
                </button>
                <button className="day2">
                    <p>{dateOfweek+2}</p>
                    <span id={this.isSat(this.today()+2)? "sat" : this.isSun(this.today()+2) ? "sun" : "week"}>{week[(this.today()+2)%7]}</span>
                </button>
                <button className="day3">
                    <p>{dateOfweek+3}</p>
                    <span id={this.isSat(this.today()+3)? "sat" : this.isSun(this.today()+3) ? "sun" : "week"}>{week[(this.today()+3)%7]}</span>
                </button>
                <button className="day4">
                    <p>{dateOfweek+4}</p>
                    <span id={this.isSat(this.today()+4)? "sat" : this.isSun(this.today()+4) ? "sun" : "week"}>{week[(this.today()+4)%7]}</span>
                </button>
                <button className="day5">
                    <p>{dateOfweek+5}</p>
                    <span id={this.isSat(this.today()+5)? "sat" : this.isSun(this.today()+5) ? "sun" : "week"}>{week[(this.today()+5)%7]}</span>
                </button>
                <button className="day6">
                    <p>{dateOfweek+6}</p>
                    <span id={this.isSat(this.today()+6)? "sat" : this.isSun(this.today()+6) ? "sun" : "week"}>{week[(this.today()+6)%7]}</span>
                </button>
            </div>
            <div id ="timeTable">
                <div className="reInfo">17:00 ~ 17:50</div>
                <div className="reInfo">18:00 ~ 18:50</div>
                <div className="reInfo">19:00 ~ 19:50</div>
                <div className="reInfo">20:00 ~ 20:50</div>
            </div>
        </div>;    
    }
}




// document.getElementsByClassName("day0")[0].addEventListener('click', function(){
//     if(this.checked){
//         document.getElementsByClassName("day0").click();
//     }
// })

// $('button').on('click', function(){
//     $('button').removeClassName("active");
//     $(this).addClass("active");
// })