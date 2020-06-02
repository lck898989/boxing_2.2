/**
 * 
 * 
 * 输入控制类
 * 
 * 
 */

import SkillManager from "../../skillSystem/managers/SkillManager";
import SkillSystem from "../../skillSystem/common/SkillSystem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InputController extends cc.Component {
    private skillSystem: SkillSystem = null;

    onLoad () {
        // 开启物理系统
        // cc.director.getPhysicsManager().enabled = true;
        /** 开启碰撞 */
        cc.director.getCollisionManager().enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);
        this.skillSystem = this.node.getComponent(SkillSystem);

    }
    private keyDown(event: cc.Event.EventKeyboard): void {
        let code = event.keyCode;

        switch(code) {
            case cc.macro.KEY.a:
                if(this.skillSystem) {
                    this.skillSystem.attackUseSkill('波浪拳');
                }
                break;
        }



    }
    private keyUp(event: cc.Event): void {

    }
    start () {

    }
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);
    }

    update (dt) {

    }
}
