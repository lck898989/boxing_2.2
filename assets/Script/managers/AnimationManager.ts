export default class AnimationManager {

    /** 为某一个节点添加动画 */
    public static addAnimationByNode(node: cc.Node,animationClip: cc.AnimationClip) {
        let animationCom: cc.Animation = node.getComponent(cc.Animation);
        if(animationCom) {
            let res = animationCom.getClips().filter((item,index) => {
                if(item && item.name === animationClip.name) {
                    return true;
                } else {
                    return false;
                }
            });
            if(res.length === 0) {
                // 加入动画
                animationCom.addClip(animationClip);
            }
        }
    }

    /** 查询节点身上有没有该动画 */
    public static hasAnimation(node: cc.Node,name: string): boolean {
        let animCom: cc.Animation = node.getComponent(cc.Animation);

        let clips: cc.AnimationClip[] = animCom.getClips();

        for(let clip of clips) {
            if(clip.name === name) {
                return true;
            }
        }
        return false;
    }
}