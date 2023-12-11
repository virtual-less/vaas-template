import { type VaasServerType, Decorator, rpcInvote } from 'vaas-framework'

interface RpcCommonParams {
  params: any
  context: any
}
interface RpcGetUserNameResult {
  result: { username: string }
  context: any
}
interface RpcGetUserInfoByIdResult {
  result: { id: number, name: string }
  context: any
}
export default class Hello {
  @Decorator.VaasServer({ type: 'http', method: 'get', routerName: '/hello' })
  async hello ({ req, res }: VaasServerType.HttpParams) {
    const userId = req.query.userId || req.body.userId || 0
    const userNameRes = await rpcInvote<RpcCommonParams, RpcGetUserNameResult>(
      'hello.getUserName',
      { params: { userId }, context: { traceId: 'vaas-request-id' } }
    )
    res.headers = {
      'Access-Control-Allow-Origin': '*'
    }
    return {
      hello: userNameRes.result.username
    }
  }

  @Decorator.VaasServer({ type: 'rpc' })
  async getUserName ({ params, context }: RpcCommonParams): Promise<RpcGetUserNameResult> {
    const userRes = await rpcInvote<RpcCommonParams, RpcGetUserInfoByIdResult>(
      'user.getUserInfoById',
      { params: { id: params.userId }, context }
    )
    return {
      result: {
        username: userRes.result.name
      },
      context
    }
  }

  @Decorator.VaasServer({ type: 'websocket', method: 'get' })
  async socket (data: string | Buffer) {
    // throw new Error('something error')
    return {
      arrived: data
    }
  }

  @Decorator.VaasServer({ type: 'http', method: 'get' })
  async ping ({ req, res }: VaasServerType.HttpParams) {
    return {
      pong: true
    }
  }
}
