import {useNavigate} from "react-router-dom"
import "../myPage/myPage.css"

const MyPageBtn = () =>{
    const navigate = useNavigate();
    const tomyPage = () =>{
        // navigate("my-page");
        window.location.replace("/my-page")
    }
    return <button id="mainmypagebtn"
                style={{float : "right"}}
                onClick={tomyPage}>마이페이지</button>
}

export default MyPageBtn