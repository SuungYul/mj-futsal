import { render, renderHook } from "@testing-library/react"
import {User} from "../data"
import {getData} from "../firebase"
import firebase from "firebase/app"
import "firebase/auth"
const MyPage = () => {
    const user = firebase.auth().currentUser;
    console.log(user);
    const userInfo = getData("userList",user.uid , "string");
    //console.log(userInfo);
    return (
        <div>
            <h1>마이페이지</h1>
            <div>
                <p>개인정보</p>
                    <ul>
                        <li id="name">이름: </li>
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