import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "./Main.css";
import ToReserve from './ToReserve';
import TimeTable from '../../database/TimeTable';
import { getData } from '../../database/firebase';
import { Timeblock } from '../../database/data';


const week = ['일', '월', '화', '수', '목', '금', '토'];

function isleapYear(year) {
    return new Date(year, 1, 29) === 29;
}

export default class Main extends React.Component {
    constructor(prop) {
        super(prop);
        this.isLoggedIn = prop.isLoggedIn;
        this.now = new Date();
        this.dateOfMonth = this.now.getDate();
        this.startDate = this.now.getDate();
        this.today = this.now.getDay();
        this.index = 0;
        if (isleapYear(this.now.getFullYear()))
            this.maxMonthDay = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        else {
            this.maxMonthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        }
    }

    isSat(whatday) {
        return whatday % 7 === 6 ? true : false;
    }

    isSun(whatday) {
        return whatday % 7 === 0 ? true : false;
    }

    onClicked(dateOfWeek) {
        this.dateOfMonth = dateOfWeek;
        if (this.dateOfMonth - this.startDate < -7) {
            this.index = this.dateOfMonth - this.startDate + this.maxMonthDay[this.now.getMonth()];
        }
        else {
            this.index = this.dateOfMonth - this.startDate;
        }
        this.forceUpdate();
    }

    calDay(day) {
        if (this.isSat(this.today + day)) {
            return "sat"
        }
        else if (this.isSun(this.today + day)) {
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
                    <span id={this.calDay(day)}>{week[(this.today + day) % 7]}</span>
                </button>
            </div>);
    }

    // TimeTable를 위한 DB를 구현하고 정보를 읽어와 전달해주고싶은데...
    // 1번 문제 일단 정보가 안넘어감
    // 2번 문제 버튼이 클릭될때마다 DB 작성 호출이 돼서 firebase 사용량이 금방찰듯
    // getTimeTableFromDB_weekend() {
    //     // TimeTable();
    //     // let startTime = [];
    //     // let endTime = [];
    //     // let arr_return = []
    //     // for (let i = 0; i < week.length; i++) {
    //     //     for (let j = 1; j <= 4; j++) {
    //     //         const timepromise = getData(week[i], "time" + j, Timeblock)
    //     //         timepromise.then((doc) => {
    //     //             startTime.push(doc.startTime);
    //     //             // console.log(startTime.pop());
    //     //             endTime.push(doc.endTime);
    //     //             arr_return.push(
    //     //                 { time: startTime.pop() + ":00 ~ " + endTime.pop() + ":00", isReserved: false}
    //     //             )
    //     //         })
    //     //     }
    //     // }
    //     // return arr_return;
    //     // console.log(startTime.pop());

    //     return [
    //         { time: "10:00 ~ 10:50", isReserved: false },
    //         { time: '11:00 ~ 11:50', isReserved: false },
    //         { time: '12:00 ~ 12:50', isReserved: false },
    //         { time: '13:00 ~ 13:50', isReserved: false },
    //         { time: '14:00 ~ 14:50', isReserved: false },
    //         { time: '15:00 ~ 15:50', isReserved: false },
    //         { time: '16:00 ~ 16:50', isReserved: false },
    //         { time: '17:00 ~ 17:50', isReserved: false },
    //         { time: '18:00 ~ 18:50', isReserved: false },
    //         { time: '19:00 ~ 19:50', isReserved: false },

    //     ]
    // }

    getTimeTableFromDB() {
        return (this.isSat(this.today + this.index) || this.isSun(this.today + this.index)) ?
            [
                { time: "10:00 ~ 10:50", isReserved: !(this.isLoggedIn) },
                { time: '11:00 ~ 11:50', isReserved: !(this.isLoggedIn) },
                { time: '12:00 ~ 12:50', isReserved: !(this.isLoggedIn) },
                { time: '13:00 ~ 13:50', isReserved: !(this.isLoggedIn) },
                { time: '14:00 ~ 14:50', isReserved: !(this.isLoggedIn) },
                { time: '15:00 ~ 15:50', isReserved: !(this.isLoggedIn) },
                { time: '16:00 ~ 16:50', isReserved: !(this.isLoggedIn) },
                { time: '17:00 ~ 17:50', isReserved: !(this.isLoggedIn) },
                { time: '18:00 ~ 18:50', isReserved: !(this.isLoggedIn) },
                { time: '19:00 ~ 19:50', isReserved: !(this.isLoggedIn) },

            ]
            :
            [
                { time: '17:00 ~ 17:50', isReserved: !(this.isLoggedIn) },
                { time: '18:00 ~ 18:50', isReserved: !(this.isLoggedIn) },
                { time: '19:00 ~ 19:50', isReserved: !(this.isLoggedIn) },
                { time: '20:00 ~ 20:50', isReserved: !(this.isLoggedIn) },
            ]

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
            let j = this.startDate + i
            if (j > this.maxMonthDay[this.now.getMonth()]) {
                j = j - this.maxMonthDay[this.now.getMonth()]
            }
            buttons.push(this.getButton(i, j));
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

