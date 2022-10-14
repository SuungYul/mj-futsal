import {useNavigate} from "react-router-dom"


const MyPageBtn = () =>{
    const navigate = useNavigate();
    const tomyPage = () =>{
        navigate("my-page");
    }
    return <button 
                style={{float : "right"}}
                onClick={tomyPage}>마이페이지</button>
}

export default MyPageBtn