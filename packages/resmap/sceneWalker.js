module.exports = {
    /** 自动绑定动画 */
    'autoBindAnim': async (event,params) => {
        let dir = params.dir;
        let projectPath = Editor.Project.path + "/assets";
        if(dir) {
            let resPath = dir;
            let uuids = await new Promise((resole,reject) => {

                Editor.Ipc.sendToMain("resmap:query_animDir",{dir: resPath},(res) => {
                    if(!res) {
                        reject();
                        return;
                    }
                    resole(res);
                })

            });

            /** 将该动画添加到选中的节点上 */
            let selectNodeUuid = Editor.Selection.curSelection('node');

            let node = cc.engine.getInstanceById(selectNodeUuid);
            Editor.log("node is ",node);
            
            Editor.log("uuids's length is ",uuids.length);
            let i = 0;
            let animCom = node.getComponent(cc.Animation);
            animCom._clips = [];
            let clips = animCom.getClips();
            
            for(let uuid of uuids) {
                await new Promise((resolve,reject) => {
                    cc.loader.load({type: 'uuid',uuid},(err,res) => {
                        if(err) {
                            reject();
                            return;
                        }
                        Editor.log("res is ",res);
                        if(animCom) {
                            if(!(clips.indexOf(res) >= 0)) {

                                clips.push(res);
                            }
                        } else {
                            Editor.error("请先在该节点上添加动画组件");
                            
                        }
                        resolve();
                    });
                })
            }
            
        }
    }
}