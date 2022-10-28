import { useEffect, useState } from "react"
import { getData, getFindDocs } from "../../database/firebase"
import firebase from "firebase/app";
import "firebase/firestore";

// 나의 신청 현황 구현
const MyReserve = ({ userInfo, isLoggedIn }) => {
    // useEffect(()=>{
    //     // window.location.replace("/")
    // });
    // const db = firebase.firestore();
    // console.log(userInfo);
    const isLogIn = isLoggedIn
    const play_key = userInfo.playKey
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const playArray = []
    const playTeamPromise = getData("playTeamList", play_key, "string")
    // console.log(play_key);
    playTeamPromise.then((doc) => {
        setTime(doc.time)
        setDate(doc.date)
    })

    firebase.firestore().collection("playTeamList").where("date","==",date).get()
        .then((querySnapshot) => {
            console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                playArray.push(doc.data().playTeam)
                // console.log(playArray.lengt)
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    const returnArr = () => {
        // const result = []
        // console.log("여기까진 오냐?");
        if (playArray.length === 0) {
            return <div>팀이 없네요!</div>
        }
        return ( //팀DB 수신 완료 시 대기자 명단으로 li 태그 동적 생성
            <ul>
                {
                    playArray.map((playTeam, index) => {
                        // console.log();
                        return <li key={index}>{playTeam}</li>
                    })
                }
            </ul>
        )
    }

    return (
        <div>
            {isLogIn ? <div id="matchInfo">
                <h2 id='myreserveTitle'>나의 신청 현황</h2>
                <p>{date}일 {time}시</p>
                <div>
                    {returnArr()}
                </div>
            </div> : ""}
        </div>
    )
}

export default MyReserve