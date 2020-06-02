import { ResConfig } from "../../resconfig";
import ResourceManager from "../managers/ResourceManager";
import AnimationManager from "../managers/AnimationManager";
import InputController from "../boxing/controllers/InputController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    /** 敌人列表 */
    @property({type: [cc.Node]})
    public enemyList: cc.Node[] = [];
    /** 英雄的血量 */
    @property({
        type: cc.Integer,
        displayName: "血量",
        min: 0,
        step: 1,
        slide: true,
        max: 2000,
        visible() {
            return true;
        }
    })
    public hp: number = 100;

    /** 基础攻击力 300 即平a造成的伤害 */
    public baseAttack: number = 300;

    /** 法力值 */
    public sp: number = 1000;

    /** 英雄当前的动作动画 */
    private currentAction: cc.AnimationClip = null;

    private animation: cc.Animation = null;

    /** 设置英雄当前动画 */
    public get CurAction() {
        return this.currentAction;
    }
    public set CurAction(action: cc.AnimationClip) {
        this.currentAction = action;
    }
    /** 由具体状态类进行调用 */
    public addAnimation(animation: cc.AnimationClip) {
        /** 为该节点添加动画 */
        AnimationManager.addAnimationByNode(this.node,animation);
    }
    // private addAnimation()
    /** 播放动画 */
    public playAnimation(name: string): cc.AnimationState{
        // let animState: cc.AnimationState = null;
        return this.node.getComponent(cc.Animation).play(name);
    }
    /** 英雄是否死亡 */
    public isDead: boolean = false;

    async onLoad () {
        
    }

    start () {
        this.animation = this.node.getComponent(cc.Animation);

    }

    onDestroy() {
    }
    update (dt) {

    }
}
