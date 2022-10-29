import {useNavigate} from "react-router-dom"
import "./Main.css"
const ToMainBtn = () =>{
    const navigate = useNavigate();
    const ToMain = () =>{
        // navigate("/");
        window.location.replace('/')
    }
    return <button id="ToMainBtn" onClick={ToMain}>MJ FutSal</button>
}

export default ToMainBtn