import { getFilteredDocs, fieldUpdate, addDataCreateDoc, addData, getData } from "../../database/firebase";
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
            reserveList.push(new ReserveTeam(rt.teamInfo, rt.playerArray, rt.playCount, rt.day, rt.time, rt.order, rt.withOther));
        })    
    })
}

async function confirmMatch(){
    getData("userList",)
    getReserveList();
    setTimeout(async () => { //데이터 받아오면 실행
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
        console.log(reserveAtTimes);
        //sortIndividual(["a","b","c",]);
        for (let i = 0; i < numOfBlock; i++) {//reserveAtTimes의 각 인덱스에 시간 별로 reserveTeam 정보 저장
            for(let j = 0; j<reserveAtTimes[i].length; j++ ){ //각 시간에 개인팀을 찾아 8명씩 잘라서 new reserveTeam을 만들어 각 reserveAtTimes[i]에 넣기
                if(reserveAtTimes[i][j].teamInfo === -1){
                    //모든 player 키 값주고, 유저데이터 불러와 유저 만든 뒤, playCount로 정렬, 6명씩 잘라서 팀 만들어 넣어주기 
                    console.log(reserveAtTimes[i][j].playerArray)
                    const keyArray = reserveAtTimes[i][j].playerArray;
                    const playerArray = new Array();
                    const tempTime = reserveAtTimes[i][0].time;
                    const tempDay = reserveAtTimes[i][0].day;
                    
                    reserveAtTimes[i].pop();
                    for(let l = 0; l<keyArray.length; l++){
                        getData("userList", keyArray[l].toString(), "string")
                        .then( (doc) =>{ //각각의 유저키에 접근
                           playerArray.push(new User(null, null, null, null, null, doc.playCount, null, doc.userKey, null, null));        
                        })
                    }
                    setTimeout(() => {
                        playerArray.sort( (a,b) =>{
                            return a.playCount - b.playCount;
                         })
                        console.log(playerArray);
                        for(let k = 0; k < playerArray.length/6; k++ ){ //정렬된 playerArray 잘라 팀만들기 
                            const tempPlyerArray = playerArray.slice(k*6,(k+1)*6);
                            console.log(tempPlyerArray);
                            let tempCount = 0;
                            let tempKeys = [];
                            for(const ar of tempPlyerArray){
                                tempKeys.push(ar.userKey);
                                tempCount += ar.playCount;
                            }
                            tempCount /= 6;
                            reserveAtTimes[i].push(new ReserveTeam("개인팀"+k, tempKeys, tempCount, tempDay, tempTime, null, true) )
                            console.log(reserveAtTimes[i]);   

                            
                        }   
                    }, 2000);
                }
            } 
            //return item.time === time;
        } 
        setTimeout(() => {
            for (let i = 0; i < numOfBlock; i++) {
                reserveAtTimes[i].sort((a,b) =>{ //playCount 기준 정렬 -> 후에 mergeSort 이용 하는 것으로 수정 
                    return a.playCount - b.playCount
                }) 
            }
            for (let i = 0; i < numOfBlock; i++) {   //시간대별로 두팀을 선정 하여 matchinfo 생성 하여 matchInfo DB에 저장
                if(i === 8){
                    console.log(reserveAtTimes[i]);
                    console.log(reserveAtTimes[i].length);
                }
                if (reserveAtTimes[i].length < 2){   // 1팀 이하일 경우
                    if(reserveAtTimes[i].length === 1 && reserveAtTimes[i][0].withOther){  //1팀 단일 팀 매치
                        console.log(reserveAtTimes[i]);
                        matchInfoList[i] = new MatchInfo(reserveAtTimes[i][0].teamInfo, null, reserveAtTimes[i][0].playerArray,
                        reserveAtTimes[i][0].day, reserveAtTimes[i][0].time);
                        console.log(matchInfoList[i]);
                        addDataCreateDoc("matchInfo", matchInfoList[i]).then( (docRef) =>{ //자동key값을 받아오면 userList에 갱신
                            const mPlayerKeys = matchInfoList[i].allPlayerArray;
                            for(let j = 0; j<10; j++){ //j -> playkeys
                                fieldUpdate("userList", j.toString(),{currentReserve: ""} ) //currentReserve 초기화
                                fieldUpdate("userList", j.toString(), {history: firebase.firestore.FieldValue.arrayUnion(docRef)} )
                            }
                        });
                    }
                    continue; //매칭인데 1팀이하면 pass
                } 
                else{ //2팀 이상일 경우
                    const selectedTeam1 = (reserveAtTimes[i][0]); //count가 적은 reserveTeam 2팀 저장
                    const selectedTeam2 = (reserveAtTimes[i][1]);  
                    console.log(selectedTeam1, selectedTeam2);
                    if (!selectedTeam1.withOther){ //1순위가 우리끼리만 차는 경우
                        console.log(1);
                        matchInfoList[i] = new MatchInfo(selectedTeam1.teamInfo, null, selectedTeam1.playerArray,
                        selectedTeam1.day, selectedTeam1.time);
                    }
                    else if(!selectedTeam2.withOther && reserveAtTimes[i].length > 2){ //2순위가 우리끼리만 차고, 3순위가 있을 경우 1,3순위가 참
                        console.log(2);
                        const selectedTeam3 = reserveAtTimes[i][2];  
                        const allPlayerArray = selectedTeam1.playerArray.concat(selectedTeam3.playerArray);
                        matchInfoList[i] = new MatchInfo(selectedTeam1.teamInfo, selectedTeam3.teamInfo, allPlayerArray,
                        selectedTeam1.day, selectedTeam1.time);
                    }
                    else if(!selectedTeam2.withOther && reserveAtTimes[i].length == 2){//2순위가 우리끼리만 차고, 후순위가 없을 경우 2순위가 참
                        console.log(3);
                        matchInfoList[i] = new MatchInfo(selectedTeam2.teamInfo, null, selectedTeam2.playerArray,
                            selectedTeam2.day, selectedTeam2.time);
                    }
                    else { //나머지.. 1순위도 매칭, 그 후순위도 매칭일경우
                        console.log(4);
                        const allPlayerArray = selectedTeam1.playerArray.concat(selectedTeam2.playerArray);
                        matchInfoList[i] = new MatchInfo(selectedTeam1.teamInfo, selectedTeam2.teamInfo, allPlayerArray,
                        selectedTeam1.day, selectedTeam1.time);
                    }
                    console.log('ss');
                    addDataCreateDoc("matchInfo", matchInfoList[i]).then( (docRef) =>{ //자동key값을 받아오면 userList에 갱신
                        const mPlayerKeys = matchInfoList[i].allPlayerArray;
                        for(let j = 0; j < mPlayerKeys.length; j++){ //j -> playkeys
                            fieldUpdate("userList", mPlayerKeys[j].toString(),{currentReserve: null} ) //currentReserve 초기화
                            fieldUpdate("userList", mPlayerKeys[j].toString(), {history: firebase.firestore.FieldValue.arrayUnion(docRef.id)} )
                        }
                    });
                }
            }
        }, 5000);
    }, 2000);
    //평일 이면 reserveTeam 저장 4개
}
    

export {confirmMatch}