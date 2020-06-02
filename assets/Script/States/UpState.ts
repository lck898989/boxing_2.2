import { Direction } from "../Game";
import DirectionState from "./DirectionState";
import { Hero } from "../Hero";

export default class UpState extends DirectionState {
    constructor(hero: Hero,dir: Direction) {
        super(hero,dir);
    }
    // 处理上状态
    public handleInput() {
        if(this.hero && (this.dir !== Direction.NONE) && (this.dir === Direction.UP)) {
            // this.hero.node.getComponent(cc.Animation).play("jump");
            let animCom: cc.Animation = this.hero.node.getComponent(cc.Animation);
            animCom.play("jump");
            animCom.on(cc.Animation.EventType.FINISHED,() => {
                console.log("跳跃播放完毕");
            })
        }
    }
}