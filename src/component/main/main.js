import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Main.css";
import MyReserve from './MyReserve';
import { ReserveInfo } from '../../database/ReserveInfo';
import { getDocs, db, fieldUpdateConvertor, getData } from '../../database/firebase';
import { User } from "../../database/data"
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

    componentDidMount = () => {
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
                <button ref={selected === 'selected' ? this.button : null} className={"day" + dateOfWeek + " " + selected} onClick={() => this.onClicked(dateOfWeek)}>
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
                let numOfTeam = 0;
                for (let r of this.state.totalReserve) { //현재 신청한 팀 수 계산 ()
                    if (r.day === this.dateOfMonth && r.time === time) {
                        numOfTeam += 1;
                    }
                }
                if (this.isLoggedIn) {
                    result.push(<div key={"time" + time} className="reInfo">
                        <button className="reBtn" onClick={() => {
                            if (this.userInfo.currentReserve != null) {
                                if (window.confirm("현재 예약이 되어있습니다. 예약을 변경하시겠습니까?")) {
                                    this.editReserve();
                                    this.reinfo.setTime(time)
                                    this.reinfo.setDay(this.dateOfMonth);
                                    navigate("/reserve", {
                                        state: {
                                            time: this.reinfo.time,
                                            date: this.reinfo.day

                                        },
                                    });
                                }
                            }
                            else{
                                this.reinfo.setTime(time)
                                this.reinfo.setDay(this.dateOfMonth);
                                navigate("/reserve", {
                                    state: {
                                        time: this.reinfo.time,
                                        date: this.reinfo.day

                                    },
                                });
                            }
                        }}>{time + ":00 ~ " + time + ":50"}</button>
                        <span key={time + " " + this.dateOfMonth}>{"현재" + numOfTeam + "팀이 신청하였습니다."}</span>
                    </div>)
                }
                else {
                    result.push(<div key={"time" + time} className="reInfo">
                        {time + ":00 ~ " + time + ":50"} <span key={time + " " + this.dateOfMonth}>{"현재" + numOfTeam + "팀이 신청하였습니다."}</span>
                    </div>)
                }
            }
        }
        else { // 평일 TimeTable
            for (let time = 17; time < 21; time++) {
                let numOfTeam = 0;
                for (let r of this.state.totalReserve) {
                    if (r.day === this.dateOfMonth && r.time === time) {
                        numOfTeam += 1;
                    }
                }
                if (this.isLoggedIn) {
                    result.push(<div key={"time" + time} className="reInfo">
                        <button className="reBtn" value={time} onClick={() => {
                            if (this.userInfo.currentReserve != null) {
                                if (window.confirm("현재 예약이 되어있습니다. 예약을 변경하시겠습니까?")) {
                                    this.editReserve();
                                    this.reinfo.setTime(time);
                                    this.reinfo.setDay(this.dateOfMonth);
                                    console.log(this.reinfo.time);
                                    navigate("/reserve", {
                                        state: {
                                            time: this.reinfo.time,
                                            date: this.reinfo.day

                                        },
                                    });
                                }
                            }
                            else{
                                this.reinfo.setTime(time)
                                this.reinfo.setDay(this.dateOfMonth);
                                navigate("/reserve", {
                                    state: {
                                        time: this.reinfo.time,
                                        date: this.reinfo.day

                                    },
                                });
                            }
                        }}>{time + ":00 ~ " + time + ":50"}</button>
                        <span key={time + " " + this.dateOfMonth}>{"현재" + numOfTeam + "팀이 신청하였습니다."}</span>
                    </div>)
                }
                else {
                    result.push(<div key={"time" + time} className="reInfo">
                        {time + ":00 ~ " + time + ":50"} <span key={time + " " + this.dateOfMonth}>{"현재" + numOfTeam + "팀이 신청하였습니다."}</span>
                    </div>)
                }
            }
        }
        return <div id="timeTable">{result}</div>
    }

    async editReserve() {
        const userInfo = this.userInfo
        // const teamInfo = this.teamInfo

        let docs = await db.collection("reserveList").doc(userInfo.currentReserve).get();
        if (!docs.exists) alert("해당 예약이 존재하지 않습니다 관리자에게 문의해주세요");

        let reserveData = docs.data();

        //개인 신청
        if (reserveData.teamInfo == -1) {
            reserveData.playerArray = reserveData.playerArray.filter(
                (element) => element !== `${userInfo.name}(${userInfo.userID})${userInfo.userKey}`
            );

            console.log(reserveData.playerArray);

            //만약 길이가 0인 경우
            if (reserveData.playerArray.length == 0) {
                let result = await db.collection("reserveList").doc(userInfo.currentReserve).delete();
            }
            else {
                //다시 플레이카운트 산출
                let playCount = 0;
                for (let idx in reserveData.playerArray) {
                    let player = new User();
                    //유저 key만 추출하는 부분
                    let playerKey = reserveData.playerArray[idx].substring(reserveData.playerArray[idx].indexOf(')') + 1);
                    let data = await getData("userList", playerKey, player);
                    playCount += data.playCount;
                }

                reserveData.playCount = playCount /= reserveData.playerArray.length;
                await fieldUpdateConvertor("reserveList", docs.id, reserveData);
            }

        }
        //팀 신청
        else {
            for (let idx in reserveData.playerArray) {
                let player = new User();
                //유저 key만 추출하는 부분
                let playerKey = reserveData.playerArray[idx].substring(reserveData.playerArray[idx].indexOf(')') + 1);
                let data = await getData("userList", playerKey, player);
                data.currentReserve = null;
                await db.collection("userList").doc(playerKey).update({ currentReserve: null });
            }
            let result = await db.collection("reserveList").doc(userInfo.currentReserve).delete();
        }

        await db.collection("userList").doc(userInfo.userKey).update({ currentReserve: null });
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
