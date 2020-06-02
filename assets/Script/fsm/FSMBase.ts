/** 
 * AI做需要用碰撞体忽略玩家
 * 
 * 状态机总机  检测每一帧当前状态的条件 --> 状态类遍历所有的条件类数组里的条件条件 --> 找到符合的条件 --> 通知状态机切换状态
 *  状态列表
 *  当前状态
 *  */

import FSMState from "./FSMState";
import { FSMStateId } from "./common/FSMStateId";
import ClassFactory from "../utils/ClassFactory";
import { IdleState } from "./states/IdleState";
import NoHealthTrigger from "./triggers/NoHealthTrigger";
import { FSMTriggerId } from "./common/FSMTriggerId";
import DeadState from "./states/DeadState";
import AvoidState from "./states/AvoidState";

const {ccclass, property} = cc._decorator;
@ccclass
export default class FSMBase extends cc.Component {

    /** 默认状态id */
    @property({
        type: cc.Enum(FSMStateId),
        tooltip: "默认状态",
        displayName: "默认动作"
    })
    public defaultStateId: FSMStateId = FSMStateId.Idle;

    /** 默认状态 */
    public defaultState: FSMState = null;

    /** 状态列表 */
    public stateList: FSMState[];
    /** 当前状态 */
    private curState: FSMState;

    /** 状态机上的节点下的动画组件 */
    public ani: cc.Animation = null;

    start () {

        this.initComponent();
        this.stateList = [];
        this.configFSM();

        this.initDefault();

    }
    /** 配置状态机 */
    configFSM() {

        let idleState: IdleState = new IdleState();
        let deadState: DeadState = new DeadState();
        let avoidState: AvoidState = new AvoidState();

        /** 添加条件状态映射关系 */
        idleState.addMap(FSMTriggerId.NoHealth,FSMStateId.Dead);
        idleState.addMap(FSMTriggerId.Avoid,FSMStateId.Avoid);

        /*** 将现有的状态加入到状态机数组里面 */
        this.stateList.push(idleState);
        this.stateList.push(avoidState);
        this.stateList.push(deadState);
        
    }

    initComponent() {
        this.ani = this.node.getComponent(cc.Animation);

    }
    initDefault() {
        let self = this;
        let state: FSMState = this.stateList.find((item,index) => {
            if(item.stateId === self.defaultStateId) {
                return true;
            }
        });
        this.defaultState = state;

        this.curState = state;

        /** 进入状态 */
        this.curState ? this.curState.enterState(this) : "";
    }

    public switchState(stateId: FSMStateId) {
        this.curState ? this.curState.existState(this) : "";
        if(stateId === FSMStateId.Default) {
            this.curState = this.defaultState;
        } else {

            /** 切换状态 */
            let state = this.stateList.find((item,index) => {
                if(item.id === stateId) {
                    return true;
                }
            });
            state ? this.curState = state : "";
            
        }
        this.curState ? this.curState.enterState(this) : "";
    }

    update (dt) {
        
        if(this.curState) {
            /** 检测条件 */
            this.curState.check(this);
            /** 执行状态 */
            this.curState.actionState(this);

        }
    }
}
