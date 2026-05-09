const Router = require('koa-router')
const api = new Router()

const method = require('../methods')

function resolveMethodPath (rawPath) {
  let methodPath = rawPath || ''
  if (methodPath.startsWith('quote/')) methodPath = methodPath.slice('quote/'.length)

  const methodWithExt = methodPath.match(/^(.*)\.(png|webp)$/)
  return {
    name: methodWithExt ? methodWithExt[1] : methodPath,
    ext: methodWithExt ? methodWithExt[2] : null
  }
}

const apiHandle = async (ctx) => {
  const resolved = resolveMethodPath(ctx.params[0])
  if (resolved.ext) ctx.props.ext = resolved.ext
  ctx.result = await method(resolved.name, ctx.props)
}

api.post('/', apiHandle)

module.exports = api
