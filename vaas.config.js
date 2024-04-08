// @ts-check
const path = require("path");
const { util } = require("vaas-framework");
module.exports = util.validVaasConfig({
    appsDir:path.join(__dirname,'build','apps'), 
    port:8080,
    showErrorStack:true,
    isPrepareWorker:false,
    getAppNameByRequest: async (request)=>{
        // 匹配/api开头作为接口
        const pathMatchRes = /^\/api\/(\w+)/.exec(request.path)
        if(pathMatchRes) {
            /**
             * example
             * input: /^\/api\/(\w+)/.exec('/api/hello/xxxx') 
             * output: ['/api/hello', 'hello', index: 0, input: '/api/hello/xxxx', groups: undefined]
             */
            return  {appName:pathMatchRes[1],prefix:pathMatchRes[0]}
        }
        return  {appName:'ui',prefix:'/'}
    },
    getAppConfigByAppName: async (_appName)=>{
        return {
            maxWorkerNum: 1,
            allowModuleSet: new Set(['*']),
            timeout: 30 * 1000,
            useVmLoadDependencies:true
        };
    },
    getByPassFlowVersion: async (_appName)=>{
        return {version:''};
    },
})