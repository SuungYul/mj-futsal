import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Main.css";
import MyReserve from './MyReserve';
import { ReserveInfo } from '../../database/ReserveInfo';
import { getDocs, getDocsByOrderKey, getReserveOrder } from '../../database/firebase';
const week = ['일', '월', '화', '수', '목', '금', '토'];


function isleapYear(year) {
    return new Date(year, 1, 29) === 29;
}

export default function (props) {
    const navigate = useNavigate();
    return <Main {...props} navigate={navigate} />;
}

export class Main extends React.Component {
    constructor(props) {
        super(props);
        const totalReservePromise = getDocs("reserveList");
        console.log("추가");
        totalReservePromise.then((querySnapshot) => {  //모든 playTeamList DB 가져오기 
            querySnapshot.forEach((doc) => {
                this.state.totalReserve.push(doc.data());
            });
        })
        //this.forceUpdate();

        this.isLoggedIn = props.isLoggedIn;
        this.userInfo = props.userInfo;
        this.now = new Date();
        this.dateOfMonth = this.now.getDate();
        this.startDate = this.now.getDate();
        this.today = this.now.getDay();
        this.index = 0;
        this.reinfo = new ReserveInfo();
        this.button = React.createRef()
        if (isleapYear(this.now.getFullYear()))
            this.maxMonthDay = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        else {
            this.maxMonthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        }
        this.state = {
            totalReserve: []   //playTeamList를 담는 배열 
        }

    }

    componentDidUpdate() {
        this.button.current.click()
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
        console.log("dateOfMonth", this.dateOfMonth);
        this.reinfo.setDay(this.index + this.today);
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
                <button ref={selected === 'selected' ? this.button : ""} className={"day" + dateOfWeek + " " + selected} onClick={() => this.onClicked(dateOfWeek)}>
                    <p>{dateOfWeek}</p>
                    <span id={this.calDay(day)}>{week[(this.today + day) % 7]}</span>
                </button>
            </div>);
    }

    getTimeTable() {
        const result = [];
        const { navigate } = this.props;

        if (this.isSat(this.today + this.index) || this.isSun(this.today + this.index)) {
            for (let time = 10; time < 20; time++) {
                if (this.isLoggedIn) {
                    let numOfTeam = 0;
                    for (let r of this.state.totalReserve) { //현재 신청한 팀 수 계산 ()
                        if (r.day === this.dateOfMonth && r.time === time) {
                            numOfTeam += 1;
                        }
                    }
                    result.push(<div key={"time" + time} className="reInfo">
                        {time + ":00 ~ " + time + ":50"}
                        <button className="reBtn" onClick={() => {
                            this.reinfo.setTime(time)
                            this.reinfo.setDay(this.dateOfMonth);
                            navigate("/reserve", {
                                state: {
                                    time: this.reinfo.time,
                                    date: this.reinfo.day

                                },
                            });
                        }}>신청</button>
                        <span key={time + " " + this.dateOfMonth}>{"현재" + numOfTeam // 현재 신청한 team 개수를 보여줌
                            + "팀이 신청하였습니다."}</span>
                    </div>)
                }
                else {
                    result.push(<div key={"time" + time} className="reInfo">
                        {time + ":00 ~ " + time + ":50"}
                    </div>)
                }
            }
        }
        else { // 평일 TimeTable
            for (let time = 17; time < 21; time++) {
                if (this.isLoggedIn) {
                    let numOfTeam = 0;
                    for (let r of this.state.totalReserve) {
                        console.log(r.day, this.dateOfMonth, r.time, time);
                        if (r.day === this.dateOfMonth && r.time === time) {
                            numOfTeam += 1;
                            console.log(numOfTeam);
                        }
                    }
                    result.push(<div key={"time" + time} className="reInfo">
                        {time + ":00 ~ " + time + ":50"}
                        <button className="reBtn" value={time} onClick={() => {
                            this.reinfo.setTime(time);
                            this.reinfo.setDay(this.dateOfMonth);
                            console.log(this.reinfo.time);
                            navigate("/reserve", {
                                state: {
                                    time: this.reinfo.time,
                                    date: this.reinfo.day

                                },
                            });
                        }}>신청</button>
                        <span key={time + " " + this.dateOfMonth}>{"현재" + numOfTeam
                            + "팀이 신청하였습니다."}</span>
                    </div>)
                }
                else {
                    result.push(<div key={"time" + time} className="reInfo">
                        {time + ":00 ~ " + time + ":50"}

                    </div>)
                }
            }
        }
        return <div id="timeTable">{result}</div>
    }

    render() {
        // console.log(this.state.totalReserve);
        let buttons = [];
        for (let i = 0; i < 7; i++) {
            let j = this.startDate + i
            if (j > this.maxMonthDay[this.now.getMonth()]) {
                j = j - this.maxMonthDay[this.now.getMonth()]
            }
            buttons.push(this.getButton(i, j));
        }
        return (
            <div>
                <div id="container">
                    <div id="reserve_container">
                        <h2 id="reservetitle">풋살장 예약 현황</h2>
                        <div className="weekContainer">
                            {buttons}
                        </div>
                        {this.getTimeTable()}
                    </div>
                    {this.isLoggedIn ? <MyReserve userInfo={this.userInfo} isLoggedIn={this.isLoggedIn} /> : ""}
                </div>
            </div>
        )
    }
}
