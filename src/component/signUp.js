import firebase from "firebase/app";
import "firebase/auth";
import {addData} from"../firebase.js"
import { Link, Route, Routes } from "react-router-dom";
import { User } from "../data";

//회원가입 컴포넌트
const Sign = () =>{ 
    return <form>
    <h1>회원가입</h1>
    <div> 이메일: <input type="email" id="signUpEmail" /> </div>
    <div> 비밀번호 : <input type="password" id="signUpPassword" /> </div>
    <div> 이름<input type="text" id="userName" /> </div>
    <div> 소속팀<input type="text" id="userTeam" /> </div>
    <div> 전화번호<input type="tel" id="telNum" /> </div>
    <div> 학번 <input type="text" id="userID" /></div>
    <button type="submit" id="signUpButton" onClick ={signUp} >회원가입 하기</button>
    <Link to="/login">로그인 하러가기</Link>
    </form>;
  
}
export default Sign
function signUp(e){ //회원가입 버튼 누를 시 유저 객체 생성하고 데이터 베이스에 저장 및 파이어베이스 프로젝트에 유저등록
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const userTeam = document.getElementById('userTeam').value;
    const telNum = document.getElementById('telNum').value;
    const signUpEmail = document.getElementById('signUpEmail').value;
    const signUpPassword = document.getElementById('signUpPassword').value;
    const userID = document.getElementById('userID').value;
    let newUser = new User(signUpEmail, signUpPassword, userName, userTeam, telNum, userID, 0, 0);
    firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword)
        .then((userCredential) => {
            console.log(userCredential)
            const user = userCredential.user; 
            user.updateProfile({
                displayName: newUser.userName //유저 displayName set
                
            })
            addData("userList",user.uid, newUser); 
            console.log(user);
            alert("회원가입 성공!")
        })
        .catch((error) => {
            console.log('error')
            alert('Error')
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
