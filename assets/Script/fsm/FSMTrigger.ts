import { FSMTriggerId } from "./common/FSMTriggerId";
import FSMBase from "./FSMBase";

/** 
 * 
 * 条件类 
 * 
 * */
const {ccclass, property} = cc._decorator;
@ccclass
export default abstract class FSMTrigger extends cc.Component{
    
    public id: FSMTriggerId = FSMTriggerId.None;

    constructor() {
        super();
        this.init();
    }
    /** 初始化条件id */
    public abstract init();

    get gettId(): FSMTriggerId {
        return this.id;
    }
    set setId(id: FSMTriggerId) {
        this.id = id;
    }

    /** 处理条件逻辑方法 */
    public abstract handleTrigger(fsm: FSMBase): boolean;

}