import firebase from "firebase/app";
import "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css"
//로그인 컴포넌트a


const Login = () =>{
    const navigate = useNavigate();
    const signIn = e => {  //로그인 확인 시 파이어 베이스 프로젝트에 등록되있는 유저 확인용 로그인 기능 구현
        e.preventDefault();
        const signInEmail = document.getElementById('signInEmail').value;
        const signInPassword = document.getElementById('signInPassword').value;
        firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword)
            .then((userCredential) => { //로그인 성공 시 메인 페이지 이동  (파이어베이스 로그인 토큰 1시간)
                // Signed in
                console.log(userCredential)
                const user = userCredential.user;
                console.log("메인 이동");
                navigate("/");
            })
            .catch((error) => { //로그인 실패 시, 실패 메세지 
                alert('로그인 실패');
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return <form>
        <div className="login">
            <h1 id="title">로그인</h1>
                <div className="login_input">

                    <h3>E-mail</h3>
                    <input type="email" id="signInEmail" placeholder="Email"/>
                    <h3>Password</h3>
                    <input type="password" id="signInPassword" placeholder="Password"/>
                    <button type="submit" id="signInButton" onClick ={signIn}>로그인</button>
                    <hr></hr>
                    <button id="firstButton"><Link to="/signUp">회원가입</Link></button>
                    {/* <button onClick={() => }>회원가입 하러가기</button> */}
                </div> 
        </div>
        </form>;
}
export default Login
