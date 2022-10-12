
import firebase from "firebase/app"
import "firebase/auth"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { withdraw_user } from "./signUp"
const MyPage = () => {
    const navigate = useNavigate();
    const tomain = () =>{
        navigate("/");
    }


    const user = firebase.auth().currentUser;

    const [username,setUsername] = useState(); //이름
    const [useremail,setUseremail] = useState(); //이메일
    const [userstuid,setUserstuid] = useState();
    const [userbadpt,setUserbadpt] = useState();
    const [userplaycnt,setUserplaycnt] = useState();
    firebase.firestore().collection("userList").doc(user.uid).get().then((snapshot) => {
        console.log(snapshot.data())
        setUsername(snapshot.data().name)
        setUseremail(snapshot.data().id)
        setUserstuid(snapshot.data().userID)
        setUserbadpt(snapshot.data().badPoint)
        setUserplaycnt(snapshot.data().playCount)
    })
    





    let badPoing_grade = "😄";

    if(userbadpt>20){
        badPoing_grade = "🙂";
        if(userbadpt>40){
            badPoing_grade = "😐";
            if(userbadpt>60){
                badPoing_grade = "😨";
                if(userbadpt>80){
                    badPoing_grade ="🤬";
                }
            }
        }
    }

    return (

        <div>
            <button onClick={tomain}>메인으로</button>
            <h1>마이페이지</h1>
            <div>
                <p>개인정보</p>
                    <ul>
                        <li id="name1">이름: <label>{username}</label> </li> 
                        <li id="email">이메일: <label>{useremail}</label> </li>
                        <li id="email">학번: <label>{userstuid}</label> </li> 
                    </ul>
                <p>비매너온도 : <label>{badPoing_grade}</label></p>

                <p>풋살장 이용횟수 : <label>{userplaycnt}회</label></p>
            </div>
            <div>
                <p>현재 신청내역</p>
                {/* 신청 DB만들면 구축 */}
            </div>
            <div>
                <p>과거 신청내역</p>
            </div>
            <button onClick={()=>{
                withdraw_user();
                alert("회원탈퇴가 되었습니다");
                tomain();
            }}>회원탈퇴</button>
        </div>
    )
}
export default MyPage