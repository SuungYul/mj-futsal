import firebase from "firebase/app";
import "firebase/auth";

export function signUp(e){
    console.log("fuck")
    e.preventDefault();
    const signUpEmail = document.getElementById('signUpEmail').value;
    const signUpPassword = document.getElementById('signUpPassword').value;
    firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword)
        .then((userCredential) => {
            console.log(userCredential)
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            console.log('error')
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
  }
export function signIn(e){
    e.preventDefault();
    const signInEmail = document.getElementById('signInEmail').value;
    const signInPassword = document.getElementById('signInPassword').value;
    firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential)
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            console.log('로그인 실패')
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
