import ISkillSelector from "./ISkillSelector";
import SkillData from "../common/SkillData";

export default class SectorSelector extends cc.Component implements ISkillSelector {

    /** 筛选出目标的节点进行攻击 */
    public selectTarget(skillData: SkillData,skillTF: cc.Node): cc.Node[] {
        let res: cc.Node[] = [];
        
        return res;
    }
}