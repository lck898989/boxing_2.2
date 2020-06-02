/**
 * 
 * 工具类
 * 
 */
export default class Util {

    /** 生成随机数 */
    public static createRandom(minNum: number,maxNum: number) {
        return Math.floor(Math.random() * (maxNum - minNum) + minNum);
    }
}