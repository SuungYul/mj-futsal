import { useNavigate } from "react-router-dom"


const ToReserve = () => {
    const navigate = useNavigate();
    const navi =() => {
        navigate("/reserve");
    }
    return (
        <button onClick={navi}>신청</button>
    )
}
export default ToReserve