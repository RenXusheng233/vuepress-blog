# HTML

## 前言
从头一点一点的复习效率太低，并且很容易造成抓不住重点的情况。经过考虑后决定在github中搜索相关的面试题，通过题目来检验自己知识的掌握程度，完善自己的知识体系。
- 搜索了最近且star的面试汇总
- 主要是重要知识点的总结
- 难度在初级到中级之间

## 参考资料
> https://github.com/CavsZhouyou/Front-End-Interview-Notebook
> 
> 若喜欢, 请给作者一个star

---
---

## 1. DOCTYPE作用
IE5.5引入文档模式 - `<!DOCTYPE>` 进行设置 - 第一行

在HTML4.01中有三种声明模式 - 严格 & 过渡 & 基于框架 - 基于SGML
```html
<!DOCTYPE HTML ...(指定的DTD文档)>
```

在HTML5中只有一种声明模式 - 简单，常用 - 不再基于SGML
```html
<!DOCTYPE html>
```

### 1-1 标准模式和兼容模式
标准模式 - 渲染方式及js引擎的解析方式均以浏览器支持的最高标准运行

兼容模式 - 以宽松的向后兼容的方式运行，模拟老的浏览器的行为以防止站点无法工作

`<!DOCTYPE>` 不存在或者格式不正确会导致文档以**兼容模式**呈现

---

## 2. html 元素

### 2-1 行内元素
只占据它对应标签的边框所包含的空间

`span, a, img, strong, button, input, textarea, label, select, b, sub, sup`

>`<b></b>` : 粗体文本 - 样式上的加粗
> 
> `<strong>` : 粗体文本 - 表示**重要**文本
>
> `<em>` : 斜体 - 表示**强调**文本
> 
> `<i>` : 斜体 - 样式上的斜体
>
>`<sub> & <sup>` - 下标注 & 上标注


### 2-2 块元素
占据其父元素（容器）的整个宽度

`p, ul, ol, li, h1~6, div, dl, dt, dd, address`


### 2-3 html4 & html5 元素的分类

- 在html4中元素被分为**内联元素** 和 **块级元素**

- html5中元素主要分为7类，主要包括：
`Metadata, Flow, Sectioning, Heading, Phrasing, Embedded, Interactive`


### 2-4 空元素
`br, hr, img, input, link, meta`

> meta标签 - 元数据信息
> 
> `name` : 提供文档级别的元数据，应用于整个页面
> 
> `http-equiv` : 编译指令，提供的信息与类似命名的HTTP头部相同
> 
> `content` : `name` 或 `http-equiv` 属性的值
> 
> `charset` : 字符集声明，例如 utf-8
> 
> `itemprop` : 用户定义的元数据
> 
> 参考资料：
> 
> https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta
> 
> https://www.jianshu.com/p/179ddc16ef55

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- 内容策略 - CSP - 有助于防止跨站点脚本攻击(XSS) -->
    <meta http-equiv="content-security-policy" content="default-src">
    <!-- 强制浏览器按照特定的版本标准进行渲染 -->
    <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1">
    <!-- content只包含正整数 - 重新载入页面的时间间隔(秒) -->
    <!-- 包含正整数&url - 重定向到指定链接的时间(秒) -->
    <meta http-equiv="refresh" content="3;url=http:example.com">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="author" content="rxs">
    <meta name="description" content="example">
    <meta name="keywords" content="ex">
    <!-- 包含生成页面的软件的标识符 -->
    <meta name="generator" content="">
    <!-- 从该文档发出的http请求中http Referer首部的内容 -->
    <meta name="referrer" content="origin">
    <title>Example</title>
  </head>
  <body>this is an example.</body>
</html>
```


### link 标签及其与 @import 区别

####  link标签
- `link`标签定义了文档与外部资源间的关系
- `link`标签是空元素，仅包含属性，只能放到`head`标签中
- `rel`属性定义了当前文档与被链接文档之间的关系，例如`stylesheet`
- `href`属性规定了被链接文档的位置，相对路径 & 绝对路径

> `href` 与 `src` 的区别
> 
> `src`用于替换当前资源，解析到`src`时会暂停其他资源的加载，如`img`、`script`
> 
> `href`用于当前文档与引用资源之间确认联系，加载时可以并行，如`a`、`link`

#### 与 @import 区别
- `@import`是css的语法规则，只能用于导入样式表；而`link`则是html的语法规则，不仅可以加载css，还可以定义RSS、rel连接属性以及引入网站图标等
- 加载顺序的区别。`link`引入的css在加载页面时同时加载；而`@import`引入的css是在页面加载完毕后开始加载
- 兼容性问题。`@import`是css2.1才有的语法，仅支持IE5+以上；`link`不存在兼容问题
- DOM可控性。通过JS操作DOM，插入`link`引入样式；由于DOM操作是基于文档的，所以`@import`无法使用

