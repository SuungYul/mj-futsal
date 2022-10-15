import firebase from "firebase/app";
import "firebase/auth";
import {getData} from "../../firebase";

const TestBtn = () =>{
    const test = () => {firebase.auth().onAuthStateChanged((user) => {
        if (user) { //로그인 되어 있을 경우
            console.log(user);
            getData("userList",user.uid, "string");
            
        }
        else{

        }
    }) 
    }
    return <div><button onClick={test}>testBtn</button></div>
}

export default TestBtn