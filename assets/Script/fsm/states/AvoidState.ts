import FSMState from "../FSMState"
import { FSMStateId } from "../common/FSMStateId";
import FSMBase from "../FSMBase";
import ResourceManager from "../../managers/ResourceManager";
import { ResConfig } from "../../../resconfig";
import Player from "../Player";

export default class AvoidState extends FSMState {

    constructor() {
        super();
    }

    public init() { 
        this.id = FSMStateId.Avoid;
    }

    /** 进入状态播放动画 */
    public async enterState(fsm: FSMBase) {
        fsm.node.getComponent(Player).playAnimation(ResConfig.jump_up_anim.name);
        
    }
    public actionState(fsm: FSMBase) {
        
    }

    public existState(fsm: FSMBase) {

    }
}