import FSMState from "../FSMState"
import { FSMStateId } from "../common/FSMStateId";
import FSMBase from "../FSMBase";
import ResourceManager from "../../managers/ResourceManager";
import { ResConfig } from "../../../resconfig";
import Player from "../Player";
import Util from "../../utils/Util";

export default class MiddleState extends FSMState {

    constructor() {
        super();
    }

    public init() { 
        this.id = FSMStateId.Middle;
    }

    /** 进入状态播放动画 */
    public async enterState(fsm: FSMBase) {
        let closeAniArray: string[] = [ResConfig.jump_heavy_boxing_anim.name,ResConfig.jump_heavy_kick_anim.name,ResConfig.jump_light_boxing_anim.name];
        closeAniArray.push(ResConfig.jump_light_kick_anim.name);
        closeAniArray.push(ResConfig.jump_middle_boxing_anim.name); 
        closeAniArray.push(ResConfig.jump_middle_kick_anim.name); 

        let randomAnimIndex = Util.createRandom(0,closeAniArray.length);

        if(fsm.node.group === "enemy") {
            // fsm.node.getComponent(Player).playAnimation(closeAniArray[randomAnimIndex]);
        }
        
    }
    public actionState(fsm: FSMBase) {
        
    }

    public existState(fsm: FSMBase) {

    }
}