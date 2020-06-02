import SkillData from "../common/SkillData";

/***
 * 
 * 技能影响效果接口
 * 
 */
export default interface IImpact {
    
    /** 传递一个伤害的对象 */
    impactRun(node: cc.Node,skillData: SkillData): void;
        
}