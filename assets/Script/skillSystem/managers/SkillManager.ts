/***
 * 
 * 
 * 技能管理器
 * 
 * 
 */
import SkillData, { SkillImpact, Direction } from "../common/SkillData";
import ResourceManager from "../../managers/ResourceManager";
import SkillReleaser from "../releaser/SkillReleaser";
import Player from "../../fsm/Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillManager extends cc.Component {

    /** 技能map 存储起来 */
    public skillDataMap: Map<string,SkillData> = new Map<string,SkillData>();

    /** 当前的技能 */
    public curSkill: SkillData = null;

    /** 当前的技能节点 */
    public curSkillNode: cc.Node = null;

    /*** 目标技能是否处于冷却中 */
    public skillIsCool: boolean = false;

    /** 技能对象池 */
    public skillNodePool: cc.NodePool = null;

    /** 将所需要的技能添加到该节点下 */
    public async generateSkill(skillName: string) { 
        let skillDataItem: SkillData = this.skillDataMap.get(skillName);
        // 准备技能，判断是否可以释放技能
        if(skillDataItem && !skillDataItem.isCool) {
            skillDataItem = this.skillDataMap.get(skillName);
            this.curSkill = skillDataItem;

            /** 所有者是自己 */
            if(skillDataItem.owner === this.node && skillDataItem.skillPrefab) {
                /** 从对象池中取出一个节点 */
                this.curSkillNode = this.skillNodePool.get();
                if(!this.curSkillNode) {
                    let tempNode: cc.Node = cc.instantiate(skillDataItem.skillPrefab);
                    /** 向池子中放入对象 */
                    this.skillNodePool.put(tempNode);

                    this.curSkillNode = tempNode;

                }

                let skillReleaser: SkillReleaser = this.curSkillNode.getComponent("SkillReleaser");
                /** 为技能释放器赋予技能数据和技能节点 */
                skillReleaser.SkillNode = this.curSkillNode;
                skillReleaser.SkillData = this.curSkill;

                /** 播放技能所属动画 */
                // this.node.getComponent(Player).playAnimation();

                if(this.node.children.indexOf(this.curSkillNode) < 0) {
                    this.node.addChild(this.curSkillNode);
                    this.curSkillNode.setPosition(cc.v2(40,20));
                }

                // 开始技能冷却
                this.startSkillCountDown(skillDataItem);
            }
        }
    }
    /** 准备技能 */
    public prepareSkill(): SkillData[] {
        let res = [];
        this.skillDataMap.forEach((value,key) => {
            if(value.isCool) {
                res.push(value);
            }
        });
        return res;
    }
    /** 初始化技能预制体信息 应该率先初始化这些技能缓存防止释放技能时候卡顿 */
    public async initSkillData() {
        let skillData = new SkillData();
        skillData.id = 1;
        skillData.name = "波浪拳";
        skillData.description = "波浪拳，造成450真实伤害";
        skillData.attackDistance = 500;
        skillData.costSP = 10;
        skillData.atRatio = 1.5;
        skillData.coolTime = 4;
        skillData.coolRemain = 4;
        skillData.isCool = false;
        skillData.impactType = [SkillImpact[0],SkillImpact[1]];
        skillData.nextComSkillId = 0;
        skillData.durationTime = 2;
        skillData.skillInterval = 2;
        skillData.owner = this.node;
        if(ResourceManager.resConfig.wave_boxing_prefab.dir === 'resources') {
            skillData.skillPrefab = await ResourceManager.getInstance().loadResourceByUrl(ResourceManager.resConfig.wave_boxing_prefab.path,cc.Prefab);
        }
        skillData.skillPrefabName = "wave_boxing";
        skillData.skillAnimationName = "wave_boxing";

        skillData.isCanMove = true;
        skillData.skillSpeed = 300;
        skillData.spreadDir = Direction.RIGHT;
        
        this.skillDataMap.set(skillData.name,skillData);
    } 
    start () {
        this.skillNodePool = new cc.NodePool();

        /** 填充技能映射表 */
        this.initSkillData();

        cc.director.on("collect_skill",this.recoverSkill,this);
    }
    /** 技能回收 */
    private recoverSkill(param: cc.Node): void {
        // console.log("event is ,",event, " and params is ",params);
        if(param instanceof cc.Node) {
            // 重置回收的节点位置
            param.x = 0;
            param.opacity = 255;
            this.skillNodePool.put(param);

        }
        this.curSkill = null;
        // console.log("");
    }
    /** 开始技能冷却倒计时 cd */
    public startSkillCountDown(skill: SkillData) {
        skill.isCool = true;
        skill.coolRemain = skill.coolTime;
        // 开始减少coolRemain
        let intervalId = setInterval(() => {
            skill.coolRemain--;
            if(skill.coolRemain < 1) {
                clearInterval(intervalId);
                // 重置剩余冷却时间 意思是可以再次释放该技能了
                skill.coolRemain = skill.coolTime; 
                skill.isCool = false;
            }
        },1000);

    }
    
    onDestroy() {
        cc.director.off("collect_skill",this.recoverSkill,this);
    }
    onDisable() {
        cc.director.off("collect_skill",this.recoverSkill,this);
    }

    update (dt) {
        
    }
}
