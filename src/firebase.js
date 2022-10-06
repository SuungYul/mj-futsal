import firebase from "firebase/app";
import "firebase/firestore";
import {User} from "./data.js";

const firebaseConfig = require("./token.json");

//파이어베이스 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/** 
 * 파이어베이스 연결 테스트를 위한 함수
 * @param {string} collection Firestore에 저장된 collection 이름
 *  
 */
function testFunction(collection){
    db.collection(collection).get().then((querySnapshot) => {
        querySnapshot.forEach((doc)=> {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
}

/** 
 * 파이어베이스 스토리지에 데이터를 추가하는 함수
 * @param {string} collection Firestore에 저장된 collection 이름
 * @param {string} document Firestore에 위치한 document 이름
 * @param {ForFirebase} data collection에 추가할 데이터
 */
function addData(collection, document, data){
    db.collection(collection)
      .doc(document)
      .withConverter(data.getConvertor)
      .set(data)
      .then((docRef)=>{
        console.log(`성공적으로 작성했습니다.`);
      })
      .catch((error)=>{
        console.log(`실패\n${error}`)
      });
}

/**
 * 파이어베이스 스토리지에 데이터를 조회하는 함수
 * @param {string} collection Firestore에 저장된 collection 이름
 * @param {string} document Firestore에 위치한 document 이름
 * @param {ForFirebase} type 조회할 문서의 데이터 타입 
 */
function getData(collection, document, type){
    db.collection(collection)
      .doc(document)
      .withConverter(type.getConvertor)
      .get()
      .then((doc) => {
        if(doc.exists){
            let data = doc.data();
            console.log(data);
        }
        else {
            console.log(`문서를 찾을 수 없음`);
        }
      })
      .catch((error) => {
        console.log(`문서를 가져오는데 에러가 있었습니다.\n${error}`);
      })
};

export {testFunction, addData, getData};