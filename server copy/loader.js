//loader.js的作用就是把所有控制层的中间件存起来，放到一个map中，导出方便路由层使用
const globalConfig = require("./config");//config保存着服务端的配置（端口，控制层的目录）
const controllerSet = [];
const allMidWareMaps = new Map();
const FS = require("fs");
const PATH = require("path");

//业务逻辑层的绝对路径（控制层）
const controllersPath = PATH.resolve(__dirname, `./${globalConfig.web_path}`);
const files = FS.readdirSync(controllersPath);

console.log(files.length);

for(let i = 0; i < files.length; i++){
    //每个控制层文件导出一个中间件的map
    const midWaresMap = require(PATH.resolve(controllersPath, files[i]));
    if(midWaresMap){
        for (const [key, value] of midWaresMap) {
            //如果这个map的中间件还没被存进去
            if(allMidWareMaps.get(key) == null){
                allMidWareMaps.set(key,value);
            }else{
                new Error("获取控制层的某中间件错误（可能中间件重名）key:" + key)
            }
        }
        controllerSet.push(midWaresMap)
    }
}
module.exports = allMidWareMaps;