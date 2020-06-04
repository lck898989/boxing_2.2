/**
 * 
 * 
 * 输入控制类
 * 
 * 
 */

import SkillManager from "../../skillSystem/managers/SkillManager";
import SkillSystem from "../../skillSystem/common/SkillSystem";
import Player from "../../fsm/Player";
import { ResConfig } from "../../../resconfig";

const {ccclass, property} = cc._decorator;
const MOVESPEED = 150;
@ccclass
export default class InputController extends cc.Component {
    private skillSystem: SkillSystem = null;
    private player: Player = null;

    /** 横向移动速度 */
    private moveSpeed: number = 0;

    private canvas: cc.Node = null;
    onLoad () {
        // 开启物理系统
        // cc.director.getPhysicsManager().enabled = true;
        /** 开启碰撞 */
        cc.director.getCollisionManager().enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);
        this.skillSystem = this.node.getChildByName("player").getComponent(SkillSystem);

        this.player = this.node.getChildByName("player").getComponent(Player);

        this.canvas = cc.find("Canvas");
        

    }
    private keyDown(event: cc.Event.EventKeyboard): void {
        let code = event.keyCode;

        switch(code) {
            case cc.macro.KEY.a:
                if(this.skillSystem && this.player.isAnimationOver) {
                    this.skillSystem.attackUseSkill('波浪拳');
                }
                break;
            case cc.macro.KEY.up:
                if(this.player.isAnimationOver) {
                    this.player.playAnimation(ResConfig.jump_up_anim.name);
                }
                break;    
            case cc.macro.KEY.down:
                if(this.player.isAnimationOver) {
                    this.player.playAnimation(ResConfig.stand_crouch_defense_anim.name);
                }
                break;    
            case cc.macro.KEY.left:
                console.log("x is ",this.player.node.x);
                this.moveSpeed = -MOVESPEED;
                break;
            case cc.macro.KEY.right:
                this.moveSpeed = MOVESPEED;
                break;        
        }



    }
    private keyUp(event: cc.Event.EventKeyboard): void {
        let code = event.keyCode;
        switch(code) {
            case cc.macro.KEY.up:
                break;    
            case cc.macro.KEY.down:
                break;    
            case cc.macro.KEY.left:
                this.moveSpeed = 0;
                break;
            case cc.macro.KEY.right:
                this.moveSpeed = 0
                break;        
        }
    }
    start () {

    }
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);
    }

    update (dt) {
        
        this.node.x += this.moveSpeed * dt;

        if(this.node.x <= -280) {
            this.node.x = -280;
        } else if(this.node.x >= 280) {
            this.node.x = 280;
        }
    }
}
