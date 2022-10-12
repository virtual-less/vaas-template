const path = require("path");
module.exports = {
    appsDir:path.join(__dirname,'build','apps'), 
    port:8080,
    showErrorStack:true,
    getAppNameByHost: async (host)=>{
        if(['127.0.0.1'].includes(host)) {
            return 'ui'
        }
        return ''
    },
}