export enum FSMTriggerId {
    /** 没有条件 */
    Idle,
    /** 血量为0 */
    NoHealth,
    /** 在攻击范围内 */
    RangeAttack,
    /** 血量小于10 */
    HpLetterTen,
    /** 躲避 */
    Avoid,
    /** 近距离 */
    Close,
    /** 中等距离 */
    Middle,
    /** 远距离 */
    Far
}