import FSMState from "../FSMState"
import { FSMStateId } from "../common/FSMStateId";
import FSMBase from "../FSMBase";
import ResourceManager from "../../managers/ResourceManager";
import { ResConfig } from "../../../resconfig";
import Player from "../Player";

export default class DeadState extends FSMState {

    constructor() {
        super();
    }

    public init() { 
        this.id = FSMStateId.Dead;
    }

    /** 进入状态播放动画 */
    public async enterState(fsm: FSMBase) {
        fsm.node.getComponent(Player).playAnimation(ResConfig.fall_down_anim.name);
        fsm.getComponent(Player).isDead = true;
        
        /** 禁用状态机 */
        fsm.enabled = false;
    }
    public actionState(fsm: FSMBase) {
        
    }

    public existState(fsm: FSMBase) {

    }
}