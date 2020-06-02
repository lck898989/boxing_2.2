import FSMTrigger from "../FSMTrigger";
import FSMBase from "../FSMBase";
import { FSMTriggerId } from "../common/FSMTriggerId";
import Player from "../Player";
import SkillReleaser from "../../skillSystem/releaser/SkillReleaser";
import SkillManager from "../../skillSystem/managers/SkillManager";
/**
 * 
 * 躲避技能条件
 * 
 */
const {ccclass} = cc._decorator;
@ccclass
export default class AvoidTrigger extends FSMTrigger {
    constructor() {
        super();
    }
    public init() {
        this.id = FSMTriggerId.Avoid;
    }

    public handleTrigger(fsm: FSMBase): boolean {
        let enemies: cc.Node[] = fsm.getComponent(Player).enemyList;
        let res: boolean = false;
        /** 遍历敌人 */
        enemies.forEach((item: cc.Node,index: number) => {
            if(!index) {

                let skillManager: SkillManager = item.getComponent(SkillManager);
                if(skillManager && skillManager.curSkill && skillManager.curSkillNode) {
                    /** 判断技能节点与自己的距离 */
                    let skillPos: cc.Vec2 = skillManager.curSkillNode.convertToWorldSpaceAR(cc.v2(0,0));
                    let myPos: cc.Vec2 = fsm.node.convertToWorldSpaceAR(cc.v2(0,0));
                    if(Math.abs(skillPos.sub(myPos).x) <= 200) {
                        res = true;
                    } else {
                        res = false;
                    }
                }
            }
        });
        return res;
    }
}