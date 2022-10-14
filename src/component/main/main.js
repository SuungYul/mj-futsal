import React from 'react';
import "./lookUp.css";

const week = ['일','월','화','수','목','금','토'];

export default class Main extends React.Component {
    constructor() {
        super();
        let now = new Date();
        this.dateOfMonth = now.getDate();
        this.startDate = now.getDate();
        console.log('this.dateOfMonth', this.dateOfMonth);
    }

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

    onClicked(dateOfWeek) {
        this.dateOfMonth = dateOfWeek;
        this.forceUpdate();
    }

    calDay(day){
        if(this.isSat(this.today() + day)){
            return "sat"
        }
        else if(this.isSun(this.today() + day)){
            return "sun"
        }
        else{
            return "week"
        }
    }
    getButton(day, dateOfWeek) {
        const selected = this.dateOfMonth === dateOfWeek ? 'selected' : '';
        return (
            <div key={"date" + day }>
                <button className={"day" + dateOfWeek + " " + selected} onClick={() => this.onClicked(dateOfWeek)}>
                    <p>{dateOfWeek}</p>
                    <span id={this.calDay(day)}>{week[(this.today() + day) % 7]}</span>
                </button>
            </div>);
    }

    render() {
        let buttons = [];
        for (let i = 0; i < 7; i++) {
            buttons.push(this.getButton(i, this.startDate + i));
        }   
        return  <div id = "container">
            <h2 id="title">풋살장 예약 현황 조회</h2>
            <div className="weekContainer">
                {buttons}
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
