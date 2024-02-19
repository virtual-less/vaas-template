import { type VaasServerType, Decorator } from 'vaas-framework'

interface RpcGetUserInfoByIdParams {
  id: number
}
interface RpcGetUserInfoByIdResult {
  id: number
  name: string
}
export default class User {
  @Decorator.VaasServer({ type: 'rpc' })
  async getUserInfoById ({ params }: VaasServerType.RpcParams<RpcGetUserInfoByIdParams>): Promise<RpcGetUserInfoByIdResult> {
    const data = [
      { id: 1, name: 'jack' },
      { id: 2, name: 'tom' },
      { id: 3, name: 'jan' }
    ]
    const user = data.find((e) => e.id === Number(params.id)) || { id: 0, name: 'world' }
    return user
  }
}
