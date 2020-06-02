import FSMState from "../FSMState";
import { FSMStateId } from "../common/FSMStateId";
import FSMBase from "../FSMBase";
import FSMTrigger from "../FSMTrigger";
import Player from "../Player";
import { ResConfig } from "../../../resconfig";

const {ccclass, property} = cc._decorator;
@ccclass
export class IdleState extends FSMState {
    
    constructor() {
        super();
    }

    public init() {
        this.id = FSMStateId.Idle;
    }

    public enterState(fsm: FSMBase) {
        
        super.enterState(fsm);
        
        fsm.node.getComponent(Player).playAnimation(ResConfig.wait_anim.name);

    }
    public actionState(fsm: FSMBase) {

    }
    public existState(fsm: FSMBase) {

    }
}