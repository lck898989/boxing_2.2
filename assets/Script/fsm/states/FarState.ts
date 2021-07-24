import FSMState from "../FSMState"
import { FSMStateId } from "../common/FSMStateId";
import FSMBase from "../FSMBase";
import ResourceManager from "../../managers/ResourceManager";
import { ResConfig } from "../../../resconfig";
import Player from "../Player";
import Util from "../../utils/Util";
import SkillSystem from "../../skillSystem/common/SkillSystem";

export default class FarState extends FSMState {

    constructor() {
        super();
    }

    public init() { 
        this.id = FSMStateId.Far;
    }

    /** 进入状态播放动画 */
    public async enterState(fsm: FSMBase) {
        

        if(fsm.node.group === "enemy") {
            let aiSkillSystem = fsm.node.getComponent(SkillSystem);
            if(aiSkillSystem) {
                aiSkillSystem.useRandSkill();
            }
        }
        
    }
    public actionState(fsm: FSMBase) {
        
    }

    public existState(fsm: FSMBase) {

    }
}