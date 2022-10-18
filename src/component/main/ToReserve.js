import { useNavigate } from "react-router-dom"


const ToReserve = () => {
    const navigate = useNavigate();
    const navi =() => {
        navigate("/reserve");
    }
    return navi()
}
export default ToReserve