export default class ClassFactory {

    constructor() {

    }

    static getClass(className: string): any {
        let triggerFunc: Function = cc.js.getClassByName(className);
        let triggerClass = new triggerFunc();
        return triggerClass
    }
}