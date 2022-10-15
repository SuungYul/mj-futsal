import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "./Main.css";
import ToReserve from './ToReserve';
import TimeTable from '../../database/TimeTable';
import { getData } from '../../database/firebase';
import { Timeblock } from '../../database/data';


const week = ['일', '월', '화', '수', '목', '금', '토'];

export default class Main extends React.Component {
    constructor() {
        super();
        let now = new Date();
        this.dateOfMonth = now.getDate();
        this.startDate = now.getDate();
    }

    today() { // 오늘이 무슨날인지 구해줌 일(0)~토(6)
        let now = new Date();
        return now.getDay();
    }

    isSat(whatday) {
        return whatday % 7 === 6 ? true : false;
    }

    isSun(whatday) {
        return whatday % 7 === 0 ? true : false;
    }

    onClicked(dateOfWeek) {
        this.dateOfMonth = dateOfWeek;
        this.forceUpdate();
    }

    calDay(day) {
        if (this.isSat(this.today() + day)) {
            return "sat"
        }
        else if (this.isSun(this.today() + day)) {
            return "sun"
        }
        else {
            return "week"
        }
    }
    getButton(day, dateOfWeek) {
        const selected = this.dateOfMonth === dateOfWeek ? 'selected' : '';
        return (
            <div key={"date" + day}>
                <button className={"day" + dateOfWeek + " " + selected} onClick={() => this.onClicked(dateOfWeek)}>
                    <p>{dateOfWeek}</p>
                    <span id={this.calDay(day)}>{week[(this.today() + day) % 7]}</span>
                </button>
            </div>);
    }
    // TimeTable를 위한 DB를 구현하고 정보를 읽어와 전달해주고싶은데...
    // 1번 문제 일단 정보가 안넘어감
    // 2번 문제 버튼이 클릭될때마다 DB 작성 호출이 돼서 firebase 사용량이 금방찰듯
    getTimeTableFromDB() {
        TimeTable();
        let startTime = [];
        let endTime = [];
        let arr_return = []
        for (let i = 0; i < week.length; i++) {
            for (let j = 1; j <= 4; j++) {
                const timepromise = getData(week[i], "time" + j, Timeblock)
                timepromise.then((doc) => {
                    startTime.push(doc.startTime);
                    // console.log(startTime.pop());
                    endTime.push(doc.endTime);
                    arr_return.push(
                        { time: startTime.pop() + ":00 ~ " + endTime.pop() + ":00", isReserved: false}
                    )
                })
            }
        }
        return arr_return;
        // console.log(startTime.pop());

        // return [
        //     { time: startTime.pop() + ":00 ~ " + endTime.pop() + ":00", isReserved: false },
        //     { time: '11:00 ~ 12:00', isReserved: true },
        //     { time: '13:00 ~ 14:00', isReserved: false },
        //     { time: '15:00 ~ 16:00', isReserved: false },
        // ]
    }
    // 위에 getTimeTableFromDB 함수에서 받은 정보로 TimeTable을 작성한다
    getTimeTable() {
        const result = [];
        let timeTables = this.getTimeTableFromDB();
        timeTables.forEach((time, i) => {
            result.push(<div key={"tableTable" + i} className="reInfo">{time.time} {time.isReserved ? '' : <ToReserve />}</div>);
        });
        return <div id="timeTable">{result}</div>
    }

    render() {
        let buttons = [];
        for (let i = 0; i < 7; i++) {
            buttons.push(this.getButton(i, this.startDate + i));
        }
        return <div id="container">
            <h2 id="title">풋살장 예약 현황 조회</h2>
            <div className="weekContainer">
                {buttons}
            </div>
            {this.getTimeTable()}
        </div>;
    }
}

