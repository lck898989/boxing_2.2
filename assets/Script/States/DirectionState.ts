import {Direction} from "../Game";
import { Hero } from "../Hero";
export default abstract class DirectionState {
    constructor(hero: Hero,dir: Direction) {
        this.hero = hero;
        this.dir = dir;
        this.handleInput();
    }
    public hero: Hero;
    public dir: Direction;
    public abstract handleInput();
}