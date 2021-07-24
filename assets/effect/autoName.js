const path = require('path');
const fs = require('fs');
const process = require('process');
// const pwd = require('')
const cwd = process.cwd();
console.log('cwd is ',cwd);

const absolutePath = cwd;

console.log('absolutePath is ',absolutePath);
const files = fs.readdirSync('./',{encoding: 'utf-8'});
console.log('files is ',files);

const searchDir = (dirPath) => {
    fs.stat(dirPath,(err,stat) => {
        if(err)  return;

        if(stat.isDirectory()) {
            let dirFiles = fs.readdirSync(dirPath,{encoding: 'utf-8'});
            for(let item of dirFiles) {
                searchDir(dirPath + '/' + item);
            }
        } else if(stat.isFile() && dirPath.indexOf('.json') >= 0 && dirPath.indexOf('.meta') < 0) {
            console.log('name is ',path.basename(dirPath));
            const jsonData = fs.readFileSync(dirPath,'utf-8');
            const jsonObj = JSON.parse(jsonData);
            console.log('jsonData is ',jsonObj);

            let values = Object.values(jsonObj.animations);

            if(jsonObj.animations) {
                const animationsObj = jsonObj.animations;
                const keys = Object.keys(animationsObj);
                for(let i = 0,len = keys.length; i < len; i++) {
                    const key = keys[i];
                    delete animationsObj[key];

                    animationsObj[`animation${i}`] = values[i];
                }
            }
            
            console.log("动画数据是：",jsonObj.animations);

            fs.writeFileSync(dirPath,JSON.stringify(jsonObj));
        }
    });
}


searchDir(absolutePath);

