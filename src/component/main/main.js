import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Main.css";
import { ReserveInfo } from '../../database/ReserveInfo'; 

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
        this.isLoggedIn = props.isLoggedIn;
        this.now = new Date();
        this.dateOfMonth = this.now.getDate();
        this.startDate = this.now.getDate();
        this.today = this.now.getDay();
        this.index = 0;
        this.reinfo = new ReserveInfo();
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
        // const { setDay } = this.props;
        this.dateOfMonth = dateOfWeek;
        if (this.dateOfMonth - this.startDate < -7) {
            this.index = this.dateOfMonth - this.startDate + this.maxMonthDay[this.now.getMonth()];
        }
        else {
            this.index = this.dateOfMonth - this.startDate;
        }
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
                <button className={"day" + dateOfWeek + " " + selected} onClick={() => this.onClicked(dateOfWeek)}>
                    <p>{dateOfWeek}</p>
                    <span id={this.calDay(day)}>{week[(this.today + day) % 7]}</span>
                </button>
            </div>);
    }

    getTimeTable() {
        const result = [];
        const { navigate } = this.props;
        // const { setTime } = this.props;
        // 주말 TimeTable
        if (this.isSat(this.today + this.index) || this.isSun(this.today + this.index)) {
            for (let time = 10; time < 20; time++) {
                if (this.isLoggedIn) {
                    result.push(<div key={"time" + time} className="reInfo">
                        {time + ":00 ~ " + time + ":50"}
                        <button className="reBtn" onClick={() => {
                            this.reinfo.setTime(time)
                            this.reinfo.setDay(this.dateOfMonth);
                            navigate("/reserve",  {state: {
                                time: this.reinfo.time,
                                date : this.reinfo.day 
                           
                               },
                             });
                        }}>신청</button>
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
                    result.push(<div key={"time" + time} className="reInfo">
                        {time + ":00 ~ " + time + ":50"}
                        <button className="reBtn" value={time} onClick={() => {
                            
                            this.reinfo.setTime(time);
                            this.reinfo.setDay(this.dateOfMonth);
                            console.log(this.reinfo.time);
                            navigate("/reserve",  {state: {
                               time: this.reinfo.time,
                               date : this.reinfo.day 
                          
                              },
                            });
                        }}>신청</button>
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
        let buttons = [];
        for (let i = 0; i < 7; i++) {
            let j = this.startDate + i
            if (j > this.maxMonthDay[this.now.getMonth()]) {
                j = j - this.maxMonthDay[this.now.getMonth()]
            }
            buttons.push(this.getButton(i, j));
        }
        return <div id="container">
            <h2 id="reservetitle">풋살장 예약 현황</h2>
            <div className="weekContainer">
                {buttons}
            </div>
            {this.getTimeTable()}
        </div>;
    }
}
