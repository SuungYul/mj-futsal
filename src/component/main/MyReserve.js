import { useEffect, useState } from "react"
import { getData, getFindDocs } from "../../database/firebase"
import firebase from "firebase/app";
import "firebase/firestore";

// 나의 신청 현황 구현
const MyReserve = ({ userInfo, isLoggedIn }) => {
    
    const isLogIn = isLoggedIn
    const play_key = userInfo.playKey
    const [day, setDay] = useState()
    const [time, setTime] = useState()
    const [playArray, setArray] = useState([])
    const playTeamPromise = getData("reserveList", play_key, "string")
    // console.log(play_key);
    playTeamPromise.then((doc) => {
        setTime(doc.time)
        setDay(doc.day)
    })


    let querySnapshot = showReserveTeam(day, time);
    querySnapshot.forEach((doc) => {
        if (!playArray.includes(doc.teamInfo)) {
            console.log(doc.teamInfo);
            setArray([...playArray, doc.teamInfo])
        }
    })

    return (
        <div>
            {isLogIn ? <div id="matchInfo">
                <h2 id='myreserveTitle'>나의 신청 현황</h2>
                <p>{day}일 {time}시</p>
                <div>
                    {playArray}
                </div>
            </div> : ""}
        </div>
    )
}

export default MyReserve

async function showReserveTeam(day, time) {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("reserveList")
            .where("day", "==", Number(day))
            .where("time", "==", Number(time))
            .get()
            .then((querySnapshot) => {
                resolve(querySnapshot)
            })
            .catch((error) => {
                reject(error);
            });


    })
}