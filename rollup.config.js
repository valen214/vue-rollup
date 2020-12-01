
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript'
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';

import fs from "fs";
import path from "path";

function copyHtml(){
  fs.readdirSync("src").forEach(name => {
    if(name.endsWith(".html")){
      fs.copyFile("src/" + name, "dist/" + name, () => {
  
      });
    }
  });
}

export default [
  {
    input: 'src/App.vue',
    output: [
      {
        format: 'esm',
        file: 'dist/App.esm.js',
      },
    ],
    external: [ 'vue' ],
    plugins: [
      {
        name: 'watch-external',
        buildStart(){
          this.addWatchFile(path.resolve(__dirname, 'src/index.html'));
          copyHtml();
        },
        watchChange(){
          console.log("index.html modified, copying...");
          copyHtml();
        }
      },
      replace({
        "vue": '"https://cdnjs.cloudflare.com' +
        '/ajax/libs/vue/3.0.2/vue.runtime.esm-browser.js"',
        delimiters: ["'", "'"]
      }),
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015'
      }),
      vue(),
    ]
  }, {
    input: 'src/App.vue',
    output: [
      {
        format: "umd",
        file: "dist/App.umd.js",
        name: 'App',
        globals: {
          vue: 'Vue',
        },
      }, 
    ],
    external: [ 'vue' ],
    plugins: [
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015'
      }),
      vue(),
    ]
  }, {
    input: 'src/index.js',
    output: [
      {
        format: "cjs",
        file: "dist/index.cjs.js",
      }, {
        format: 'umd',
        file: "dist/index.umd.js",
        name: 'index',
        globals: {
          vue: 'Vue',
        },
      }
    ],
    external: [ 'vue' ],
    plugins: [
      typescript({
        tsconfig: false,
        experimentalDecorators: true,
        module: 'es2015'
      }),
      vue(),
    ]
  }
]
