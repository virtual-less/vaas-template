import {VaasServer} from 'vaas-framework'
import * as path from 'path'

const vaasServer = new VaasServer()
vaasServer.run({
    appsDir:path.join(__dirname,'apps'), 
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
})