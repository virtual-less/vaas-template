import {VaasServerType, Decorator} from 'vaas-framework'
import {promises as fsPromises} from 'fs'
import * as fs from 'fs'
import * as path from 'path'

export default class UI {
    @Decorator.VassServer({type:'http',method:'get',routerName:'/'})
 async index({req,res}:VaasServerType.HttpParams) {
   return (await fsPromises.readFile(path.join(__dirname,'./public/index.html'))).toString()
 }
 @Decorator.VassServer({type:'http',method:'get',routerName:'/favicon.ico'})
 async faviconIco({req,res}:VaasServerType.HttpParams) {
   return await fsPromises.readFile(path.join(__dirname,'./public/favicon.ico'))
 }

 @Decorator.VassServer({type:'http',method:'get',routerName:'/location'})
 async location({req,res}:VaasServerType.HttpParams) {
    res.status=302
    res.headers = {
        'location':'https://github.com/virtual-less/vaas-framework'
    }
    return `redirect to ${res.headers.location}`
 }
}