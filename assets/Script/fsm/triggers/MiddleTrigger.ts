import FSMTrigger from "../FSMTrigger";
import FSMBase from "../FSMBase";
import { FSMTriggerId } from "../common/FSMTriggerId";
import Player from "../Player";
import SkillReleaser from "../../skillSystem/releaser/SkillReleaser";
import SkillManager from "../../skillSystem/managers/SkillManager";
/**
 * 
 * 近距离释放技能条件
 * 
 */
const {ccclass} = cc._decorator;
@ccclass
export default class MiddleTrigger extends FSMTrigger {
    constructor() {
        super();
    }
    public init() {
        this.id = FSMTriggerId.Middle;
    }

    public handleTrigger(fsm: FSMBase): boolean {
        let enemies: cc.Node[] = fsm.getComponent(Player).enemyList;
        let res: boolean = false;
        /** 遍历敌人 */
        enemies.forEach((item: cc.Node,index: number) => {
            if(!index) {
                /** 敌人的坐标位置 */
                let enemyLocation: cc.Vec2 = item.parent.convertToWorldSpaceAR(item.getPosition());
                let myselfLocation: cc.Vec2 = fsm.node.parent.convertToWorldSpaceAR(fsm.node.getPosition());
                // console.log("距离 is ",myselfLocation.x - enemyLocation.x);
                if(Math.abs(myselfLocation.x - enemyLocation.x) > 150 && Math.abs(myselfLocation.x - enemyLocation.x) < 300) {
                    res = true;
                }
            }
        });
        return res;
    }
}