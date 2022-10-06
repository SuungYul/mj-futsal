import logo from './logo.svg';
import './App.css';
import * as sign from "./login.js"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <form>
        <h1>회원가입</h1>
        <div> email : <input type="email" id="signUpEmail" /> </div>
        <div> password : <input type="password" id="signUpPassword" /> </div>
        <button type="submit" id="signUpButton" onClick ={sign.signUp} >회원가입 하기</button>
        <button >로그인 하러 가기</button>
      </form>
      <form>
        <h1>로그인</h1>
        <div> email : <input type="email" id="signInEmail" /> </div>
        <div> password : <input type="password" id="signInPassword" /> </div>
        <button type="submit" id="signInButton" onClick ={sign.signIn}>로그인 하기</button>
        <button >회원가입 하러 가기</button>
      </form>
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
