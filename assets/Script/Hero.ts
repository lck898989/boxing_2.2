
import State from "./States/DirectionState";
import UpState from "./States/UpState";
import RightState from "./States/RightState"
import LeftState from "./States/LeftState";
import { Direction } from "./Game";
import DirectionState from "./States/DirectionState";
import DownState from "./States/RightState";

const {ccclass, property} = cc._decorator;
// 英雄所拥有的的动作
export enum Action {
    STAND,
    RUN,
    JUMP,
    PUSH,
    PULLEY,
    SCALE,
    SLIDE,
    HANG,
    FALL,
    JUMP_DOWN,
    JUMP_FRONT,
    KICK,
    SPAWN
}
@ccclass
export class Hero extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    private _dirState: Direction = Direction.NONE;
    public upSpeed: number = 300;
    public downSpeed: number = 300;
    public rightSpeed: number = 300;
    public leftSpeed: number = 300;

    // 是否已经向上了
    public animOver: boolean = true;

    // private dirStateArr: DirectionState[];
    // 移动方向栈
    public dirStack: DirectionState[] = [];
    
    onLoad () {
        this.dirStack = [];
    }
    set HeroState(state: Direction) {
        this._dirState = state;
        switch(state) {
            case Direction.NONE:

                break;
            case Direction.UP:
                if(!this.hasTheState(state)) {
                    this.dirStack.push(new UpState(this,state));
                }
                break;
            case Direction.DOWN:
                if(!this.hasTheState(state)) {
                    this.dirStack.push(new DownState(this,state));
                }
                break;
            case Direction.LEFT:
                if(!this.hasTheState(state)) {
                    this.dirStack.push(new LeftState(this,state));
                }
                break;
            case Direction.RIGHT:
                if(!this.hasTheState(state)) {
                    this.dirStack.push(new RightState(this,state));
                }
                break;
        }
        
    }
    start () {

    }
    hasTheState(dirstate: Direction): boolean {
        for(let i = 0; i < this.dirStack.length; i++) {
            if(this.dirStack[i].dir === dirstate) {
                return true;
            }
        }
        return false;
    }
    private switchStand(): void {
        this.node.getComponent(cc.Animation).play("stand");
    }
    private switchHang(): void {
        this.node.getComponent(cc.Animation).play("hang");
    }
    update (dt) {
        console.log("dirStack is ",this.dirStack);
        if(this.dirStack.length === 0) {
            this.switchStand();
        }
        for(let i = 0;i < this.dirStack.length; i++) {
            switch(this.dirStack[i].dir) {
                case Direction.NONE:
                    break;
                case Direction.LEFT:
                    this.node.x -= this.leftSpeed * dt;
                    break;    
                case Direction.RIGHT:
                    this.node.x += this.rightSpeed * dt;

                    // this.node.getComponent(cc.Animation).play();
                    break;
                case Direction.UP:
                    if(this.animOver) {
                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,this.upSpeed);
                        // this.isUp = true;
                    }
                    break;
                case Direction.DOWN:
                    // this.node.y -= this.downSpeed * dt;
                    break;            
            }
        }
    }
}
