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

小提示：箭头函数是无法new的，因为它没有prototype，也没有自己的this指向，更不可能有arguments参数。

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

值属性（全局属性返回一个简单值）: undefined、null、Infinity、NaN字面量等；

函数属性（不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者）：eval()、parseInt()、parseFloat()等；

基本对象（是定义或调用其他对象的基础，一般包括对象、函数对象和错误对象）：Object、Function、Boolean、Symbol、Error等；

数字和日期对象（数字、日期对象和执行数学计算的对象）：Number、Math、Date等；

字符串（用来表示和字符串操作的对象）：String、RegExp等；

可索引的集合对象（表示按照索引值类排序的数据集合，包括数组和类型数组，以及类数组结构的对象）：Array等；

使用键的集合对象（集合在存储数据时会使用到键，支持按照插入顺序来迭代元素）：Map、Set、WeakMap、WeakSet等；

矢量集合：SIMD等；

结构化数据：JSON等；

控制抽象对象：Promise、Generator等；

反射：Proxy、Reflect等

国际化（支持多语言）：Intl、Intl.Collator等；

WebAssembly：

其他：例如 arguments

## 作用域/执行上下文/闭包

### 闭包

指的是有权访问另一个函数作用域中的变量的函数。

创建闭包的最常见的方式是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。

闭包有两个常用的用途：一是使我们在函数外部能够访问到函数内部的变量；二是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

```javascript
//函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包
function A() {
  let a = 1
  window.B = function () {
      console.log(a)
  }
}
A()
B() // 1

/*循环中使用闭包解决 var 定义函数的问题*/
//立即执行函数(使用闭包的方式)
for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j)
        }, j * 1000)
    })(i)
}
//使用 setTimeout 的第三个参数，这个参数会被当成 timer函数的参数传入
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(j) {
        console.log(j)
    }, i * 1000, i)
}
//使用 let 定义 i 了来解决问题了，这个也是最为推荐的方式

```

### 作用域/作用域链

**全局作用域**：最外层函数和最外层函数外面定义的变量拥有全局作用域，所有未定义直接赋值的变量自动声明为全局作用域，所有window对象的属性拥有全局作用域，所有window对象的属性拥有全局作用域；

**函数作用域**：函数作用域声明在函数内部的变零，一般只有固定的代码片段可以访问到，作用域是分层的，内层作用域可以访问外层作用域，反之不行。

**块级作用域**：使用ES6中新增的let和const指令可以声明块级作用域，块级作用域可以在函数中创建也可以在一个代码块中的创建（由 `{ }`包裹的代码片段），使用ES6中新增的let和const指令可以声明块级作用域，块级作用域可以在函数中创建也可以在一个代码块中的创建（由 `{ }`包裹的代码片段），在循环中比较适合绑定块级作用域，这样就可以把声明的计数器变量限制在循环内部。

**作用域链**：在当前作用域中查找所需变量，但是该作用域没有这个变量，那这个变量就是自由变量。如果在自己作用域找不到该变量就去父级作用域查找，依次向上级作用域查找，直到访问到window对象就被终止，这一层层的关系就是作用域链。

作用域链的作用是**保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，可以访问到外层环境的变量和函数。**作用域链的本质上是一个指向变量对象的指针列表。

### 对执行上下文的理解

**全局执行上下文**：任何不在函数内部的都是全局执行上下文，它首先会创建一个全局的window对象，并且设置this的值等于这个全局对象，一个程序中只有一个全局执行上下文；

**函数执行上下文**：当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个；

`eval`**函数执行上下文**：执行在eval函数中的代码会有属于他自己的执行上下文，不过eval函数不常使用。



### this/call/apply/bind

#### **对this对象的理解**

this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。

在实际开发中，this 的指向可以通过四种调用模式来判断：**函数调用模式**（当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象）；**方法调用模式**（如果一个函数作为一个对象的方法来调用时，this 指向这个对象）；**构造器调用模式**（如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象）；**apply 、 call 和 bind 调用模式**（这三个方法都可以显示的指定调用函数的 this 指向）

call() 和 apply() 的区别：apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply 方法把这个集合中的元素作为参数传递给被调用的函数；call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依次传入函数。

#### **call 函数的实现步骤**

```js
1、判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2、判断传入上下文对象是否存在，如果不存在，则设置为 window 。
3、处理传入的参数，截取第一个参数后的所有参数。
4、将函数作为上下文对象的一个属性。
5、使用上下文对象来调用这个方法，并保存返回结果。
6、删除刚才新增的属性。
7、返回结果。

Function.prototype.myCall = function(context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
    result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
```

#### **apply 函数的实现步骤**

```js
1、判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2、判断传入上下文对象是否存在，如果不存在，则设置为 window 。
3、将函数作为上下文对象的一个属性。
4、判断参数值是否传入
5、使用上下文对象来调用这个方法，并保存返回结果。
6、删除刚才新增的属性
7、返回结果

Function.prototype.myApply = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};
```

#### **bind 函数的实现步骤**

```js
1、判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2、保存当前函数的引用，获取其余传入参数值。
3、创建一个函数返回
4、函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。

Function.prototype.myBind = function(context) {
  // 判断调用对象是否为函数
  if(typeof this !== 'function'){
    console.error('err')
  }
  let args = [...arguments].slice(1)
  let fn = this
  const func = function(){
    return fn.apply(this instanceof fn ? this:context, args.concat([...arguments]))
  }
  func.prototype = Object.create(fn.prototype)
  func.prototype.constructor = func
  return func
};
```



## 原型/原型链/继承

原型：当使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。

原型链：当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。（原型链的尽头一般来说都是 Object.prototype ）。

继承指的是对象的继承，指的是子对象能够使用父级对象的事件。



## 事件循环

1、JavaScript是单线程，非阻塞的。

2、浏览器事件循环：执行栈和事件队列；宏任务（macrotask）和微任务（microtask）。

宏任务：script(整体代码)、setTimeout()、setInterval()、postMessage、I/O、UI交互事件、MessageChannel、setImmediate(Node.js 环境)；

微任务：new Promise().then(回调)、MutationObserver(html5 新特性)、Object.observe、process.nextTick(Node.js 环境)。

在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的。

运行顺序：执行一个宏任务（栈中没有就从事件队列中获取）；执行过程中如果遇到微任务，就将它添加到微任务的任务队列中；宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）；当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染；渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）。

执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。

3、node环境下的事件循环：表现出的状态与浏览器大致相同。不同的是 node 中有一套自己的模型。node 中事件循环的实现依赖 libuv 引擎。Node的事件循环存在几个阶段（如果是node10及其之前版本，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask队列中的任务；node版本更新到11之后，Event Loop运行原理发生了变化，一旦执行一个阶段里的一个宏任务(setTimeout,setInterval和setImmediate)就立刻执行微任务队列，跟浏览器趋于一致。



## 异步编程/Promise/async和await/并发/并行

### JavaScript中的异步机制

可以分为以下几种：

**回调函数** 的方式（使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护）；

**Promise** 的方式（使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确）；

**generator** 的方式（它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来）；

```js
 function* generatorForLoop(num) {
    for (let i = 0; i < num; i += 1) {
        yield console.log(i, "generator");
    }
}

const genForLoop = generatorForLoop(5);

genForLoop.next(); // 首先 console.log —— 0
genForLoop.next(); // 1
genForLoop.next(); // 2
genForLoop.next(); // 3
genForLoop.next(); // 4
```

**async 函数** 的方式(async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行)。

### setTimeout、Promise、Async/Await 的区别

```js
//setTimeout
console.log('script start') //1. 打印 script start
setTimeout(function(){
    console.log('settimeout')   // 4. 打印 settimeout
})  // 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
console.log('script end')   //3. 打印 script start
// 输出顺序：script start->script end->settimeout

//Promise:Promise本身是同步的立即执行函数， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行，打印p的时候，是打印的返回结果，一个Promise实例。
console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout

//async/await
//async/await其实是 Generator 的语法糖，能实现的效果都能用then链来实现（它是为优化then链而开发出来的）
//async 返回的是一个Promise对象
//await 等待的如果不是一个Promise对象，那运算结果就是它等到的东西，如果是promise对象，那等的就是resolve得到的值
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start');
async1();
console.log('script end')
// 输出顺序：script start->async1 start->async2->script end->async1 end

//async/await 相对promise的优势
/*
Promise传递中间值⾮常麻烦，⽽async/await⼏乎是同步的写法，⾮常优雅
错误处理友好，async/await可以⽤成熟的try/catch，Promise的错误捕获⾮常冗余
*/

```

### 对Promise的理解

Promise的实例有**三个状态**：Pending（进行中）、Resolved（已完成）、Rejected（已拒绝）。

优点：对象的状态不受外界影响，一旦状态改变就不会再变，任何时候都可以得到这个结果。

缺点：无法取消Promise，一旦新建它就会立即执行，无法中途取消。无法取消Promise，一旦新建它就会立即执行，无法中途取消。当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

Promise有五个常用的方法：then()、catch()、all()、race()、finally。

```js

const promise1 = new Promise(function(resolve, reject) {
    // resolve({ success: "成功" }, { success: "成功2号" })
    reject({ error: "失败" });
    //resolve和reject同时存在的时候，只有resolve有效果，也就是then有返回。
});
const promise2 = new Promise(function(resolve, reject) {
    resolve({ success: "成功+++1" })
    // reject({ error: "失败+++1" });
});
const promise3 = new Promise(function(resolve, reject) {
    // resolve({ success: "成功~~~~~1" })
    reject({ error: "失败~~~~~1" });
});

//then()
promise1.then(function (value) {
    console.log(value);
}, function (error) { //这个和catch都有的时候执行这个函数
    console.log(error)
}).catch((error) => { //then没有第二个函数的时候执行catch（catch方法还有一个作用，就是在执行 resolve回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入 catch方法中）
    console.log(error, "第二次失败")
});

//all()
Promise.all([promise1,promise2,promise3]).then(res=>{
    console.log(res);  //全部resolve才会返回，否则全部在异常里面返回
}).catch((error) => {
    console.log(error); //只要有一个失败就在这里返回
})

//race()：是赛跑的意思，只返最先执行完的那个状态，成功返回resolved，失败返回rejected
Promise.race([promise1, promise2, promise3]).then(res => {
    console.log(res, "race");
}, rej => {
    console.log(rej, "race")
})

//finally()：不依赖于 Promise 的执行结果，也就是resolved和rejected都会执行，且只执行1次。
```



### 并发与并行的区别

**并发**是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。

**并行**是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。



## Proxy

Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。

new Proxy(target, handler)：target为需要代理的对象，handler传的是具体的get、set方法

```js
const watchProxy = (obj) => {
    return new Proxy(obj, {
        get(target, property, receiver){
            console.log(target, property, receiver, "get-watch");
            return Reflect.get(target, property, receiver); //返回对象的属性
        },
        set(target, property, value, receiver) {
            console.log(target, property, value, receiver, "set-watch");
            return Reflect.set(target, property, value, receiver); //设置对象的属性
        }
    })
}

let p1 = watchProxy(obj);
p1.a = "重新测试"
console.log(p1, p1.a);
```



## ES6新特性（常用方法区别）

1、**let、const、var：** *块级作用域*（let、const有；var没有）、*存在变量提升*（var有变量提升；let、const没有，即在变量只能在声明之后使用，否在会报错）、*添加全局属性*（var声明的变量为全局，**：**浏览器的全局对象是window，Node的全局对象是global）、*重复声明*（const和let不允许重复声明变量；var可以重复声明，后声明的同名变量会覆盖之前声明的遍历）、*存在暂时性死区*（let、const命令声明变量之前，该变量都是不可用的；var声明的变量不存在暂时性死区）、*设置初始值*（var 和 let 可以不用设置初始值；const声明变量必须设置初始值）、*指针指向*（ let创建的变量是可以更改指针指向（可以重新赋值）；const声明的变量是不允许改变指针的指向）；

2、**箭头函数与普通函数的区别**：箭头函数比普通函数更加简洁；箭头函数比普通函数更加简洁；箭头函数继承来的this指向永远不会改变；call()、apply()、bind()等方法不能改变箭头函数中this的指向（），this是捕获其所在上下⽂的 this 值，作为⾃⼰的 this 值；箭头函数不能作为构造函数使用；箭头函数没有自己的arguments；箭头函数没有prototype；箭头函数不能用作Generator函数，不能使用yeild关键字。

3、**扩展运算符（...）的作用及使用场景**：对象扩展运算符（扩展运算符对对象实例的拷贝属于浅拷贝）、数组扩展运算符（数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每次只能展开一层数组）。

4、**模板语法：**在模板字符串中，空格、缩进、换行都会被保留；模板字符串完全支持“运算”式的表达式，可以在${}里完成一些计算。

5、**Map**：ES6提供的Map数据结构类似于对象，但是它的键不限制范围，可以是任意类型，是一种更加完善的Hash结构。实际上Map是一个数组，它的每一个数据也都是一个数组。（有以下操作方法：size、set(key,value)、get(key)、has(key)、delete(key)、clear()；遍历方法：keys()、values()、entries()、forEach()）。

6、**模块Module**：和CommonJS模块区别（CommonJS是对模块的浅拷⻉、ES6 Module是对模块的引⽤，即ES6 Module只存只读，不能改变其值，也就是指针指向不能变，类似const；import的接⼝是read-only（只读状态），不能修改其变量值）；和CommonJS模块的共同点（都可以对引⼊的对象进⾏赋值，即对对象内部属性的值进⾏改变；CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。CommonJS 模块是运行时加载，ES6 模块是编译时输出接口；CommonJs 是单个值导出，ES6 Module可以导出多个；CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层；CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined）。

7、**for...of遍历**：ES6新增的遍历方式，允许遍历一个含有iterator接口的数据结构（数组、对象等）并且返回各项的值，普通的对象用for..of遍历是会报错的。

8、**Symbol 和 BigInt** ：数据类型



## Ajax/网络协议

### Ajax









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

[33. SIMD - 概述 - 《阮一峰 ECMAScript 6 (ES6) 标准入门教程 第三版》 - 书栈网 · BookStack](https://www.bookstack.cn/read/es6-3rd/spilt.1.docs-simd.md)

[高频面试题：JavaScript事件循环机制解析 - 简书 (jianshu.com)](https://www.jianshu.com/p/23fad3814398)
