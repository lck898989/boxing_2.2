import { FSMStateId } from "./common/FSMStateId";
import { FSMTriggerId } from "./common/FSMTriggerId";
import FSMTrigger from "./FSMTrigger";
import FSMBase from "./FSMBase";
import ClassFactory from "../utils/ClassFactory";
import Player from "./Player";

/**
 * 
 * 状态类
 * 条件类数组
 * 条件映射状态表
 */
const {ccclass, property} = cc._decorator;
@ccclass
export default abstract class FSMState {
    
    public id: FSMStateId = FSMStateId.Idle;

    /** 条件映射状态表 */
    public triggerStateMap: Map<FSMTriggerId,FSMStateId> = new Map<FSMTriggerId,FSMStateId>();
    /** 条件类数组 */
    public triggers: FSMTrigger[];

    constructor() {
        this.triggers = [];
        this.init();

        this.initTriggerStateMap();
    }

    get stateId(): FSMStateId {
        return this.id;
    }
    set stateId(id: FSMStateId) {
        this.id = id;
    }

    /** 子类初始化状态id */
    public abstract init();

    public initTriggerStateMap() {
        /** 添加条件状态映射 */
        this.addMap(FSMTriggerId.Avoid,FSMStateId.Avoid);
        this.addMap(FSMTriggerId.NoHealth,FSMStateId.Dead);
    }

    /*** 状态机调用为映射表和条件列表赋值 */
    public addMap(triggerId: FSMTriggerId,stateId: FSMStateId) {
        let hasId = this.triggerStateMap.has(triggerId);
        
        /** 将数字枚举转换为字符串 */
        let triggerClassName = `${FSMTriggerId[triggerId]}Trigger`;
        let stateClassName = `${FSMStateId[stateId]}State`;

        if(!hasId) {
            this.triggerStateMap.set(triggerId,stateId);
        }
        /** 实例化条件类开始 */

        this.triggers.push(ClassFactory.getClass(triggerClassName));

        /** 实例化条件列结束 */
    }
    
    /** 检查条件符合条件的通知状态机进行切换 */
    public check(fsm: FSMBase) {
        let trigger: FSMTrigger = this.triggers.find((item,index) => {
            if(item && item.handleTrigger && item.handleTrigger(fsm)) {
                /** 得到状态id */
                let stateId = this.triggerStateMap.get(item.id);
                /** 通知状态机切换状态 */
                fsm.switchState(stateId);
                return true;   
            }
        });
        /** 找不到符合条件的状态切换到默认状态 */
        if(!trigger && fsm.node.getComponent(Player).isAnimationOver) {
            fsm.switchState(FSMStateId.Idle);
        }
    }

    /** 进入状态 */
    public enterState(fsm: FSMBase) {
        
    }
    /** 执行状态 */
    public actionState(fsm: FSMBase) {

    }
    /** 退出状态 */
    public existState(fsm: FSMBase) {

    }
}