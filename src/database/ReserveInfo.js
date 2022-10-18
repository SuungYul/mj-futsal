import firebase from "firebase";
import "firebase/firestore";
import React from "react";
import { addData, getData } from "./firebase";
// import { Timeblock } from "./data";

export class ReserveInfo extends React.Component{
    constructor(){
        super();
        this.day = 0;
        this.time = 17;
    }
    setDay(day){
        this.day = day;
    }
    setTime(time){
        this.time = time;
    }
}

