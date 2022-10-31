import { useEffect, useState } from "react"
import { getData, getFindDocs } from "../../database/firebase"
import firebase from "firebase/app";
import "firebase/firestore";
import "./Main.css"
// 나의 신청 현황 구현
const MyReserve = ({ userInfo, isLoggedIn }) => {

    const isLogIn = isLoggedIn
    const play_key = userInfo.currentReserve
    const [day, setDay] = useState()
    const [time, setTime] = useState()
    const [myTeam, setMyTeam] = useState()
    const [playArray, setArray] = useState([])
    // console.log(play_key);
    useEffect( () =>{
        if(play_key){
            const playTeamPromise = getData("reserveList", play_key, "string")
            playTeamPromise.then((doc) => {
                setTime(doc.time)
                setDay(doc.day)
                setMyTeam(doc.teamInfo === -1 ? "개인팀" : doc.teamInfo)
            })
        }
    })

    showReserveTeam(day, time).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data().orderBy("playCount");

            if (!playArray.includes(doc.data().teamInfo)) {
                if (doc.data().teamInfo === -1) {
                    if (!playArray.includes("개인팀")) {
                        setArray([...playArray, "개인팀"])
                    }
                }
                else {
                    setArray([...playArray, doc.data().teamInfo])
                }
            }
        })
    })
    if (!play_key) {
        return
    }
    return (
        <div>
            {isLogIn ?
                <div id="matchInfo">
                    <div id='myreserveTitle'><h2>나의 신청 현황</h2></div>
                    <div>
                        <div className="smallTitle">신청 내역</div><div className="myReserveCont">{day}일 {time}시</div>
                        
                        <div className="smallTitle">신청 팀</div>
                        
                            <ol id="reserveTeamCont">
                                {playArray.map((value, index) => <li key={"player" + index}>{value}</li>)}
                            </ol>
                        
                        <div className="smallTitle">예상 순위</div><div className="myReserveCont">{playArray.indexOf(myTeam) + 1} 순위</div>
                    </div>
                </div> : ""}
        </div>
    )
}

export default MyReserve

function showReserveTeam(day, time) {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("reserveList")
            .where("day", "==", Number(day))
            .where("time", "==", Number(time))
            .orderBy("playCount", "desc")
            .get()
            .then((querySnapshot) => {
                resolve(querySnapshot)
            })
            .catch((error) => {
                reject(error);
            });
    })
}