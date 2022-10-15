import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {addData, deleteData} from"../database/firebase.js"
import { Link, Route, Routes } from "react-router-dom";
import { User } from "../database/data";

//회원가입 컴포넌트
const Sign = () =>{ 
    return <form>
    <div className="whole">
        <div className="signup">
            <h1 id="title">회원가입</h1>
            <div className="signup_input">
                <h3>Email</h3><input type="email" id="signUpEmail" placeholder="Email"/>
                <h3>Password</h3><input type="password" id="signUpPassword" placeholder="Password"/> 
                <h3>이름</h3> <input type="text" id="userName" placeholder="이름"/>
                <h3>소속팀</h3><input type="text" id="userTeam" placeholder="소속팀"/>
                <h3>전화번호</h3><input type="tel" id="telNum" placeholder="전화번호"/>
                <h3>학번</h3> <input type="text" id="userID" placeholder="학번"/>
            </div>
            <button type="submit" id="signUpButton" onClick ={signUp} >회원가입 하기</button>
            <button id="gologinbutton"><Link to="/login">로그인 하러가기</Link></button>
        </div>
    </div>
    </form>;
    
  
}
export default Sign
function signUp(e){ //회원가입 버튼 누를 시 유저 객체 생성하고 데이터 베이스에 저장 및 파이어베이스 프로젝트에 유저등록
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const telNum = document.getElementById('telNum').value;
    const signUpEmail = document.getElementById('signUpEmail').value;
    const signUpPassword = document.getElementById('signUpPassword').value;
    const userID = document.getElementById('userID').value;
    let newUser = new User(signUpEmail, signUpPassword, userName, "", telNum, userID, 0, 0);
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


function withdraw_user (){
    const user = firebase.auth().currentUser;
    if(user){
        if(window.confirm("회원탈퇴 하시겠습니까?")){
            deleteData("userList",user.uid);
            user.delete().then(function() { 
				console.log("user 정보 삭제")
			})
            .catch((error) => {
                alert("에러 발생", error)
            });
        }
        else{
            alert("회원탈퇴 취소")
        }
    }
}
export {withdraw_user}