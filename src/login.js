import {firebase} from "./firebase"

document.getElementById('signUpButton').addEventListener('click', (event) => { //로그인 버튼 기능
    event.preventDefault()
    console.log('test@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2')
    
    const signUpEmail = document.getElementById('signUpEmail').value
    const signUpPassword = document.getElementById('signUpPassword').value
    firebase.auth.createUserWithEmailAndPassword(signUpEmail, signUpPassword)
        .then((userCredential) => {
            // event.preventDefault()
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

})
document.getElementById('signInButton').addEventListener('click', (event) => {
    event.preventDefault()
    const signInEmail = document.getElementById('signInEmail').value
    const signInPassword = document.getElementById('signInPassword').value
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

})
