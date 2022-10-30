import "firebase/firestore";
import { ForFirebase } from "./data";


export class ReserveInfo extends ForFirebase {
    constructor(props) {
        super(props);
        this.day = 0;
        this.time = 0;
        this.state = {
            day: 0,
            time: 0
        };
    }
    setDay(d) {
        this.day = d;
    }
    setTime(t) {
        this.time = t
    }
    
}

