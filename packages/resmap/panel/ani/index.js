// panel/index.js, this filename needs to match the one registered in package.json
/*** 资源映射类 */
const fs = require("fire-fs");
const path = require("fire-path");

Editor.Panel.extend({
  // css style for panel
  style: fs.readFileSync(Editor.url("packages://resmap/panel/ani/index.css"),'utf-8'),

  // html template for panel
  template: fs.readFileSync(Editor.url("packages://resmap/panel/ani/index.html"),'utf-8'),

  // element and variable binding
  $: {
    
  },

  // method executed when template and styles are successfully loaded and initialized
  ready () {
    new window.Vue({
      el: this.shadowRoot,
      data: {
        dirs: "resources/animations/boxing"
      },
      methods: {
        /** 开始配置 */
        startConfig() {
          let dir = this.dirs;

          Editor.Scene.callSceneScript('resmap','autoBindAnim',{dir},(err,res) => {
            
          })
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