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
    public playAnimation(name: string): cc.AnimationState {
        let state: cc.AnimationState = null;
        state = this.node.getComponent(cc.Animation).play(name);

        if(state.wrapMode !== cc.WrapMode.Loop) {
            this.isAnimationOver = false;
        }
        return state;
    }
    /** 英雄是否死亡 */
    public isDead: boolean = false;
    /** 动画是否播放完毕 */
    public isAnimationOver: boolean = true;

    async onLoad () {
        
    }

    private animationEnd(): void {
        /** 动画播放完毕 */
        this.isAnimationOver = true;
    }
    start () {
        this.animation = this.node.getComponent(cc.Animation);
        // this.animation.on("finished",this.animationEnd,this);
    }
    
    onDestroy() {
    }
    update (dt) {
        if(this.node.y > -121) {
            
        }
    }
}
