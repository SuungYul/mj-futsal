import firebase from "firebase";
import "firebase/firestore";
import React from "react";
import { addData, getData } from "./firebase";
// import { Timeblock } from "./data";

export default class ReserveInfo extends React.Component {
    constructor(props) {
        super(props);
        this.day = 0;
        this.time = 17;
        this.state = {
            day: 0,
            time: 17
        };
        // this.setDay = this.setDay.bind(this);
        // this.setTime = this.setTime.bind(this);
    }

    componentDidMount() {
        this.setstate({
            day: 0,
            time: 17
        })
    }
    setDay(d) {
        this.setState({
            day: d
        })
        console.log(this.day);
    }
    setTime(t) {
        this.setState({
            time: t
        })
        console.log(this.time);
    }
    // getDay() {
    //     return 
    // }
    // getTime() {
    //     return this.time;
    // }

    render() {
        // const {getDay, getTime} = this.state;
        return (
            <>
                <ReserveInfo getDay={this.state.day} />
                <ReserveInfo getTime={this.state.time} />
                {/* <ReserveInfo setDay={this.setDay} /> */}
                {/* <ReserveInfo setTime={this.setTime} /> */}
            </>
        )
    }
}

