import DirectionState from "./DirectionState";
import { Hero } from "../Hero";
import { Direction } from "../Game";

export default class DownState extends DirectionState {
    constructor(hero: Hero,dir: Direction) {
        super(hero,dir);
    }
    public handleInput() {
        if(this.hero && (this.dir !== Direction.NONE) && this.dir === Direction.DOWN) {
            
        }
    }
}