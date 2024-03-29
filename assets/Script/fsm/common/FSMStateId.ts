export enum FSMStateId {
    /** 默认状态 */
    Default,
    /** idle状态 */
    Idle,
    /** 死亡状态 */
    Dead,
    /** 跑动状态 */
    Run,
    /** 逃跑状态 */
    Escape,
    /** 攻击状态 */
    Atach,
    /** 躲避状态 */
    Avoid,
    /** 近距离状态 */
    Close,
    /** 中等距离状态 */
    Middle,
    /** 远距离状态 */
    Far
}