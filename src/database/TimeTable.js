import firebase from "firebase";
import "firebase/firestore";
import React from "react";
import { addData, getData } from "./firebase";
import { Timeblock } from "./data";

export default function TimeTable() {
    const weekday = ["월", "화", "수", "목", "금"];
    const timeOfweekday = ["time1", "time2", "time3", "time4"]
    const weekend = ["토", "일"];
    const timeOfweekend = ["time1", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10"]

    for (let i = 0; i < weekday.length; i++) {
        for (let j = 0; j < timeOfweekday.length; j++) {
            let data = new Timeblock(timeOfweekday[j], 17 + j, 18 + j);
            addData(weekday[i], timeOfweekday[j], data)
        }
    }
    for (let i = 0; i < weekend.length; i++) {
        for (let j = 0; j < timeOfweekend.length; j++) {
            let data = new Timeblock(timeOfweekend[j], 10 + j, 11 + j);
            addData(weekend[i], timeOfweekend[j], data)
        }
    }
}

