# vaas-template
vaas server template

# Quick Start
```sh
npm run dev
```

# Base code
```ts
// # src/apps/mini/index.ts
import {VaasServerType, Decorator } from 'vaas-framework'

export default class Mini {
    @Decorator.VaasServer({type:'http',method:'get',routerName:'/hello'})
    async hello({req,res}:VaasServerType.HttpParams) {
        return {
            hello:'world'
        }
    }
}
```