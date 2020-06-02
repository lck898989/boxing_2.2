/*
 * @Author: mikey.zhaopeng 
 * @Date: 2020-02-26 13:31:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-02-26 16:38:26
 */
import {ResConfig} from "../../../assets/resconfig";
const {ccclass, property} = cc._decorator;
@ccclass
// import {fs} from "fire-fs";
export default class ResourceManager {

    // onLoad () {}
    private static _instance: ResourceManager = null;

    public static resConfig = ResConfig;
    constructor() {

    }
    // 资源缓存
    private resCache: Object = {};
    public static getInstance(): ResourceManager {
        if(!this._instance) {
            this._instance = new ResourceManager();
        }
        return this._instance;
    }
    /**
     * 加载资源对象
     * @param  {string} url resources 路径下的资源路径字符串
     * @returns Promise 返回的promise对象
     */
    public async loadResourceByUrl(url: string,type: any): Promise<any> {
    
        if(!this.resCache[url]) {
            return new Promise((resolve,reject) => {
                cc.loader.loadRes(url,type,(err,res) => {
                    if(err) {
                        reject();
                    }
                    // 加入到缓存列表
                    this.resCache[url] = res;
                    resolve(res);
                    
                })
            });
        }
        return this.resCache[url];
    }
    public removeResourceByUrl(url: string): void {
        if(this.resCache[url]) {
            this.resCache[url] = null;
        }
    }

}
