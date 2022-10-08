/**
 * 파이어베이스를 위한 클래스
 * 
 * get getConvertor:
 *  Firebase 에서 convertor를 사용하기 위해서 자동화한 함수
 * 
 * get getObject:
 *  ForFirebase의 속성을 제외한 오브젝트 내부의 있는 property를 가져옴
 */
 class ForFirebase{
    toFirestore;
    fromFirestore;
    constructor(){
        this.toFirestore = (obj) => { return this.getObject; };
        this.fromFirestore = (snapshot, options) => {
            const args = snapshot.data(options);
            return this.buildObject(args);
        };
    }

    /**
     * buildObject({...}) 형태의 클래스 생성자
     * @param {object} args 해당 클래스를 생성하기 위한 변수를 가진 {키: 값} 쌍의 오브젝트 
     * @returns {ForFirebase}
     */
    buildObject(args){
        console.log(args);
        let result = new this.constructor();
        for(let key in args) result[key] = args[key];
        return result;
    }

    get getConvertor(){
        return {
            toFirestore: this.toFirestore,
            fromFirestore: this.fromFirestore
        };

    }

    get getObject(){
        let result = {};
        for(let key in this){
            if(key === "toFirestore" || key === "fromFirestore") continue;
            result[key] = this[key];
        }
        return result;
    }
};

/**
 * User 클래스
 * 
 * 임시적으로 User 클래스를 작성함
 */
class User extends ForFirebase{
    constructor(id, pw, name, team, phoneNumber, playCount, badPoint){
        super();
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.team = team;
        this.phoneNumber = phoneNumber;
        this.playCount = playCount;
        this.badPoint = badPoint;
    }
};

export {ForFirebase, User};
