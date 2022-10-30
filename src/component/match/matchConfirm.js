import { getFilteredDocs, fieldUpdate, addDataCreateDoc, addData } from "../../database/firebase";
import {ReserveTeam, MatchInfo, User} from "../../database/data"
import firebase from "firebase/app";


function isWeekend(){ //ex) getDayOfWeek('2022-06-13')
    const d = now.getFullYear().toString()+"-"+(now.getMonth()+1).toString()+"-"+now.getDate().toString();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date(d).getDay()];
    if (dayOfWeek === "토" || dayOfWeek === "일" ){ //주말이면 true
        return true;
    }
    return false;  //아니면 false

}
let now = new Date();
let today = now.getDay();
let reserveList = [];
const todayReservePromise = getFilteredDocs("reserveList", "day", "==", now.getDate());
//const weekReserveList = [];
async function getReserveList(){
    todayReservePromise.then( (querySnapshot) =>{ //오늘자 reserveTeam만 받아오기
        console.log();
        //this.state.totalReserve.push(doc.data());
        querySnapshot.forEach( (doc) =>{
            const rt = doc.data();
            reserveList.push(new ReserveTeam(rt.teamInfo, rt.playerArray, rt.playCount, rt.order, rt.day, rt.time));
        })    
    })
}

async function confirmMatch(){
    getReserveList();
    setTimeout(() => {
        let numOfBlock;
        let startTime;
        isWeekend()? numOfBlock = 10 : numOfBlock = 4;
        isWeekend()? startTime = 10 : startTime = 17;
        const reserveAtTimes = new Array(numOfBlock);
        const matchInfoList = new Array(numOfBlock);

        reserveList = reserveList.filter((r, index) => { //개인 인원이 안되면 없애기 +(개인 자르는 것도 해야댐)
            if (r.teamInfo === -1 && r.countArray < 6){
                return false;
            }
            return true;
        })
        

        for (let i = 0; i < numOfBlock; i++) {//reserveAtTimes의 각 인덱스에 시간 별로 reserveTeam 정보 저장
            let time = startTime + i;
            reserveAtTimes[i] = reserveList.filter( (item, index) =>{
                return item.time === time;
            } ) 
        } 
        for (let i = 0; i < numOfBlock; i++) {
            reserveAtTimes[i].sort((a,b) =>{ //playCount 기준 정렬 -> 후에 mergeSort 이용 하는 것으로 수정 
                return a.playCount - b.playCount
            }) 
            //console.log(reserveAtTimes[i]);
        }
        for (let i = 0; i < numOfBlock; i++) {   //시간대별로 두팀을 선정 하여 matchinfo 생성 하여 matchInfo DB에 저장
            if (reserveAtTimes[i].length < 2){   // 1팀 이하면 pass
                if(reserveAtTimes[i] === 1 && reserveAtTimes[i][0] >= 12){  //1팀 단일 팀 매치
                    console.log();
                }
                continue;
            }
            const selectedTeam1 = (reserveAtTimes[i][0]);
            const selectedTeam2 = (reserveAtTimes[i][1]);
            const allPlayerArray = selectedTeam1.playerArray.concat(selectedTeam2.playerArray);
            matchInfoList[i] = new MatchInfo(selectedTeam1.teamInfo, selectedTeam2.teamInfo, allPlayerArray,
                selectedTeam1.day, selectedTeam1.time, 0);
            addDataCreateDoc("matchInfo", matchInfoList[i]).then( (docRef) =>{ //자동key값을 받아오면 userList에 갱신
                // console.log(docRef.id);
                 matchInfoList[i].setKey(docRef.id);
                // const mPlayerKeys = matchInfoList[i].allPlayerArray;
                 for(let j = 0; j<10; j++){ //j -> playkeys
                    //  fieldUpdate("userList", j.toString(),{currentReserve: ""} ) //currentReserve 초기화
                    //  console.log(matchInfoList[i].matchKey);
                    //  fieldUpdate("userList", j.toString(), {history: firebase.firestore.FieldValue.arrayUnion(matchInfoList[i].matchKey)} )
                 }
            });
        }
        // for(let i = 0; i<12; i++){
        //     addData("userList", i.toString(), new User(0, 0, "wuseong", '', 6019223+i, 2,1,i,'',"asd") )
        // }
        // const pa = [0,1,2,3,4,5,6,7,8,9,10,11]
        // addDataCreateDoc("reserveList", new ReserveTeam("1", pa, 3, 1, 30, 17));
        // const ar = [0,1,2,3,4,5,6,7,8,9,10,11];
       // addDataCreateDoc("matchInfo", new MatchInfo(0,0,ar,30,17));
    }, 2000);
    //평일 이면 reserveTeam 저장 4개
}

function sortReserveBlock(block){
    
}

export {confirmMatch}