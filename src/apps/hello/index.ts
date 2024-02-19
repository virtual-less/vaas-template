import { type VaasServerType, Decorator, rpcInvote } from 'vaas-framework'

interface RpcGetUserNameParams {
  userId: number
}
interface RpcGetUserInfoByIdParams {
  id: number
}
interface RpcGetUserNameResult {
  username: string
}
interface RpcGetUserInfoByIdResult {
  id: number
  name: string
}
export default class Hello {
  @Decorator.VaasServer({ type: 'http', method: 'get', routerName: '/hello' })
  async hello ({ req, res }: VaasServerType.HttpParams) {
    const userId = parseInt(req.query.userId || req.body.userId) || 0
    const userNameRes = await rpcInvote<RpcGetUserNameParams, RpcGetUserNameResult>(
      'hello.getUserName',
      { userId },
      { traceId: 'vaas-request-id' }
    )
    res.headers = {
      'Access-Control-Allow-Origin': '*'
    }
    return {
      hello: userNameRes.username
    }
  }

  @Decorator.VaasServer({ type: 'rpc' })
  async getUserName ({ params, context }: VaasServerType.RpcParams<RpcGetUserNameParams>): Promise<RpcGetUserNameResult> {
    const userRes = await rpcInvote<RpcGetUserInfoByIdParams, RpcGetUserInfoByIdResult>(
      'user.getUserInfoById',
      { id: params.userId },
      context
    )
    return {
      username: userRes.name
    }
  }

  @Decorator.VaasServer({ type: 'websocket', method: 'get' })
  async socket ({ data }: { data: string | Buffer }) {
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
