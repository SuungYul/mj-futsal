
import firebase from "firebase/app"
import "firebase/auth"
import { useState } from "react"
import {getData} from "../database/firebase.js"


const MyPage = () => {
    // 
    const user = firebase.auth().currentUser;
    console.log()
    const [username,setUsername] = useState(); //이름
    const [useremail,setUseremail] = useState(); //이메일
    const [userstuid,setUserstuid] = useState();
    const userPromise = getData("userList",user.uid,"string");
    userPromise.then( (doc) => {
        setUsername(doc.name)
        setUseremail(doc.id)
        setUserstuid(doc.userID)
    })
    return (

        <div>
            <h1>마이페이지</h1>
            <div>
                <p>개인정보</p>
                    <ul>
                        <li id="name1">이름: <label>{username}</label> </li> 
                        <li id="email">이메일: <label>{useremail}</label> </li>
                        <li id="email">학번: <label>{userstuid}</label> </li> 
                    </ul>
                <p>비매너온도</p>
                <p>풋살장 이용횟수</p>
            </div>
            <div>
                <p>현재 신청내역</p>
            </div>
            <div>
                <p>과거 신청내역</p>
            </div>
            <button>회원탈퇴</button>
        </div>
    )
}
export default MyPage