/***
 * 
 * 
 * 生命值伤害影响类
 * 
 */

import IImpact from "./IImpact";
import SkillData from "../common/SkillData";
import Player from "../../fsm/Player";
const {ccclass, property} = cc._decorator;
@ccclass
export default class DamageImpact extends cc.Component implements IImpact{
    public impactRun(node: cc.Node,skillData: SkillData): void {
        
        /** 释放技能的英雄组件 */
        let playerCom: Player = <Player>skillData.owner.getComponent("Player");

        let damage = skillData.atRatio * playerCom.baseAttack;
        /** 接收攻击的英雄 */
        let myself: Player = <Player>node.getComponent("Player");
        /** 生命值减伤 */
        myself.hp -= damage;

    }
}