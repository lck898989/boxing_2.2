import FSMState from "../FSMState"
import { FSMStateId } from "../common/FSMStateId";
import FSMBase from "../FSMBase";
import ResourceManager from "../../managers/ResourceManager";
import { ResConfig } from "../../../resconfig";
import Player from "../Player";
import Util from "../../utils/Util";

export default class CloseState extends FSMState {

    constructor() {
        super();
    }

    public init() { 
        this.id = FSMStateId.Close;
    }

    /** 进入状态播放动画 */
    public async enterState(fsm: FSMBase) {
        let closeAniArray: string[] = [ResConfig.near_heavy_boxing_anim.name,ResConfig.near_heavy_kick_anim.name,ResConfig.near_light_boxing_anim.name];
        closeAniArray.push(ResConfig.near_light_kick_anim.name);
        closeAniArray.push(ResConfig.near_middle_boxing_anim.name); 
        closeAniArray.push(ResConfig.near_middle_kick_anim.name); 

        let randomAnimIndex = Util.createRandom(0,closeAniArray.length);

        if(fsm.node.group === "enemy") {
            fsm.node.getComponent(Player).playAnimation(closeAniArray[randomAnimIndex]);
        }
        
    }
    public actionState(fsm: FSMBase) {
        
    }

    public existState(fsm: FSMBase) {

    }
}