const {ccclass, property} = cc._decorator;

@ccclass
export default class BackGroundAdapter extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 
        if(cc.sys.isMobile) {
            // console.log();
            let minScale: number = Math.min(cc.view.getCanvasSize().width / this.node.width,cc.view.getCanvasSize().height / this.node.height);
            let realwidth = minScale * this.node.width;
            let realheight = minScale * this.node.height;
            // console.log("bgSize is ",bgSize," and nodeszie is ",this.node.width,this.node.height);
            // 获取最大的宽高比再一次设置他
            this.node.scale = Math.max(cc.view.getCanvasSize().width / realwidth,cc.view.getCanvasSize().height / realheight);
        }

    }

    start () {

    }

    update (dt) {

    }
}
