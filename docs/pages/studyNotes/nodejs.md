# nodejs

## 前言
主要用于记录学习nodejs框架中比较重要的知识点、常见问题的解决方式和一些调优方案。首先学习koa2。

PS：个人也有用过Express，用于后台接口的开发，但是仅仅是根据文档及教程进行的实战，并没有很好的知识积累及理解用法。

## 参考资料
- koa2中文网站 - https://koa.bootcss.com/
- koa2学习笔记 - https://chenshenhai.github.io/koa2-note/
  
---
---

## Koa Base

### async 中间件开发
```javascript
// ./middleware/logger-async.js
function log(ctx) {
  console.log(ctx.method, ctx.header.host + ctx.url)
}

module.exports = function() {
  return async function(ctx, next) {
    log(ctx)
    await next()
  }
}
```

### async 中间件在koa@2中使用
```javascript
const Koa = require('koa') // koa v2
const app = new Koa()
const loggerAsync = require('./middleware/logger-async')

app.use(loggerAsync())

app.use(async (ctx) => {
  ctx.body = 'hello world'
})

app.listen(3000)
```
---

## koa 路由

### koa-router 中间件
```javascript
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')

const home = new Router()
home.get('/', async (ctx) => {
  ctx.body = 'home page.'
})

const page = new Router()
page
  .get('/404', async (ctx) => {
    ctx.body = '404 page.'
  })
  .get('todo', async (ctx) => {
    ctx.body = 'todo page.'
  })

const router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('listening 3000')
})
```

---

## Koa GET请求
获取`get`数据的两个途径
- `ctx`
  > `ctx.query`
  > 
  > `ctx.querystring`
- `ctx.request`
  > `ctx.request.query`
  > 
  > `ctx.request.querystring`

---

## Koa POST请求

- 原生对象 - `ctx.req` & `ctx.res`
- 封装对象 - `ctx.request` & `ctx.response`

使用原生对象实现post请求的解析:
```javascript
function paresePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = ''
      ctx.req.addEventListener('data', (data) => {
        postData += data
      })
      ctx.req.addEventListener('end', () => {
        let parseData = parseQueryData(postData)
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}
```
```javascript
function parseQueryData(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  for(let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}
```

