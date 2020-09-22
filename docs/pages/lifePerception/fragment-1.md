# Interview, 1


## 前言
最近在考虑换工作的事情，所以学习内容的更新暂缓，刷一刷面试题找找感觉。

##  参考资料
- https://github.com/LinDaiDai/niubility-coding-js
- 作者整理的知识很不错，若喜欢，可以给作者一个star

---
---

## 就这样直接开始吧

### a标签 LoVe HAte 原则
`link, visited, hover, active`

---

### Vue - hash, history
`hash`: `onhashchange` - `location.hash`

`history`: `pushState`、`replaceState`

---

### 数组去重
```javascript
let arr = []
Array.from(new Set(arr))
[...new Set(arr)]
// 遍历 - indexOf, includes
// 排序后比较前后 - sort
```
---

### Promise

#### finally
- `.finally()`方法的回调函数不接受任何参数，因为不知道状态是`resolved`还是`rejected`
- `.finally()`返回的是上一次Promise对象值，如果上一次是抛出了一个异常，则返回异常的`Promise`对象

#### all, race
- `.all()`接收一组异步任务，并行执行，并且在全部异步操作执行完毕后执行回调
- `Promise.all().then()`结果中数组的顺序与入参顺序一致
- `.race()`接收一组异步任务，并行执行，只保留第一个完成的异步操作结果，其他异步任务仍在执行，但结果会被抛弃
- `.all() & .race()` - 只有最先抛出的异常会被捕获，不会影响数组中的其他异步任务

---

### Event Loop
宏任务 -> 微任务 -> 渲染 -> **web worker** -> 宏任务...

---

### addEventListener 第三个参数
- `true` - 捕获
- `false` - 冒泡
- `{once: true/false}` - 添加之后最多只调用一次
- `{passive: true/false}` - `listener`永远不会调用`preventDefault()`

---

### 没有冒泡的事件
`onblur, onfocus, onmouseenter, onmouseleave`

---

### 手写new
```javascript
function myNew(fn, ...args) {
  let instance = Object.create(fn.prototype)
  let result = fn.call(instance, ...args)
  return typeof result === 'object' ? result : instance
}
```

---

### instanceof
`instanceof`主要用于判断某个构造函数的原型对象在不在某个对象的原型链上

```javascript
function myInstance(left, right) {
  let proto = Object.getPrototypeOf(left)
  while(true) {
    if(proto == null) return false
    if(proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```

---

### TCP & UDP
- `TCP`是面向连接的、可靠的、基于字节流的传输层协议
- `UDP`是面向无连接的传输层协议 - 手游、直播

---

### 从输入一个url到页面渲染的流程
> 参考资料：https://segmentfault.com/a/1190000014311983

** `DNS`解析 - 获取`IP` - 浏览器/本地`hosts`文件/本地`DNS`服务器查询是否有缓存过

** `TCP/IP`连接 - 三次握手 - 为什么两次不行？
> 客户端：我可以请求数据吗？
>
> 服务端：可以
> 
> 客户端：好的

- 如果是两次握手的情况，客户端发送了请求，由于网络波动等原因延迟到达服务端
- 此时服务端建立连接，准备接收数据
- 客户端并不知道发生什么情况，造成服务端资源的浪费

** 发送http请求 - 分为静态资源和动态资源

** 浏览器渲染 - `DOM, CSSOM -> render tree`

** 四次挥手 - 客户端没有数据要发送时断开连接，释放服务端资源
> 客户端：我没有数据要发送了，打算断开连接
> 
> 服务端：你的请求我收到了，我这边还有数据没有发送完成，你等下
> 
> 服务端：我的数据发送完毕了，可以断开连接了
> 
> 客户端：👌，你断开连接吧（内心os：我会在2倍的最大报文段生存时间后关闭连接，如果再次收到服务端的消息，我就知道服务端没有收到我的这句话，我再发送一遍给它）
> 
> 最终服务端收到客户端的消息断开连接，客户端也将连接关闭

---

### CommonJS & ES Module 模块区别
- `CommonJS`支持动态导入`require(${path}/xx.js)`，而`ES Module`目前不支持
- `CommonJS`的导入是同步的，因为文件都在本地；`ES Module`的导入是异步的，用于浏览器，需要下载文件，如果同步会导致阻塞
- `CommonJS`导出的是值拷贝，`ES Module`导出的是值的引用

---

### 水平垂直居中

#### 居中元素宽高确定 `width: 100px; height: 100px;`
```css
/* 第一种 */
position: absolute;
top: 50%;
left: 50%;
margin-left: -50px;
margin-top: -50px;

/* 第二种 */
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;

/* 第三种 */
position: absolute;
top: calc(50% - 50px);
left: calc(50% - 50px);
```

#### 居中元素宽高不定
```css
/* 第一种 */
position: absolute;
left: 50%;
top: 50%;
transform:translate(-50%, -50%);

/* 第二种 */
/* 父级flex布局 */
display: flex;
justify-content: center;
align-items: center;

/* 第三种 */
/* 父级grid布局 */
display: grid;
align-self: center;
justify-self: center;
```

---

### CSRF & XSS & 点击劫持

#### CSRF - 跨站请求伪造
- `SameSite`
- `Referer`
- `Token`

#### XSS - 跨站脚本攻击
- 转义
- `CSP`白名单 - http/html
- `httpOnly` - 无法窃取`cookie`

#### 点击劫持
- 服务端添加`X-Frame-Options`

---

### requestAnimationFrame
用于浏览器定时循环操作的一个接口，按帧对网页进行重绘。