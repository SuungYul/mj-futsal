import {useNavigate} from "react-router-dom"

const ToMain = () => {
    const navigate = useNavigate();
    const tomain = () =>{
        navigate("/");
    }
    return <><button onClick={tomain}>메인으로</button></>    
} 

export default ToMain