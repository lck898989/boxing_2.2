export enum FSMTriggerId {
    /** 没有条件 */
    None,
    /** 血量为0 */
    NoHealth,
    /** 在攻击范围内 */
    RangeAttack,
    /** 血量小于10 */
    HpLetterTen,
    /** 躲避 */
    Avoid
}