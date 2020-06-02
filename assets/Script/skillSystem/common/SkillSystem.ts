/**
 * 
 * 封装技能系统，提供简单的技能释放功能
 * 释放技能更方便而已
 * 
 */

import SkillManager from "../managers/SkillManager";
import Util from "../../utils/Util";
import SkillData from "./SkillData";
import SkillReleaser from "../releaser/SkillReleaser";
import Player from "../../fsm/Player";
import { ResConfig } from "../../../resconfig";
import EventManager from "../../managers/EventManager";

const {ccclass, property} = cc._decorator;
@ccclass
 export default class SkillSystem extends cc.Component{

    private skillManager: SkillManager = null;
    private animator: cc.Animation = null;
    private player: Player = null;

    private skillData: SkillData = null;

    private skillName: string = "";

    start() {
        this.skillManager = this.node.getComponent(SkillManager);
        this.animator = this.node.getComponent(cc.Animation);
        this.player = this.node.getComponent(Player);

        this.animator.on('finished',this.animationFinished,this);
    }
    /** 技能动画播放完毕 */
    animationFinished(): void {
        console.log("动画播放完毕");
        this.skillManager.generateSkill(this.skillName);
        
        EventManager.getInstance().dispatchEvent({type: "animation_finish"});
        // if()
        if(!this.player.isDead) {
            let id = setTimeout(() => {
                this.animator.play(ResConfig.wait_anim.name);
                clearTimeout(id);
            },200);
        }
    }
    /** 使用技能攻击(为玩家提供) */
    public attackUseSkill(name: string) {
        this.skillName = name;
        /** 准备技能 */
        this.skillData = this.skillManager.skillDataMap.get(name);
        /** 播放动画 */
        if(this.skillData && !this.skillData.isCool) {
            /** 播放技能动画 */
            this.animator.play(this.skillData.skillAnimationName);
            
        }
        /** 朝向目标 */
   
        /** 生成技能 */
   
        /** 释放器释放技能造成伤害 */
    }

    /** 为npc提供使用技能 */
    public useRandSkill() {
        /** 先筛选出可以释放的技能，再产生随机数 */
        let skillManager: SkillManager = this.node.getComponent(SkillManager);
        /** 准备可用的技能 */
        let skills = skillManager.prepareSkill();
        let random = Util.createRandom(0,skills.length);
        /** 随机技能 */
        let randomSkill: SkillData = skills[random];
        /** 生成技能 */
        skillManager.generateSkill(randomSkill.name);
    }

 }