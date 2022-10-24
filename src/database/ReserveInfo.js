import firebase from "firebase";
import "firebase/firestore";
import React from "react";
import { ForFirebase } from "./data";
import { addData, getData } from "./firebase";
// import { Timeblock } from "./data";


export class ReserveInfo extends ForFirebase{
    constructor(props) {
        super(props);
        this.day = 0;
        this.time = 0;
        this.state = {
            day: 0,
            time: 0
        };
        // this.setDay = this.setDay.bind(this);
        // this.setTime = this.setTime.bind(this);
    }

    // componentDidMount() {
    //     this.setstate({
    //         day: 0,
    //         time: 17
    //     })
    // }
    setDay(d) {
        this.day = d;
        console.log(this.day);
    }
    setTime(t) {
        this.time = t
        console.log(this.time);
    }
    // getDay() {
    //     return 
    // }
    // getTime() {
    //     return this.time;
    // }

    // render() {
    //     const {getDay, getTime} = this.state;
    //     return (
    //         <>
    //             <ReserveInfo getDay={this.state.day} />
    //             <ReserveInfo getTime={this.state.time} />
    //             {/* <ReserveInfo setDay={this.setDay} /> */}
    //             {/* <ReserveInfo setTime={this.setTime} /> */}
    //         </>
    //     )
    // }
}

