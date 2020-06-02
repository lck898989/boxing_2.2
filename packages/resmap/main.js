'use strict';
let path = require("fire-path");
let fs = require("fire-fs");

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('resmap');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('resmap', 'resmap:hello');
    },
    'clicked' () {
      Editor.log('Button clicked!');
    },
    /** 打开自动绑定动画界面 */
    'openAni' () {
      Editor.Panel.open('resmap:addAni');
    },
    async 'query_assets' (event,params) {
      
      let dir = params.dirs;
      let ext = params.exts;
      let type = "";
      switch(ext) {
        case "prefab":
          type = 'prefab';
          break;
        case /\*\.jpg|png|jpeg|gif|$/.test(ext):
          type = 'texture';
          break;
        case /\*\.wav|mp3$/.test(ext):
          type = 'audio';
          break; 
        case "anim":
          type = 'animation'
          break;   
      }
      let projectPath = Editor.Project.path;

      let resConfig = {};
      if(dir instanceof Array && ext instanceof Array) {
        for(let i = 0; i < dir.length; i++) {
          for(let j = 0; j < ext.length; j++) {

            await new Promise((resolve,reject) => {
              let selectstring = `db://assets/${dir[i]}\/**\/*.${ext[j]}`;
              // Editor.log("selectstring is ",selectstring);
              // Editor.log("type is ",type);
              Editor.assetdb.queryAssets(selectstring,type,(err,results) => {
                if(err) {
                  reject();
                  return;
                }
                if(results) {
                  Editor.log("results is ",results);
                  // let jsonObj = {};
                  results.forEach((element,index) => {
                    let name = path.basename(element.url,`.${ext[j]}`);
                    let fileName = name + `_${ext[j]}`;
                    let pathObj = {};
                    let filePath = element.url.replace(`db://assets/${dir[i]}/`,"");
                    pathObj.path = filePath;
                    pathObj.dir = dir[i];
                    pathObj.name = name;
                    resConfig[fileName] = pathObj;
                    // resConfig.dir = dir[i];
                  });
                  Editor.log("resConfig s ",resConfig);
                  resolve(resConfig);
                }
              });
      
            });

          }
        }
      }
      Editor.log("configObj is ",resConfig);

      
      // let data = new Uint8Array(Buffer.from(JSON.stringify(resConfig)));
      let configRealPath = 'db://assets/resconfig.ts';
      let configpath = Editor.assetdb.exists(configRealPath);
      Editor.log("configpath is ",configpath);
      if(!configpath) {

        Editor.assetdb.create(configRealPath,"export const ResConfig = " + JSON.stringify(resConfig),(err,results) => {
          Editor.log("创建资源完成");
        })

      } else {
        Editor.assetdb.saveExists(configRealPath,"export const ResConfig = " + JSON.stringify(resConfig),(err,meta) => {
          Editor.log("资源刷新完成");
        })
      }
    },
    /** 查看某一个文件夹下的动画文件 */
    async 'query_animDir' (event,params) {
      let dir = params.dir;
      let uuids = [];
      let res = await new Promise((resolve,reject) => {
        Editor.assetdb.queryAssets(`db://assets/${dir}\/*.anim`,"",(err,results) => {
          
          if(err) {
            reject();
            return;
          }
          if(results) {
            // let jsonObj = {};
            // Editor.log();
            results.forEach((element,index) => {
            
              uuids.push(element.uuid);
            });
            resolve(uuids);
          }
        });
      });
      Editor.log("uuids is ",uuids);
      event.reply(uuids);
    },
    getUrlByuuid(event,params) {
      let uuid = params.uuid;
      Editor.log("uuid is ",uuid);
      let isExist = Editor.assetdb.existsByUuid(uuid);
      Editor.log("该资源id是否存在：",isExist);
      if(isExist) {
        let url = Editor.assetdb.uuidToUrl(uuid);
  
  
        Editor.log("url is ",url);
        if(url) {
          event.reply(url);
        }
      } else {
        event.reply('');
      }
    }

  },
};