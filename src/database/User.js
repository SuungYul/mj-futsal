import firebase from "firebase"
import "firebase/auth"
import { useEffect, useState } from "react"

export default function GetUid() {
    const [user, setUser] = useState();
    useEffect(firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
    }), [user])
    return user ? user.uid : console.log(user);
}