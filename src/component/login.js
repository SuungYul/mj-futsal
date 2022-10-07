import firebase from "firebase/app";
import "firebase/auth";
import "./login.css"
//로그인 컴포넌트
const Login = () =>{
    return <form>
    <h1>로그인</h1>
    <div className="login">
    <div className="input">
    <div> email : <input type="email" id="signUpEmail" /> </div>
    <div> password : <input type="password" id="signUpPassword" /> </div>
    </div>
    <button type="submit" id="signInButton" onClick ={signIn}>로그인 하기</button>
    </div>
    </form>;
  
}
export default Login

function signIn(e){  //로그인 확인 시 파이어 베이스 프로젝트에 등록되있는 유저 확인용 로그인 기능 구현
    e.preventDefault();
    const signInEmail = document.getElementById('signInEmail').value;
    const signInPassword = document.getElementById('signInPassword').value;
    firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword)
        .then((userCredential) => { //로그인 성공 시 ~~
            // Signed in
            console.log(userCredential)
            const user = userCredential.user;
            // ...
        })
        .catch((error) => { //로그인 실패 시, 실패 메세지 
            console.log('로그인 실패')
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
