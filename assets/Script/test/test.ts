

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({type: cc.Node})
    testNode: cc.Node = null;

    start () {
        let testSNode: cc.Node = this.testNode.getChildByName("testS");
        /** testNode的世界坐标 */
        let testWorld: cc.Vec2 = this.testNode.parent.convertToWorldSpaceAR(this.testNode.getPosition());
        console.log("testWorld is ",testWorld);
        /** testSNode所在的世界坐标 */
        let worldTestS: cc.Vec2 = this.testNode.convertToWorldSpaceAR(testSNode.getPosition());
        console.log("worldTestS is ",worldTestS);
    }

}
