# 数据结构

## 前言
首先从基础开始，一步一步慢慢来。

你想要的，时间都会给你。

## 参考资料
- 掘金小册 - 前端算法与数据结构面试：底层逻辑解读与大厂真题训练，作者修言。
- 个人觉得作者的小册质量都非常高，非常值得购买阅读。

---
---

## javascript中常用数据结构
- 数组
- 栈
- 队列
- 链表
- 树

---

## 数组

### 数组创建
```javascript
const arr = []
const arr = new Array()

const arr = new Array(3)
const arr = (new Array(3)).fill(1) // [1, 1, 1]
```

### 数组的访问和遍历
- `for`循环
- `forEach`
- `map`

### 二维数组
- 实际上就是数组套数组
- 二维数组的别称就是矩阵

### 二维数组的创建
```javascript
const len = arr.length
for(let i = 0; i < len; i++) {
  arr[i] = []
}
```

### 二维数组的遍历
- 两层`for`循环
- 几维数组就搞几层`for`循环

---

## 栈和队列
在javascript中，栈和队列可以看作是**特别的数组**

### 栈 - Stack - 只用pop和push完成增删的数组
- FILO - first in last out
- 尾部添加元素，尾部移除元素

### 队列 - Queue - 只用shift和push完成增删的数组
- FIFO - first in first out
- 尾部添加元素，头部移除元素

---

## 链表
- 和数组类似，都是有序的列表，都是线性结构
- 有且仅有一个前驱节点，有且仅有一个后继节点
- 数据单位是**节点**，在内存中可以是离散的
  
```javascript
{
  // 数据域
  val: 1,
  // 指针域
  next: {
    val: 2,
    next: ...
  }
}
```

```javascript
// 初始化一个链表
function listNode(val) {
  this.val = val
  this.next = null
}

// 创建
const node = new listNode(1)
node.next = new listNode(2)
```

### 链表元素的添加 & 删除
```javascript
const node1 = new listNode(1)
node1.next = new listNode(2)

// 在节点1, 2之间添加节点3
const node3 = new listNode(3)
node3.next = node1.next
node1.next = node3

// 删除节点3
node1.next = node3.next
```

> 涉及链表删除操作时，要定位的不是目标节点，而是要定位目标节点的前驱节点
> 
> `const target = node1.next`
> 
> `node1.next = target.next`

### 链表与数组对比
- 首先，js中的数组不一定是真正数组 - 真正的数组是储存在连续的内存空间里的
  > `[1, 2, 3, 4]` - 连续的内存空间 - 🉑️
  > 
  > `[1, {a: 1}, 'haha']` - 并不连续 - 不🉑️
- **链表**在数据**增删**中具有更少的开销 - 时间复杂度O(1)
- **数组**在数据**访问**中具有更少的开销 - 时间复杂度O(1)

