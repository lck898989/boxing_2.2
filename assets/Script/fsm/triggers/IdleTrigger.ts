import FSMTrigger from "../FSMTrigger";
import FSMBase from "../FSMBase";
import { FSMTriggerId } from "../common/FSMTriggerId";
import Player from "../Player";
import SkillReleaser from "../../skillSystem/releaser/SkillReleaser";
import SkillManager from "../../skillSystem/managers/SkillManager";
import { ResConfig } from "../../../resconfig";
/**
 * 
 * 躲避技能条件
 * 
 */
const {ccclass} = cc._decorator;
@ccclass
export default class IdleTrigger extends FSMTrigger {
    constructor() {
        super();
    }
    public init() {
        this.id = FSMTriggerId.Idle;
    }

    public handleTrigger(fsm: FSMBase): boolean {
        let enemies: cc.Node[] = fsm.getComponent(Player).enemyList;
        let res: boolean = false;
        let player = fsm.node.getComponent(Player);

        if(player.isAnimationOver) {
            return true;
        }
        return res;
    }
}