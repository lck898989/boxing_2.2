import FSMTrigger from "../FSMTrigger";
import FSMBase from "../FSMBase";
import { FSMTriggerId } from "../common/FSMTriggerId";
import Player from "../../fsm/Player";

const {ccclass} = cc._decorator;
@ccclass
export default class NoHealthTrigger extends FSMTrigger {
    constructor() {
        super();
    }
    public init() {
        this.id = FSMTriggerId.NoHealth;
    }

    public handleTrigger(fsm: FSMBase): boolean {
        let fsmNode = fsm.node;
        let playCom: Player = fsmNode.getComponent("Player");

        if(playCom.hp <= 0) {
            return true;
        } else {
            return false;
        }
    }
}