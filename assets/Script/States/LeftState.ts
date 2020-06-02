import DirectionState from "./DirectionState";
import { Hero } from "../Hero";
import { Direction } from "../Game";

export default class LeftState extends DirectionState {
    constructor(hero: Hero,dir: Direction) {
        super(hero,dir);
    }
    public handleInput() {
        if(this.hero && (this.dir !== Direction.NONE) && this.dir === Direction.LEFT) {
            this.hero.node.scaleX = -2;
            this.hero.node.getComponent(cc.Animation).getAnimationState("run").wrapMode = cc.WrapMode.Loop;
            this.hero.node.getComponent(cc.Animation).play("run");
        }
    }
    
}