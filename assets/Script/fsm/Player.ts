import { ResConfig } from "../../resconfig";
import ResourceManager from "../managers/ResourceManager";
import AnimationManager from "../managers/AnimationManager";
import InputController from "../boxing/controllers/InputController";
import SkillSystem from "../skillSystem/common/SkillSystem";

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

    @property({
        type: cc.Node,
        displayName: "技能预制件父节点"
    })
    public skillNode: cc.Node = null;
    /** 技能基准点 */
    @property({
        type: cc.Node,
        displayName: "技能基准点"
    })
    public skillRef: cc.Node = null;
    /** 矩形碰撞组件 */
    private rectCollision: cc.BoxCollider = null;

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

    /** ai所需要的计时器id */
    private timeId: number = -1;

    async onLoad () {
        
    }

    private animationEnd(): void {
        /** 动画播放完毕 */
        this.isAnimationOver = true;
    }
    start () {
        this.animation = this.node.getComponent(cc.Animation);
        this.rectCollision = this.node.getComponent(cc.BoxCollider);

        // this.animation.on("finished",this.animationEnd,this);
        if(this.node.group === "enemy") {
            this.timeId = setInterval(() => {
                if(!this.node.getComponent(InputController)) {
                    let aiSkillSystem = this.node.getComponent(SkillSystem);
                    if(aiSkillSystem) {
                        aiSkillSystem.useRandSkill();
                    }
                }
            },1000);
        }
    }
    
    onDestroy() {
        clearInterval(this.timeId);
    }
    update (dt) {
        if(!this.isAnimationOver) {
            this.rectCollision.size = cc.size(this.node.width,this.node.height);
        }
    }

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        // console.log('on collision enter');
        if((other.node.group === 'player' || other.node.group === "enemey")) {
            
        } else if(other.node.group === "wall") {
            
        }
        
    }
}
