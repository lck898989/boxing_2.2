const {ccclass, property} = cc._decorator;

@ccclass
export default class Index extends cc.Component {
    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;
    start () {
        // init logic
        // this.label.string = this.text;
        if(!cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.playMusic(this.bgm,true);
        }
    }
}
