import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ReserveInfo } from "../../database/ReserveInfo";
import { PlayTeam } from "../../database/data"
import { addData } from "../../database/firebase"
import "./reserve.css"

const OptionProvider = React.createContext();

class CustomComponent extends React.Component{
    constructor(props){
        super(props);
        //비어있는 액션
        this.handleAction = () => {};
        if("action" in this.props) this.handleAction = this.props.action.bind(this);
    }

    getProperty(key){
        if(key in this.props) return this.props[key];
        return null;
    }
}

class Button extends CustomComponent{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <button id={this.getProperty("id")} onClick={this.handleAction}>
                {this.getProperty("name")}
            </button>
        )
    }
}

class CustomRadio extends CustomComponent{
    constructor(props){
        super(props);

        this.state = {
            selectName: this.getProperty("selectName"),
            selectList: this.getProperty("selectList"),
            selectValue: this.getProperty("selectValue")
        };

        this.action = () => {};
        if("action" in this.props) this.action = this.props.action.bind(this);

        this.handleAction = (e) => { 
            this.action();
            this.defaultAction(e); };
    }

    defaultAction(e){
        this.setState({
            selectValue: e.target.value
        });
    }

    render(){
        return this.state.selectList.map((value, i) => (
            <React.Fragment key={i}>
                <input
                    id={value}
                    value={value}
                    name={this.getProperty("name")}
                    type="radio"
                    checked={this.state.selectValue === value}
                    onChange={this.handleAction} />
                    {this.getProperty("selectName")[i]}
            </React.Fragment>
        ));
    }
}

class ConditionRadio extends CustomRadio{
    constructor(props){
        super(props);

        this.condition = () => { return true; };
        if("condition" in this.props) this.condition = this.props.condition.bind(this);
    }

    defaultAction(e){
        if(this.condition()) super.defaultAction(e);
    }
}

class Reserve extends CustomComponent{
    constructor(props){
        super(props);
        //예약을 위한 구체적인 정보
        this.state = {
            userInfo: props.userInfo,
            withOther: false,
            isTeam: false
        }
    }

    reserveAction(){
        console.log("예약 시작");
        //DB에 작성

        const playTeam = new PlayTeam(
            this.state.userInfo.userKey,
            this.state.userInfo.team,
            this.day = "now",
            this.timeSlotID = 0
        )
        
        //예약슬롯에 집어넣기
        //addData("reserveList", "temp", playTeam);
        

        console.log("예약 완료");
        return;
    }

    render(){
        return (
            <OptionProvider.Provider value={this.information}>
            <div id="top_div">
                <div className="frame">
                    <div id="title_3"><h1>풋살장 예약 신청</h1></div>
                    {/* 현재 예약 정보는 예약 DB에서 긁어와야됨 */}
                    <div className="subframe_2">
                        <div className="step"><h1>STEP 1</h1></div>
                        <div class="jb-division-line"></div>
                        <h3 className="choicebox">선택 1</h3>
                        <br />
                        <div className="choice">
                            <CustomRadio 
                                selectName={["다른 팀과 같이 찰래요", "우리끼리만 찰래요"]}
                                selectList={["play_other", "play_team"]} 
                                selectValue={"play_other"}
                                action={()=>{ 
                                    console.log(CustomRadio.selectValue);
                                    if(this.state.withOther === false){
                                        this.setState({ withOther: true });
                                        return;
                                    }
                                    this.setState({ withOther: false });
                                }}
                            />
                        <br />
                        </div>
                        <h3 className="choicebox">선택 2</h3>
                        <br />
                        <div className="choice">
                            <CustomRadio
                                selectName={["개인", "팀"]}
                                selectList={["indv", "team"]} 
                                selectValue={"indv"}
                                action={()=>{ 
                                    if(this.state.isTeam === false){
                                        this.setState({ isTeam: true });
                                        return;
                                    }
                                    this.setState({ isTeam: false });
                                }}
                            />
                        </div>
                        
                        <div className="step"><h1>STEP 2</h1></div>
                        <div class="jb-division-line"></div>
                        <div className="teamlist">
                        <article className={(this.state.isTeam === true) ? "art_team" : "art_indi"}>
                            <h2>팀 명단 작성</h2>
                            {/* 팀 DB 구현되면 작성 */}
                        </article>
                    </div>   
                    </div>
                    < Button name={"예약"} action={()=>{this.reserveAction()}} />
                </div>
                
            </div>
            </OptionProvider.Provider>
        );
    }

}

const TReserve = (props) => {
    const { reserveInfo } = useLocation();
    //reserveInfo&&console.log(reserveInfo);
    const [isTeam, teamCheck] = useState(false);
    const [radio_click, setRadio] = useState(true);
    const clickRB = (e) => {
        if (e.target.id === "team") {
            teamCheck(true)
        }
        else{
            teamCheck(false)
        }
    }
    // const reInfo = new ReserveInfo();
    const radioActive = (event) => {
        if (event.target.id === "play_other") {
            setRadio(false)
            teamCheck(false)
        }
        if (event.target.id === "play_team") {
            setRadio(true)
            teamCheck(true)
        }
        // setRadio()
    }
    return (
        <div id="top_div">
            <div className="frame">
                <div id="title_3"><h1>풋살장 예약 신청</h1></div>
                {/* 현재 예약 정보는 예약 DB에서 긁어와야됨 */}
                <div className="subframe_1"><h2>현재 예약 정보</h2></div>
                    <div>
                        {props.day}  {props.time}
                    </div>
                <div className="subframe_2">
                    <div className="step"><h1>STEP 1</h1></div>
                    <div class="jb-division-line"></div>
                    <h3 className="choicebox">선택 1</h3>
                    <br />
                    <div className="choice">
                        <input
                            type="radio"
                            id="play_other"
                            name="play_check"
                            // value="0"
                            onChange={radioActive}>
                        </input>
                        <label htmlFor="play_other">다른 팀과 같이 찰래요  </label>
                        <br />
                        <input
                            type="radio"
                            id="play_team"
                            name="play_check"
                            // value="1"
                            onChange={radioActive}>
                        </input>
                        <label htmlFor="play_team">우리끼리만 찰래요</label>
                        
                        <br />
                    </div>
                    <h3 className="choicebox">선택 2</h3>
                    <br />
                    <div className="choice">
                        <input
                            type="radio"
                            id="individual"
                            name="ck_team"
                            value={false}
                            disabled={radio_click}
                            // checked={isTeam === fa}
                            onChange={clickRB}
                        >
                        </input>
                        <label htmlFor="individual">개인</label> 
                        <input
                            type="radio"
                            id="team"
                            name="ck_team"
                            value={true}
                            disabled={radio_click && !isTeam}
                            onChange={clickRB}
                            checked={isTeam}
                        >
                        </input>
                        <label htmlFor="team">팀</label>
                    </div>
                    <div className="step"><h1>STEP 2</h1></div>
                    <div class="jb-division-line"></div>
                    <div className="teamlist">
                    <article className={(isTeam === true) ? "art_team" : "art_indi"}>
                        <h2>팀 명단 작성</h2>
                        {/* 팀 DB 구현되면 작성 */}
                    </article>
                    </div>   
                    
                </div>
                < Button name={"헉"} />
            </div>
            
        </div>
    );
}

export default Reserve

