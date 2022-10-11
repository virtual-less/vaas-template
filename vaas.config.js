module.exports = {
    appsDir:path.join(__dirname,'build','apps'), 
    port:8080, 
    getAppNameByHost:async (host)=>{
        return ''
    }, 
    getAppConfigByAppName:async(appName)=>{
        return {
            maxWorkerNum: 2,
            allowModuleSet:new Set(['*']),
            timeout: 3000
        }
    }, 
    showErrorStack:true
}