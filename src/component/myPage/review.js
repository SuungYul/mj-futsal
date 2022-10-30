import { badPointIncrement, getData } from "../../database/firebase"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { ImStarFull } from "react-icons/im";

const Review = () => {
    const { state } = useLocation() // state= matchKey
    console.log(state);
    const [init, setInit] = useState(false)
    const [init_loop, setLoop] = useState(false)
    const [matchInfo, setMatch] = useState()
    const [day, setDay] = useState()
    const [time, setTime] = useState()
    const [player, setPlayer] = useState([])
    const [userInfo, setUser] = useState([])
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const matchPromise = getData("matchInfo", state, "string")
    const navigate = useNavigate();
    const array = [0, 1, 2, 3, 4]
    useEffect(() => {
        matchPromise.then((doc) => {
            setMatch(doc)
            setDay(doc.day)
            setTime(doc.time)
            setPlayer(doc.allPlayerArray)
            setInit(true)
        })

    }, [])

    if (init) {
        let temp = []
        for (let i = 0; i < player.length && !init_loop; i++) {
            getData("userList", player[i], "string")
                .then((doc) => {
                    // console.log(doc);
                    temp.push(doc)
                    // console.log(temp);
                    if (i === player.length - 1) {
                        setLoop(true)
                        setUser(temp)
                    }
                })
        }
    }

    // const matchInfo = getData("matchInfo", state, "string")
    // console.log(matchInfo);
    let score = clicked.filter(Boolean).length;

    const handleStarClick = index => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
    };




    const result = []
    for (let i = 0; i < userInfo.length; i++) {
        result.push(
            <li key={"list" + i}>{userInfo[i].name + " " + userInfo[i].userID}</li>,
            array.map((el) => (
                <ImStarFull
                    key={el}
                    onClick={() => {
                        handleStarClick(el)
                    }}
                    className={clicked[el] && 'black'}
                    size="35"
                />)),
        )
    }
    // result.push(<input type="" name="text"><label for="text"></label></input>)

    return (
        init ?
            <div>
                <h1>평가</h1>
                <ol>{result}</ol>
                <label for="text">건의사항</label>
                <input type="text" id="text"></input>
                <input type="submit" onClick={()=>{
                    alert("제출했습니다")
                    window.location.replace("/my-page")
                }}></input>
            </div>
            : ""
    )
}
export default Review
