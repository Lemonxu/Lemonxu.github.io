---
title: javascript
date: 2023-06-25 17:39:57
layout: post
author: Lemonxu
tags: JavaScript, 基础
categories: [前端, 基础, JavaScript]
---

# JS基础

## 引入方式

JavaScript有3种引入方式：行内式、嵌入式和外链式；

行内式：将JavaScript代码作为Html标签的属性值使用。示例如下：

```html
<a href="javascript:alert('hello')">say hello</a>
```

嵌入式：或称内嵌式，使用`script`标签包裹JavaScript代码，直接编写到html文件中，通常放到`<head>`和`<body>`或标签中。`<script>`中type用于告知浏览器脚本类型，html5中默认属性值为"text/javascript"，因此，使用html5时可以省略type属性。示例如下：

```html
<script>
    Javascript代码
</script>
```

外链式：也称外部式，将JavaScript代码写在一个单独的文件中，一般使用"js"作为文件的扩展名，在html

页面中使用`script`标签的src属性引入"js"文件。外链适合代码量较多的情况。示例如下：

```html
<script src="./test.js"></script>
```

## 基本语法

JavaScript是一种脚本语言，脚本通常以文本保存，只有在被调用的时候进行解释或编译。

JavaScript中必须严格区分大小写，例如Test和test是不同的；

JavaScript语句中每一行代码都要以英文的分号`;`结尾，如果不写分号，浏览器会自动添加，但会消耗一些系统资源；

JavaScript中会自动忽略多个空格和换行，所以可以使用空格和换行进行格式化；

JavaScript是弱类型语言，声明变量时可以不需要指定变量的类型。



## 面向对象/设计模式/BOM/DOM/

### 面向对象

面向对象和面向过程都是编程思想。面向对象其实是面向过程的一种封装，例如：我要吃面条（面向过程：用多少面粉、多少水、怎么和面、怎么切面条、烧开水、煮面、吃面；面向对象：找到一个面馆、叫一碗面、等着吃）。

在ES6之前，JavaScript没有类的概念，但是可以使用函数来进行模拟，从而产生可复用的对象创建方式。

**创建对象的方式**：工厂模式、构造函数模式、原型模式、组合使用构造函数模式和原型模式、动态原型模式、寄生构造函数模式。

```javascript
//工厂模式：就是使用一个函数来创建对象
function createObject(name){
    var o = new Object();
    o.name = name;
    return o;
}
var o1 = createObject("test1");
var o2 = createObject("test2");
console.log(o1,o2);

//构造函数模式：js每个函数都可以作为构造函数，只要一个函数是通过new来调用的，那么就可以把它成为构造函数。
function createObject(name){
    this.name = name;
}
var o1 = new createObject("test11");
var o2 = new createObject("test22");
console.log(o1,o2);

//原型模式：因为每个函数都有一个prototype属性，这个属性是一个对象，


```





## 数据类型

## 基础（操作符new/隐式转换/）

## 作用域/执行上下文/闭包作用域/执行上下文/闭包

## this/call/apply/bind

## 原型/原型链/继承

## 事件循环

## 异步编程/Promise/async和await/并发/并行

## Proxy

## ES6新特性（数组常用方法区别）

## Ajax/网络协议

## 垃圾回收与内存泄漏



# 常见问题



***附录：***

[JavaScript代码的三种引入方式【操作演示】 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/617704546)

[ JavaScript篇_w3cschool](https://www.w3cschool.cn/web_interview/web_interview-u8jo3pu4.html)

