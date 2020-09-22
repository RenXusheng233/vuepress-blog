# Interview, 2


## 前言
继续，刷一下总结的面试题，找找感觉，查漏补缺。

## 参考资料
- https://juejin.im/post/6844903776512393224#heading-63
- https://juejin.im/post/6844903801153945608
- https://juejin.im/post/6844903830979608584

---
---

## 开始开始

### CSS

#### BFC - 块级格式化上下文
独立的渲染区域，BFC内部与外部的元素**相互隔离**，定位不受影响。
- `position: absolute/fixed`
- `display: inline-block/table/flex...`
- `float !== none`
- `overflow !== visible` - `visible是overflow的默认值`

> 利用BFC避免`margin`重叠 - 设置成为两个BFC解决
> 
> BFC区域不会与`float box`盒子重叠，可以设置BFC实现自适应两栏布局
>> 左: `float: left`
>> 
>> 右: 设置`overflow: hidden`成为BFC实现两栏，否则左侧元素会被包裹起来
> 
> 利用BFC实现浮动元素参与高度的计算，避免高度塌陷

---

#### 层叠上下文
层叠等级 - 层叠上下文在Z轴上的排序，从下到上排序依次为：
- `background/border`
- `z-index`为负值
- 块级元素
- 浮动元素
- 行内元素
- `z-index: 0/auto`
- `z-index`为正值

`z-index`的优先级最高

---
---

### Javascript

#### `for...in` & `for...of`
- `for...of` - 内部使用的是迭代器，无法遍历对象
  > `for...of`遍历的是数组中的元素值
  > 
  > `for...of`只遍历数组中的元素，不会去遍历原型上的元素

- `for...in` - 可以遍历对象或数组
  > `for...in`遍历的是数组的索引
  > 
  > `for...in`会遍历数组/对象中所有可枚举的属性，包括原型。
  >
  > 所以尽量不要使用`for...in`遍历数组
  > 
  > 可以对遍历的属性使用`hasOwnProperty`来过滤原型上的属性

- 可以使用`object.keys` 和 `object.values`来遍历对象

---

#### 手写 call, apply, bind - 总是忘🤣
```javascript
// 手写call
Function.prototype.myCall = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('error')
  }
  let context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
```
```javascript
// 手写apply
Function.prototype.myApply = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('error')
  }
  let context = context || window
  context.fn = this
  let result
  if(arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}
```
```javascript
// 手写bind - 返回函数，可能会被new
Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  return function F() {
    if(this instanceof F) {
      return new _this(...args, ...arguments)
    } else {
      return _this.apply(context, args.concat([...arguments]))
    }
  }
}
```

---

#### babel编译原理
- 将ES6/ES7代码解析为AST
- 将AST通过遍历转译，生成新的AST
- 根据新的AST转换为ES5

---

#### 函数柯里化
- 在一个函数中，先填充几个参数，然后返回一个新的函数（新的函数仍可接收参数）的技术，称为函数柯里化。

- 在不侵入函数的前提下，预设通用参数，以便多次调用

---

#### 数组相关
改变原数组的操作：
- `push&pop | unshift&shift` - 尾 ｜ 首
- `sort / reverse` - 排序/反序
- splice(start, number, value...)

不改变原数组的操作：
- `concat` - 连接数组，不影响原数组
- `slice(start, end)` - 截断数组

---

#### ES7、8、9、10新特性
ES7
- `Array.prototype.includes(xxx, number)` - 第二个参数表示搜索的起始位置
  > 可以判断`NaN`
  > 
  > 无法判断`+0, -0`
  > 
  > 相比于`indexOf`的判断语义化更好，并且`indexOf`内部是使用`===`进行判断，所以无法准确判断`NaN`
  > 
  > 另外还可以使用`find & findIndex`，通过`Object.is()`方法进行判断，`Object.is()`的判断是最准确的，可以区分`+0, -0`
  > 
  > 顺带一提，`Set`方法去重时也可以区分出`NaN`

- `**`，求幂运算符 - 等效于`Math.pow()`

ES8
- `async/await`
  > `async`是通过异步执行并隐式的返回Promise作为结果的函数
  > 
  > `await`后边一定是Promise对象，如果不是会被包装成Promise对象

- `Object.values(), Object.entries()`
- ES10中提供了`Object.fromEntries()`方法，可以根据`Object.entries()`得到的数组反向得到对象
```javascript
let obj = {
  a: 1,
  b: 2
}
Object.keys(obj) // [a, b]
Object.values(obj) // [1, 2]
Object.entries(obj) // [[a, 1], [b, 2]]

let arr = Object.entries(obj)
Object.fromEntries(arr) // {a: 1, b: 2}
```

- `String.prototype.padStart()/padEnd()`
```javascript
x.padStart(4, 'ab') // abax
x.padEnd(5, 'ab') // xabab

// 常用于处理日期、金额
'12'.padStart(10, 'YYYY-MM-DD') // YYYY-MM-12
'09-12'.padStart(10, 'YYYY-MM-DD') // YYYY-09-12
```

- `Object.getOwnPropertyDescriptors`
  > 脑子有点昏，明天早上过来看看总结下。
  > 
  > update: 前来更新!
  > 
  > ES5的`Object.getOwnPropertyDescriptor`返回某个对象属性的描述对象`descriptor`
  > 
  > 新引入的`Object.getOwnPropertyDescriptors`返回指定对象的所有描述对象
  > 
  > 主要是为了解决`Object.assign()`无法正确拷贝对象的`set, get`属性的问题，因为该方法总是去拷贝**属性值**，而不会去拷贝它背后的赋值方法或取值方法
  > 
  > 配合`Object.defineProperties`可是实现对象的正确拷贝
```javascript
let obj = {
  set: foo(value) {
    console.log(value)
  },
  get: bar() {
    return 'example'
  }
}
const target = {}
Object.defineProperties(target, Object.getOwnPropertyDescriptors(obj))
console.log(Object.getOwnPropertyDescriptor(target, 'foo'))
```

ES9
- `for await of` - 异步迭代器
```javascript
function Gen(timer) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(timer)
    }, timer)
  })
}
async function test() {
  let arr = [Gen(2000), Gen(100), Gen(3000)]
  for await (let item of arr) {
    console.log(item)
  }
}
test() // 2000, 100, 3000
```
