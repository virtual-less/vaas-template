import { type VaasServerType, Decorator } from 'vaas-framework'
import { promises as fsPromises, createReadStream } from 'fs'
import * as path from 'path'

export default class UI {
  @Decorator.VaasServer({ type: 'http', method: 'get', routerName: '/' })
  async index ({ req, res }: VaasServerType.HttpParams) {
    return (await fsPromises.readFile(path.join(__dirname, './public/index.html'))).toString()
  }

  @Decorator.VaasServer({ type: 'http', method: 'get', routerName: '/:fileName' })
  async faviconIco ({ req, res }: VaasServerType.HttpParams) {
    const { fileName } = req.params
    return createReadStream(path.join(__dirname, `./public/${fileName}`))
  }

  @Decorator.VaasServer({ type: 'http', method: 'get', routerName: '/location' })
  async location ({ req, res }: VaasServerType.HttpParams) {
    res.status = 302
    res.headers = {
      location: 'https://github.com/virtual-less/vaas-framework'
    }
    return `redirect to ${res.headers.location}`
  }
}
