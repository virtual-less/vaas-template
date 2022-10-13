const path = require("path");
module.exports = {
    appsDir:path.join(__dirname,'build','apps'), 
    port:8080,
    showErrorStack:true,
    getAppNameByRequest: async (request)=>{
        if(['/','/favicon.ico'].includes(request.path)) {
            return 'ui'
        }
        return ''
    },
}