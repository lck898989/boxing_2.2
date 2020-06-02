import IImpact from "./IImpact";
import SkillData from "../common/SkillData";
const {ccclass, property} = cc._decorator;
@ccclass
export default class DownAttackImpact extends cc.Component implements IImpact {

    public impactRun(node: cc.Node,skillData: SkillData) {
        // 计算伤害
        
    }
}