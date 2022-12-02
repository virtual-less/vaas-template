import {VaasServerType, Decorator, rpcInvote } from 'vaas-framework'

interface RpcCommonParams {
    params:any,
    context:any
}
interface RpcGetUserInfoByIdResult {
    result:{id:number,name:string},
    context:any
}
export default class User {
    @Decorator.VaasServer({type:'rpc'})
    async getUserInfoById({params,context}:RpcCommonParams):Promise<RpcGetUserInfoByIdResult> {
        const data = [
            {id:1,name:'jack'},
            {id:2,name:'tom'},
            {id:3,name:'jan'}
        ]
        const user = data.find((e)=>e.id===Number(params.id)) || {id:0,name:'world'}
        return {
            result:user,
            context
        }
    }
}