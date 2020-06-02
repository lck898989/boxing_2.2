import { Hero, Action } from "./Hero";
/***
 * 
 * 
 * 
 * 多动作游戏demo
 * 实现思路应该是两个状态机，一个负责角色方向移动的状态机，一个负责角色动作动画的状态机，两个状态机组合
 * 
 * 
 */
const {ccclass, property} = cc._decorator;
export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    NONE
}
@ccclass
export class Game extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node) 
    hero: cc.Node = null;
    @property(cc.TiledMap)
    map: cc.TiledMap = null;

    dir: Direction = Direction.NONE;



    onLoad () {
        // 开启物理引擎
        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        // p.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit;
        
    }

    private heroCom: Hero = null;
    start () {
        
        // this.node.on()
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);
        this.heroCom = <Hero>this.hero.getComponent("Hero");
        this.initMap();
    }
    private initMap(): void {
        let roadLayer: cc.TiledLayer = this.map.getLayer("图块层 1");
        let gridSize: cc.Size = roadLayer.getMapTileSize();
        let layerSize: cc.Size = roadLayer.getLayerSize();
        console.log("gridSize is ",gridSize);
        for(let i = 0; i < layerSize.width; i++) {
            for(let j = 0; j < layerSize.height; j++) {
                let tieldItem: cc.TiledTile = roadLayer.getTiledTileAt(i,j,true);
                if(tieldItem.gid !== 0) {
                    // 说明是有障碍物的
                    let nodeItem: cc.Node = tieldItem.node;
                    // 设置碰撞组
                    nodeItem.group = "road";
                    let rgd: cc.RigidBody = nodeItem.addComponent(cc.RigidBody);
                    rgd.type = cc.RigidBodyType.Static;
                    let physicCol: cc.PhysicsBoxCollider = nodeItem.addComponent(cc.PhysicsBoxCollider);
                    physicCol.offset = cc.v2(gridSize.width / 2,gridSize.height / 2);
                    physicCol.size = gridSize;
                    // nodeItem.getComponent()
                    console.log("nodeItem is ",nodeItem);
                    physicCol.apply();
                }
            }
        }
    }
    set Dir(dir: Direction) {
        switch(dir) {
            case Direction.UP:
                this.dir = Direction.UP;
                break;
            case Direction.DOWN:
                this.dir = Direction.DOWN;
                break;
            case Direction.LEFT:
                this.dir = Direction.LEFT;
                break;
            case Direction.RIGHT:
                this.dir = Direction.RIGHT;
                break;
        }
    }
    private onKeyDown(e: cc.Event.EventKeyboard): void {
        switch(e.keyCode) {
            case 37:
                this.Dir = Direction.LEFT;
                break;
            case 38:
                this.Dir = Direction.UP;
                break;
            case 39:
                this.Dir = Direction.RIGHT;
                break;
            case 40:
                this.Dir = Direction.DOWN;
                break;            
        }
        this.heroCom.HeroState = this.dir;

    }
    private keyUp(e: cc.Event.EventKeyboard): void {
        this.Dir = Direction.NONE;
        switch(e.keyCode) {
            case 37:
                let indexLeft: number = this.getDirectionStateIndex(Direction.LEFT);
                if(indexLeft > -1) {
                    this.heroCom.dirStack.splice(indexLeft,1);
                }
                break;
            case 38:
                let indexUp: number = this.getDirectionStateIndex(Direction.UP);
                if(indexUp > -1) {
                    this.heroCom.dirStack.splice(indexUp,1);
                }
                break;
            case 39:
                let indexRight: number = this.getDirectionStateIndex(Direction.RIGHT);
                if(indexRight > -1) {
                    this.heroCom.dirStack.splice(indexRight,1);
                }
                break;
            case 40:
                let indexDown: number = this.getDirectionStateIndex(Direction.DOWN);
                if(indexDown > -1) {
                    this.heroCom.dirStack.splice(indexDown,1);
                }
                break;            
        }
        // this.heroCom.HeroState = this.Dir;
    }
    getDirectionStateIndex(dir: Direction): number {
        let res = -1;
        for(let i = 0; i < this.heroCom.dirStack.length; i++) {
            if(this.heroCom.dirStack[i].dir === dir) {
                res = i;
            }
        }
        return res;
    }
    update (dt) {

    }
}
