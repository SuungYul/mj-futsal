import {useNavigate} from "react-router-dom"

const myPageBtn = () =>{
    const navigate = useNavigate();
    const tomyPage = () =>{
        navigate("myPage");
    }
    return <button onClick={tomyPage}>마이페이지</button>
}

export default myPageBtn