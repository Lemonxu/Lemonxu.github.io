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

#### 数据类型种类（8种）

JavaScript的数据类型，共有8中数据类型：undefined、null、Boolean、Number、String、Object、Symbol、BigInt。

其中Symbol和BigInt是ES6新增的数据类型：

**Symbol**代表创建后独一无二且不可变的数据类型，主要为了解决可能出现的全局变量冲突的问题;

**BigInt**是一种数字类型，可以表示任意精度格式的整数，使用BigInt可以安全地存储和操作大数据，即使这个数已经超出了Number能够表示的安全整数范围。

数据可以分为：原始数据类型和引用数据类型。

栈（stack）（原始数据类型）：`undefined、null、Boolean、Number、String、Symbol、BigInt`；

原始数据类型直接存储在栈中的简单数据段，占据空间小、大小固定，属于被频繁使用的数据，所以放入栈中存储。在数据结构中，栈中的数据存储方式是先进后出。

堆（heap）（引用数据类型）：`对象Object、数组Array、函数`；

引用数据类型存储在堆中的对象，占据空间大，大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。在数据结构中，堆是一个优先队列，是按照优先级来进行排序的，优先级可以按照大小来规定。

（操作系统内存被分为栈区和堆区：栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似数据结构中的栈；堆区内存一般由开发者分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收。）

**null和undefined的区别**：两者都属于基本数据类型，分别只有一个值。

undefined代表未定义，null代表的是空对象。

typeof null会返回Object。undefined的值是（-2）30（一个超出整数范围的数字）；null的机器码是NULL指针（null指针的值全是0，也就是null的类型标签为000，和Object的类型标签一样，所以会被判定为Object）。

Boolean(布尔类型的假值)：undefined、null、+0、-0、false、""、NaN。



#### 数据类型检测方法（4种）

- **typeof**

```javascript
console.log(typeof 2); //number
console.log(typeof true); //boolean
console.log(typeof 'str'); //string
console.log(typeof []); //object
console.log(typeof function(){}); //function
console.log(typeof {});  //object
console.log(typeof undefined);  //undefined
console.log(typeof null); //object
console.log(typeof NaN); //number
```

- **instanceof**

可以正确判断对象类型，内部运行机制是判断在其原型链中是否能找到该类型的原型。

`instanceof`只能正确判断引用数据类型，而不能判断基本数据类型。`instanceof`运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的`prototype`属性。

```javascript
console.log(2 instanceof Number); //false
console.log(true instanceof Boolean); //false
console.log('str' instanceof String); //false

console.log([] instanceof Array); //true
console.log(function(){} instanceof Function); //true
console.log({} instanceof Object);  //true
```

实现原理：instanceof用于判断构造函数的prototype属性是否出现在对象的原型链中的任何位置。

```javascript
function myInstanceof(left, right) { //left:对象，right构造函数
    //获取对象的原型
    let proto = Object.getPrototypeOf(left);
    //获取构造函数的prototype对象
    let prototype = right.prototype;
    
    //判断构造函数的prototype对象是否在对象的原型链上
    while(true){
        if(!proto) return false;
        if(proto === prototype) return true;
        //如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
        proto = Object.getPrototypeOf(proto);        
    }
}

//报错提示：Javascript错误提示--SyntaxError: Illegal return statement
//表示js的return语句只能放在function中，否则就会报错。
```

- **constructor**

`constructor`有2个作用：一个是判断数据的类型，二是对象示例通过`constructor`对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了。

```javascript
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); //true
console.log(('str').constructor === String); //true
console.log(([]).constructor === Array); //true
console.log((function() {}).constructor === Function); //true
console.log(({}).constructor === Object);  //true

function Fn(){};
Fn.prototype = new Array();
var f = new Fn();
console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true
```

- **Object.prototype.toString.call()**

`Object.prototype.toString.call()`是通过Object对象原型方法toString来判断数据类型。

`obj.toString()`的结果和`Object.prototype.toString.call(obj)`的结果不一样：toString是Object的原型方法，而Array、Function等类型作为Object的实例，都重写了toString方法。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串...)，而不会去调用Object原型上的toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象具体的类型应调用Object原型上的toString方法。

```javascript
var a = Object.prototype.toString;

console.log(a.call(2)); //[object Number]
console.log(a.call(true)); //[object Boolean]
console.log(a.call('str')); //[object String]
console.log(a.call([])); //[object Array]
console.log(a.call(function(){})); //[object Function]
console.log(a.call({})); //[object Object]
console.log(a.call(undefined)); //[object Undefined]
console.log(a.call(null)); //[object Null]
```

#### 判断数组方式（5种）

```javascript
//通过Object.prototype.toString.call()判断
Object.prototype.toString.call(obj) == "[object Array]"; //true或者false
Object.prototype.toString.call(obj).slice(8, -1) == "Array"; //true或者false，其中slice(8, -1)截取其中的Array字符串

//通过instanceof做判断
obj instanceof Array; //true或者false

//通过原型链做判断
obj.__proto__ === Array.prototype; //true或者false
obj.constructor === Array; //true或者false

//通过ES6的Array.isArray()做判断
Array.isArray(obj); //true或者false

//通过Array.prototype.isPrototypeOf
Array.prototype.isPrototypeOf(obj); //true或者false

```

## 基础（操作符new/隐式转换）

### 隐式转换规则

当隐式转换为number时，在ToPrimitive中优先查找obj的valueOf方法，如果为原始值，则返回，否则调用obj的toString方法，如果为原始值则返回，否则抛出TypeError异常。

当隐式转换为string时，在ToPrimitive中优先查找toString方法，如果为原始值则返回，否则调用obj的valueOf方法，如果有原始值则返回，否则抛出TypeError异常。

如果对象为Date，默认转化为string，其他情况下默认number。

```javascript
// + 操作符：如果有string，优先string类型，其他情况下两边会被转换number
1+'23' //'123'
1+false //1
1+Symbol() //Uncaught TypeError: Cannot convert a Symbol value to a number
'1'+false //1false
false+true //1

// -、*、/ 操作符：默认转化为number，NaN也是数字类型
1*'23' //23
1*false //0
1 / 'aa' //NaN
1/0 //Infinity

// == 操作符：两遍都尽量转换成number
3 == true //false, 3转化为number为3，true转化为number为1
'0' == false //true, '0'转化为number为0，false转化为number为0

// > 和 < 比较符：都是字符串，字母按照字母表顺序比较，其他转化为数字
'a' < 'b' // true
'a' < 'b' // true
false > -1 // true
var a = {};a > 2 // false 

/*
过程解释：
a.valueOf() // {}, 上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步
a.toString() // "[object Object]"，现在是一个字符串了
Number(a.toString()) // NaN，根据上面 < 和 > 操作符的规则，要转换成数字
NaN > 2 //false，得出比较结果
*/
```

### 操作符new

new操作符的执行过程：

1、创建一个新的空对象；

2、设置原型，将对象的原型设置为函数的prototype对象；

3、让函数的this指向这个对象，执行构造函数的代码（为这个新对象添加属性）；

4、判断函数的返回值类型，如果是值类型，返回创建对象；如果是引用类型，返回引用类型的对象。

```javascript
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag = result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数, 初始化参数);
```

### 内置对象

js内置对象主要指的是在程序执行前存在全局作用域里的由js定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。

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

## 0.1+0.2 !==  0.3如何让其相等

精度丢失问题

```javascript
//使用Number.EPSILON
function numberepsilon(arg1, arg2){
    return Math.abs(arg1 - arg2) < Number.EPSILON;
}
console.log(numberepsilon(0.1+0.2, 0.3)) //true
```





***附录：***

[JavaScript代码的三种引入方式【操作演示】 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/617704546)

[ JavaScript篇_w3cschool](https://www.w3cschool.cn/web_interview/web_interview-u8jo3pu4.html)

[JS 常用的六种设计模式介绍 - 掘金 (juejin.cn)](https://juejin.cn/post/7061987842473345061#heading-2)
