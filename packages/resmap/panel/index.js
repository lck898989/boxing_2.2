// panel/index.js, this filename needs to match the one registered in package.json
/*** 资源映射类 */
const fs = require("fire-fs");
const path = require("fire-path");

Editor.Panel.extend({
  // css style for panel
  style: fs.readFileSync(Editor.url("packages://resmap/panel/index.css"),'utf-8'),

  // html template for panel
  template: fs.readFileSync(Editor.url("packages://resmap/panel/index.html"),'utf-8'),

  // element and variable binding
  $: {
    
  },

  // method executed when template and styles are successfully loaded and initialized
  ready () {
    new window.Vue({
      el: this.shadowRoot,
      data: {
        dirs: "resources",
        extensions: "prefab,mp3,anim"
      },
      methods: {
        /** 开始配置 */
        startConfig() {
          let ext = this.extensions;
          let dir = this.dirs;
          exts = ext.split(",");
          dirs = dir.split(",");
          Editor.log("开始向主进程发消息",exts,dirs);
          Editor.Ipc.sendToMain("resmap:query_assets",{exts,dirs});
          
        }
      }
    })
  },

  // register your ipc messages here
  messages: {
    'resmap:hello' (event) {
      this.$label.innerText = 'Hello!';
    }
  }
});