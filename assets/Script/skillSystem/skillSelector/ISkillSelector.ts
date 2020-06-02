/**

技能选区类

**/

import SkillData from "../common/SkillData";

export default interface ISkillSelector {
    /**
     * @param  {SkillData} skillData 技能数据
     * @param  {cc.Node} skillTF 技能释放的位置
     * @returns cc
     */
    selectTarget(skillData: SkillData,skillTF: cc.Node): cc.Node[];
    
}