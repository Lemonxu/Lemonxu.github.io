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



## 面向对象/设计模式/BOM/DOM

### 面向对象

#### 创建对象方式

面向对象和面向过程都是编程思想。面向对象其实是面向过程的一种封装，例如：我要吃面条（面向过程：用多少面粉、多少水、怎么和面、怎么切面条、烧开水、煮面、吃面；面向对象：找到一个面馆、叫一碗面、等着吃）。

在ES6之前，JavaScript没有类的概念，但是可以使用函数来进行模拟，从而产生可复用的对象创建方式。

**创建对象的方式**：工厂模式、构造函数模式、原型模式、组合使用构造函数模式和原型模式、动态原型模式、寄生构造函数模式；还有一些通过：{}、new Object()、使用字面量这三种都属于创建对象，只是这三种的都存在2个问题，一是代码冗余，二是对象中的方法不能共享，每个方法都是独立的。

```javascript
//工厂模式
//就是使用一个函数来创建对象
function createObject(name){
    var o = new Object();
    o.name = name;
    return o;
}
var o1 = createObject("test1");
var o2 = createObject("test2");
console.log(o1,o2);

//构造函数模式(constructor)
//js每个函数都可以作为构造函数，只要一个函数是通过new来调用的，那么就可以把它成为构造函数。
function createObject(name){
    this.name = name;
}
var o1 = new createObject("test11");
var o2 = new createObject("test22");
console.log(o1,o2);
console.log(o1.prototype.constructor == createObject); //true

//原型模式(prototype)
//因为每个函数都有一个prototype属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性方法。
/*这种方式解决了函数的复用问题，但这种模式也存在一些问题，一个是没有办法通过传入参数来初始化值，另一个如果存在一个引用类型如Array这样的值，那么一个实例对引用值改变会影响所有实例。*/
function createObject() {}
createObject.prototype.name = "test";
var o1 = new createObject();
console.log(o1);
console.log(createObject.prototype.constructor == createObject); //true

//组合使用构造函数模式和原型模式
/*解决原型模式的问题，构造函数初始化对象属性，共享引用类型数据导致数据错乱*/
function createObject(name) {
    this.name = name;
}
createObject.prototype = {
    constructor: createObject,
    sayName: function(){
        console.log(this.name)
    }
}
var o1 = new createObject("test1");
var o2 = new createObject("test2");
console.log(o1);
console.log(o2);

//动态原型模式
//这种模式将原型方法赋值创建过程移到了构造函数的内部，通过对属性是否存在的判断，实现仅在第一次调用函数时对原型对象赋值一次的效果。
//这种方式很好的对上面的混合模式进行了封装
function createObject(name){
    this.name = name;
    //方法，仅会在需要时运行（一般是初次运行时）
    if(typeof this.sayName != "function"){
        createObject.prototype = {
            constructor: createObject,
            sayName: function(){
                console.log(this.name);
            }
        }
        return new createObject(name); //初次运行时，重新调用构造函数返回
    }
}
var o1 = new createObject("test1");
var o2 = new createObject("test2");
console.log(o1, o2);
o1.sayName(); //如果函数中没有return new createObject(name);则会显示Uncaught TypeError: p1.sayName is not a function
o2.sayName(); //test2

//寄生构造函数模式
//这种模式和工厂模式的实现基本相同，它主要是基于一个已有的类型，在实例化时对实例化的对象进行扩展。
//例子1
function createObject(name){
    var o = new Object();
    o.name = name;
    return o;
}
//例子2
function SpecialArray() {
  // 创建数组
  var arr = new Array();
  // 添加值
  arr.push.apply(arr, arguments);
  // 添加方法
  arr.toPipedString = function() {
    return this.join("|");
  }
  return arr;
}
var colors = new SpecialArray('red', 'blue', 'green');
console.log(colors.toPipedString()); // "red|blue|green"


```

#### 对象的继承方式

对象的继承方式主要有：原型链继承、借用构造函数方式、组合继承、原型式继承、寄生式继承、寄生式组合继承。

```javascript
//以原型链的方式实现继承
/*缺点就是在包含引用类型的数据时，会被所有的实例对象所共享，容易造成数据混乱，还有就是不能向超类型传递参数*/


//借用构造函数的方式继承
/*通过在自来性的函数中调用超类型的构造函数来实现，解决不能向抄来性传递参数的缺点，但无法实现函数方法复用，并且超类型原型定义的方法子类型也无法访问*/

//组合继承
//组合继承是将原型链和借用构造函数组合起来使用的一种方式。借用构造函数的方式来实现类型的属性继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。
/*解决了上面两种模式单独使用时的问题，但由于我们是以超类型的实例来作为子类的原型。所以调用了两次超类的构造函数，造成子类型的袁兴中多了很多不必要的属性*/

//原型式继承
//主要思路就是基于已有的对象来创建新的对象，实现原理就是向函数中传入一个对象，然后返回以这个对象为原型的对象。这种继承思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单的继承。ES5中定义的Object.create()就是原型式继承。
/*缺点和原型链方式相同*/

//寄生式继承
//思路是创建一个用于封装继承过程的函数，传入一个对象，然后复制对象的副本，然后对对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解成一种继承。
/*优点是对一个简单对象实现继承，如果这个对象不是自定义类型时。缺点就是没有办法实现函数的复用*/

//寄生式组合继承
/*组合继承的缺点是使用超类型的实例作为子类型的原型，导致增加了不必要的原型属性。寄生式组合继承的方式就是使用超类型的原型副本作为子类的原型，避免创建不必要的属性*/
```



### 设计模式

设计模式有：单例模式、工厂模式、适配器模式、装饰器模式、策略模式、观察者模式、发布-订阅模式.

```javascript
```



### BOM

BOM指的是浏览器对象模型，是指把浏览器当做一个对象来对待，这个对象主要定义了与浏览器交互的方法与接口。

BOM的核心就是window，而window对象具有双重角色，它既是通过js访问浏览器窗口的一个接口，又是一个Global（全局）对象。这意味着在网页中定义的任何对象、变量和函数，都作为全局对象的一个属性或方法存在。window对象包含localtion对象、navigator对象、screen对象等子对象，并且DOM最根本的对象document对象也是BOM的window对象的子对象。



### DOM

DOM指的是文档对象模型，是指把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口。



## 数据类型

JavaScript的数据类型，共有8中数据类型：undefined、null、Boolean、Number、String、Object、Symbol、BigInt。

其中Symbol和BigInt是ES6新增的数据类型：

**Symbol**代表创建后独一无二且不可变的数据类型，主要为了解决可能出现的全局变量冲突的问题;

**BigInt**是一种数字类型，可以表示任意精度格式的整数，使用BigInt可以安全地存储和操作大数据，即使这个数已经超出了Number能够表示的安全整数范围。

数据可以分为：原始数据类型和引用数据类型。

栈（原始数据类型）：`undefined、null、Boolean、Number、String、Symbol、BigInt`；



堆（引用数据类型）：`对象Object、数组Array、函数`；





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

[JS 常用的六种设计模式介绍 - 掘金 (juejin.cn)](https://juejin.cn/post/7061987842473345061#heading-2)
