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

设计模式分类为创建型（单例模式、原型模式、工厂模式、抽象工厂模式、建造者模式）、结构型（适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式）、行为型（观察者模式、迭代器模式、策略模式、模板方法模式、职责链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、发布-订阅模式）。

#### 创建型

（单例模式、原型模式、工厂模式、抽象工厂模式、建造者模式）

```javascript
//单例模式
/*
优点：划分命名空间，减少全局变量；增强模块性，把自己的代码组织在一个全局变量名下，放在单一位置，便于维护；且只会实例化一次。简化了代码的调试和维护。
缺点：由于单例模式提供的是一种单点访问，所以它有可能导致模块间的强耦合 从而不利于单元测试。无法单独测试一个调用了来自单例的方法的类，而只能把它与那个单例作为一个单元一起测试。
场景例子：定义命名空间和实现分支型方法、登录框、vuex 和 redux中的store
*/
class LoginForm {
    constructor() {
        this.state = 'hide'
    }
    show() {
        if (this.state === 'show') {
            alert('已经显示')
            return
        }
        this.state = 'show'
        console.log('登录框显示成功')
    }
    hide() {
        if (this.state === 'hide') {
            alert('已经隐藏')
            return
        }
        this.state = 'hide'
        console.log('登录框隐藏成功')
    }
 }
 LoginForm.getInstance = (function () {
     let instance
     return function () {
        if (!instance) {
            instance = new LoginForm()
        }
        return instance
     }
 })()
let obj1 = LoginForm.getInstance()
obj1.show()
let obj2 = LoginForm.getInstance()
obj2.hide()
console.log(obj1 === obj2)

//原型模式：（prototype）是指用原型实例指向创建对象的种类，并且通过拷贝这些原型创建新的对象，就是创建一个共享的原型，通过拷贝这个原型来创建新的类，用于创建重复的对象，带来性能上的提升
class Person {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}
class Student extends Person {
  constructor(name) {
    super(name)
  }
  sayHello() {
    console.log(`Hello， My name is ${this.name}`)
  }
}

let student = new Student("xiaoming")
student.sayHello()

//工厂模式
/*
优点：创建对象的过程可能很复杂，但我们只需要关心创建结果；构造函数和创建者分离, 符合“开闭原则”。一个调用者想创建一个对象，只要知道其名称就可以了。扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。
缺点：添加新产品时，需要编写新的具体产品类,一定程度上增加了系统的复杂度；考虑到系统的可扩展性，需要引入抽象层，在客户端代码中均使用抽象层进行定义，增加了系统的抽象性和理解难度。

*/
class Product {
    constructor(name) {
        this.name = name
    }
    init() {
        console.log('init')
    }
    fun() {
        console.log('fun')
    }
}
class Factory {
    create(name) {
        return new Product(name)
    }
}
// use
let factory = new Factory()
let p = factory.create('p1')
p.init()
p.fun()

//抽象工厂模式

//建造者模式

```

#### 结构型

（适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式）

```javascript
//适配器模式
/*
将一个类的接口转化为另外一个接口，以满足用户需求，使类之间接口不兼容问题通过适配器得以解决
优点：可以让任何两个没有关联的类一起运行；提高了类的复用；适配对象，适配库，适配数据；
缺点：额外对象的创建，非直接调用，存在一定的开销（且不像代理模式在某些功能点上可实现性能优化)；如果没必要使用适配器模式的话，可以考虑重构，如果使用的话，尽量把文档完善。
场景：整合第三方SDK、封装旧接口
*/
// 自己封装的ajax， 使用方式如下
ajax({
    url: '/getData',
    type: 'Post',
    dataType: 'json',
    data: {
        test: 111
    }
}).done(function() {})
// 因为历史原因，代码中全都是：
// $.ajax({....})

// 做一层适配器
var $ = {
    ajax: function (options) {
        return ajax(options)
    }
}

//代理模式：是为一个对象提供一个代用品或占位符，以便控制对它的访问
/*
优点：代理模式能将代理对象与被调用对象分离，降低了系统的耦合度。代理模式在客户端和目标对象之间起到一个中介作用，这样可以起到保护目标对象的作用；代理对象可以扩展目标对象的功能；通过修改代理对象就可以了，符合开闭原则。
缺点：处理请求速度可能有差别，非直接访问存在开销
不同点：装饰者模式实现上和代理模式类似，装饰者模式： 扩展功能，原有功能不变且可直接使用；代理模式： 显示原有功能，但是经过限制之后的。
场景：HTML元 素事件代理、ES6 的 proxy、jQuery.proxy()方法
*/
<ul id="ul">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
<script>
  let ul = document.querySelector('#ul');
  ul.addEventListener('click', event => {
    console.log(event.target);
  });
</script>

//装饰器模式：动态地给某个对象添加一些额外的职责，是一种实现继承的替代方案；在不改变原对象的基础上，通过对其进行包装扩展，使原有对象可以满足用户的更复杂需求，而不会影响从这个类中派生的其他对象
/*
优点：装饰类和被装饰类都只关心自身的核心业务，实现了解耦；方便动态的扩展功能，且提供了比继承更多的灵活性。
缺点：多层装饰比较复杂；常常会引入许多小对象，看起来比较相似，实际功能大相径庭，从而使得我们的应用程序架构变得复杂起来；
场景：比如现在有4 种型号的自行车，我们为每种自行车都定义了一个单独的类。现在要给每种自行车都装上前灯、尾灯和铃铛这3 种配件。如果使用继承的方式来给每种自行车创建子类，则需要 4×3 = 12 个子类。但是如果把前灯、尾灯、铃铛这些对象动态组合到自行车上面，则只需要额外增加3 个类；ES7 Decorator；core-decorators。
*/
class Cellphone {
    create() {
        console.log('生成一个手机')
    }
}
class Decorator {
    constructor(cellphone) {
        this.cellphone = cellphone
    }
    create() {
        this.cellphone.create()
        this.createShell(cellphone)
    }
    createShell() {
        console.log('生成手机壳')
    }
}
let cellphone = new Cellphone()
cellphone.create()
console.log('------------')
let dec = new Decorator(cellphone)
dec.create()

//外观模式：为子系统的一组接口提供一个一致的界面，定义了一个高层接口，这个接口使子系统更加容易使用
/*
优点：减少系统相互依赖；提高灵活性；提高了安全性。
缺点：不符合开闭原则，如果要改东西很麻烦，继承重写都不合适。
场景：设计初期，应该要有意识地将不同的两个层分离，比如经典的三层结构，在数据访问层和业务逻辑层、业务逻辑层和表示层之间建立外观Facade；在开发阶段，子系统往往因为不断的重构演化而变得越来越复杂，增加外观Facade可以提供一个简单的接口，减少他们之间的依赖；在维护一个遗留的大型系统时，可能这个系统已经很难维护了，这时候使用外观Facade也是非常合适的，为系系统开发一个外观Facade类，为设计粗糙和高度复杂的遗留代码提供比较清晰的接口，让新系统和Facade对象交互，Facade与遗留代码交互所有的复杂工作。
*/
let addMyEvent = function (el, ev, fn) {
    //兼容浏览器事件绑定
    if (el.addEventListener) {
        el.addEventListener(ev, fn, false)
    } else if (el.attachEvent) {
        el.attachEvent('on' + ev, fn)
    } else {
        el['on' + ev] = fn
    }
};
let myEvent = {
    //封装接口
    stop: e => {
        e.stopPropagation();
        e.preventDefault();
    }
};

//桥接模式：将抽象部分与它的实现部分分离，使它们都可以独立地变化
/*
优点：有助于独立地管理各组成部分， 把抽象化与实现化解耦；提高可扩充性。
缺点：大量的类将导致开发成本的增加，同时在性能方面可能也会有所减少。
*/
class Color {
    constructor(name){
        this.name = name
    }
}
class Shape {
    constructor(name,color){
        this.name = name
        this.color = color 
    }
    draw(){
        console.log(`${this.color.name} ${this.name}`)
    }
}
let red = new Color('red')
let yellow = new Color('yellow')
let circle = new Shape('circle', red)
circle.draw()
let triangle = new Shape('triangle', yellow)
triangle.draw()

//组合模式：将对象组合成树形结构，以表示“整体-部分”的层次结构；通过对象的多态表现，使得用户对单个对象和组合对象的使用具有一致性
/*
缺点：如果通过组合模式创建了太多的对象，那么这些对象可能会让系统负担不起
场景：表示对象-整体层次结构；希望用户忽略组合对象和单个对象的不同，用户将统一地使用组合结构中的所有对象（方法）。
*/
class TrainOrder {
	create () {
		console.log('创建火车票订单')
	}
}
class HotelOrder {
	create () {
		console.log('创建酒店订单')
	}
}
class TotalOrder {
	constructor () {
		this.orderList = []
	}
	addOrder (order) {
		this.orderList.push(order)
		return this
	}
	create () {
		this.orderList.forEach(item => {
			item.create()
		})
		return this
	}
}
// 可以在购票网站买车票同时也订房间
let train = new TrainOrder()
let hotel = new HotelOrder()
let total = new TotalOrder()
total.addOrder(train).addOrder(hotel).create()

//享元模式：运用共享技术有效地支持大量细粒度对象的复用。系统只使用少量的对象，而这些对象都很相似，状态变化很小，可以实现对象的多次复用。由于享元模式要求能够共享的对象必须是细粒度对象，因此它又称为轻量级模式，它是一种对象结构型模式
/*
优点：大大减少对象的创建，降低系统的内存，使效率提高。
缺点：提高了系统的复杂度，需要分离出外部状态和内部状态，而且外部状态具有固有化的性质， 不应该随着内部状态的变化而变化，否则会造成系统的混乱
场景：文件上传需要创建多个文件实例的时候、如果一个应用程序使用了大量的对象，而这些大量的对象造成了很大的存储开销时就应该考虑使用享元模式
*/
let examCarNum = 0         // 驾考车总数
/* 驾考车对象 */
class ExamCar {
    constructor(carType) {
        examCarNum++
        this.carId = examCarNum
        this.carType = carType ? '手动档' : '自动档'
        this.usingState = false    // 是否正在使用
    }
    /* 在本车上考试 */
    examine(candidateId) {
        return new Promise((resolve => {
            this.usingState = true
            console.log(`考生- ${ candidateId } 开始在${ this.carType }驾考车- ${ this.carId } 上考试`)
            setTimeout(() => {
                this.usingState = false
                console.log(`%c考生- ${ candidateId } 在${ this.carType }驾考车- ${ this.carId } 上考试完毕`, 'color:#f40')
                resolve()                       // 0~2秒后考试完毕
            }, Math.random() * 2000)
        }))
    }
}
/* 手动档汽车对象池 */
ManualExamCarPool = {
    _pool: [],                  // 驾考车对象池
    _candidateQueue: [],        // 考生队列
    /* 注册考生 ID 列表 */
    registCandidates(candidateList) {
        candidateList.forEach(candidateId => this.registCandidate(candidateId))
    },
    /* 注册手动档考生 */
    registCandidate(candidateId) {
        const examCar = this.getManualExamCar()    // 找一个未被占用的手动档驾考车
        if (examCar) {
            examCar.examine(candidateId)           // 开始考试，考完了让队列中的下一个考生开始考试
              .then(() => {
                  const nextCandidateId = this._candidateQueue.length && this._candidateQueue.shift()
                  nextCandidateId && this.registCandidate(nextCandidateId)
              })
        } else this._candidateQueue.push(candidateId)
    },
    /* 注册手动档车 */
    initManualExamCar(manualExamCarNum) {
        for (let i = 1; i <= manualExamCarNum; i++) {
            this._pool.push(new ExamCar(true))
        }
    },
    /* 获取状态为未被占用的手动档车 */
    getManualExamCar() {
        return this._pool.find(car => !car.usingState)
    }
}
ManualExamCarPool.initManualExamCar(3);          // 一共有3个驾考车
ManualExamCarPool.registCandidates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);  // 10个考生来考试
```

#### 行为型

（观察者模式、迭代器模式、策略模式、模板方法模式、职责链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、发布-订阅模式）

```javascript
//观察者模式（发布-订阅模式）:定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使它们能够自动更新自己，当一个对象的改变需要同时改变其它对象，并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式。
/*
优点：支持简单的广播通信，自动通知所有已经订阅过的对象；目标对象与观察者之间的抽象耦合关系能单独扩展以及重用；增加了灵活性；观察者模式所做的工作就是在解耦，让耦合的双方都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化。
缺点：过度使用会导致对象与对象之间的联系弱化，会导致程序难以跟踪维护和理解
场景：DOM事件、vue 响应式
*/
// 主题 保存状态，状态变化之后触发所有观察者对象
class Subject {
  constructor() {
    this.state = 0
    this.observers = []
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
    this.notifyAllObservers()
  }
  notifyAllObservers() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
  attach(observer) {
    this.observers.push(observer)
  }
}
// 观察者
class Observer {
  constructor(name, subject) {
    this.name = name
    this.subject = subject
    this.subject.attach(this)
  }
  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`)
  }
}
let s = new Subject()
let o1 = new Observer('o1', s)
let o2 = new Observer('02', s)
s.setState(12)

//迭代器模式：提供一种方法顺序一个聚合对象中各个元素，而又不暴露该对象的内部标识。
/*
特点：访问一个聚合对象的内容而无需暴露它的内部表示；为遍历不同的集合结构提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作。对于集合内部结果常常变化各异，不想暴露其内部结构的话，但又想让客户代码透明的访问其中的元素，可以使用迭代器模式。
场景：Array.prototype.forEach、jQuery中的$.each()、ES6 Iterator
*/
class Iterator {
    constructor(conatiner) {
        this.list = conatiner.list
        this.index = 0
    }
    next() {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }
    hasNext() {
        if (this.index >= this.list.length) {
            return false
        }
        return true
    }
}
class Container {
    constructor(list) {
        this.list = list
    }
    getIterator() {
        return new Iterator(this)
    }
}
let container = new Container([1, 2, 3, 4, 5])
let iterator = container.getIterator()
while(iterator.hasNext()) {
  console.log(iterator.next())
}


//策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以互相替换
/*
优点:利用组合、委托、多态等技术和思想，可以有效的避免多重条件选择语句;提供了对开放-封闭原则的完美支持，将算法封装在独立的strategy中，使得它们易于切换，理解，易于扩展;利用组合和委托来让Context拥有执行算法的能力，这也是继承的一种更轻便的代替方案
缺点:会在程序中增加许多策略类或者策略对象;要使用策略模式，必须了解所有的strategy，必须了解各个strategy之间的不同点，这样才能选择一个合适的strategy。
场景：如果在一个系统里面有许多类，它们之间的区别仅在于它们的'行为'，那么使用策略模式可以动态地让一个对象在许多行为中选择一种行为；一个系统需要动态地在几种算法中选择一种；表单验证
*/
<html>
<head>
    <title>策略模式-校验表单</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
</head>
<body>
    <form id = "registerForm" method="post" action="http://xxxx.com/api/register">
        用户名：<input type="text" name="userName">
        密码：<input type="text" name="password">
        手机号码：<input type="text" name="phoneNumber">
        <button type="submit">提交</button>
    </form>
    <script type="text/javascript">
        // 策略对象
        const strategies = {
          isNoEmpty: function (value, errorMsg) {
            if (value === '') {
              return errorMsg;
            }
          },
          isNoSpace: function (value, errorMsg) {
            if (value.trim() === '') {
              return errorMsg;
            }
          },
          minLength: function (value, length, errorMsg) {
            if (value.trim().length < length) {
              return errorMsg;
            }
          },
          maxLength: function (value, length, errorMsg) {
            if (value.length > length) {
              return errorMsg;
            }
          },
          isMobile: function (value, errorMsg) {
            if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[7]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
              return errorMsg;
            }                
          }
        }
        
        // 验证类
        class Validator {
          constructor() {
            this.cache = []
          }
          add(dom, rules) {
            for(let i = 0, rule; rule = rules[i++];) {
              let strategyAry = rule.strategy.split(':')
              let errorMsg = rule.errorMsg
              this.cache.push(() => {
                let strategy = strategyAry.shift()
                strategyAry.unshift(dom.value)
                strategyAry.push(errorMsg)
                return strategies[strategy].apply(dom, strategyAry)
              })
            }
          }
          start() {
            for(let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
              let errorMsg = validatorFunc()
              if (errorMsg) {
                return errorMsg
              }
            }
          }
        }

        // 调用代码
        let registerForm = document.getElementById('registerForm')

        let validataFunc = function() {
          let validator = new Validator()
          validator.add(registerForm.userName, [{
            strategy: 'isNoEmpty',
            errorMsg: '用户名不可为空'
          }, {
            strategy: 'isNoSpace',
            errorMsg: '不允许以空白字符命名'
          }, {
            strategy: 'minLength:2',
            errorMsg: '用户名长度不能小于2位'
          }])
          validator.add(registerForm.password, [ {
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于6位'
          }])
          validator.add(registerForm.phoneNumber, [{
            strategy: 'isMobile',
            errorMsg: '请输入正确的手机号码格式'
          }])
          return validator.start()
        }

        registerForm.onsubmit = function() {
          let errorMsg = validataFunc()
          if (errorMsg) {
            alert(errorMsg)
            return false
          }
        }
    </script>
</body>
</html>

//模板方法模式：模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法和封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。
/*
优点：提取了公共代码部分，易于维护；
缺点：增加了系统复杂度，主要是增加了的抽象类和类间联系；
场景：一次性实现一个算法的不变的部分，并将可变的行为留给子类来实现；子类中公共的行为应被提取出来并集中到一个公共父类中的避免代码重复。
*/
class Beverage {
    constructor({brewDrink, addCondiment}) {
        this.brewDrink = brewDrink
        this.addCondiment = addCondiment
    }
    /* 烧开水，共用方法 */
    boilWater() { console.log('水已经煮沸=== 共用') }
    /* 倒杯子里，共用方法 */
    pourCup() { console.log('倒进杯子里===共用') }
    /* 模板方法 */
    init() {
        this.boilWater()
        this.brewDrink()
        this.pourCup()
        this.addCondiment()
    }
}
/* 咖啡 */
const coffee = new Beverage({
     /* 冲泡咖啡，覆盖抽象方法 */
     brewDrink: function() { console.log('冲泡咖啡') },
     /* 加调味品，覆盖抽象方法 */
     addCondiment: function() { console.log('加点奶和糖') }
})
coffee.init() 


//职责链模式：使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止
/*
优点:降低耦合度。它将请求的发送者和接收者解耦；简化了对象。使得对象不需要知道链的结构;增强给对象指派职责的灵活性。通过改变链内的成员或者调动它们的次序，允许动态地新增或者删除责任；增加新的请求处理类很方便。
缺点：不能保证某个请求一定会被链中的节点处理，这种情况可以在链尾增加一个保底的接受者节点来处理这种即将离开链尾的请求；使程序中多了很多节点对象，可能再一次请求的过程中，大部分的节点并没有起到实质性的作用。他们的作用仅仅是让请求传递下去，从性能当面考虑，要避免过长的职责链到来的性能损耗。
场景：JS 中的事件冒泡、作用域链、原型链
*/
// 请假审批，需要组长审批、经理审批、总监审批
class Action {
    constructor(name) {
        this.name = name
        this.nextAction = null
    }
    setNextAction(action) {
        this.nextAction = action
    }
    handle() {
        console.log( `${this.name} 审批`)
        if (this.nextAction != null) {
            this.nextAction.handle()
        }
    }
}

let a1 = new Action("组长")
let a2 = new Action("经理")
let a3 = new Action("总监")
a1.setNextAction(a2)
a2.setNextAction(a3)
a1.handle()

//命令模式：将一个请求封装成一个对象，从而让你使用不同的请求把客户端参数化，对请求排队或者记录请求日志，可以提供命令的撤销和恢复功能。
/*
优点：对命令进行封装，使命令易于扩展和修改；命令发出者和接受者解耦，使发出者不需要知道命令的具体执行过程即可执行。
缺点：使用命令模式可能会导致某些系统有过多的具体命令类。
*/
// 接收者类
class Receiver {
    execute() {
      console.log('接收者执行请求')
    }
}
// 命令者
class Command {  
    constructor(receiver) {
        this.receiver = receiver
    }
    execute () {    
        console.log('命令');
        this.receiver.execute()
    }
}
// 触发者
class Invoker {   
    constructor(command) {
        this.command = command
    }
    invoke() {   
        console.log('开始')
        this.command.execute()
    }
}
// 仓库
const warehouse = new Receiver();   
// 订单    
const order = new Command(warehouse);  
// 客户
const client = new Invoker(order);      
client.invoke()

//备忘录模式：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到保存的状态。
/*
优点：给用户提供了一种可以恢复状态的机制，可以使用户能够比较方便地回到某个历史的状态。
缺点：消耗资源。如果类的成员变量过多，势必会占用比较大的资源，而且每一次保存都会消耗一定的内存。
场景：分页控件、撤销组件
*/
//备忘类
class Memento{
    constructor(content){
        this.content = content
    }
    getContent(){
        return this.content
    }
}
// 备忘列表
class CareTaker {
    constructor(){
        this.list = []
    }
    add(memento){
        this.list.push(memento)
    }
    get(index){
        return this.list[index]
    }
}
// 编辑器
class Editor {
    constructor(){
        this.content = null
    }
    setContent(content){
        this.content = content
    }
    getContent(){
     return this.content
    }
    saveContentToMemento(){
        return new Memento(this.content)
    }
    getContentFromMemento(memento){
        this.content = memento.getContent()
    }
}

//测试代码

let editor = new Editor()
let careTaker = new CareTaker()
editor.setContent('111')
editor.setContent('222')
careTaker.add(editor.saveContentToMemento())
editor.setContent('333')
careTaker.add(editor.saveContentToMemento())
editor.setContent('444')
console.log(editor.getContent()) //444
editor.getContentFromMemento(careTaker.get(1))
console.log(editor.getContent()) //333
editor.getContentFromMemento(careTaker.get(0))
console.log(editor.getContent()) //222

//状态模式：允许一个对象在其内部状态改变的时候改变它的行为，对象看起来似乎修改了它的类
/*
优点：定义了状态与行为之间的关系，封装在一个类里，更直观清晰，增改方便；状态与状态间，行为与行为间彼此独立互不干扰；用对象代替字符串来记录当前状态，使得状态的切换更加一目了然。
缺点：会在系统中定义许多状态类；逻辑分散。
场景：一个对象的行为取决于它的状态，并且它必须在运行时刻根据状态改变它的行为、一个操作中含有大量的分支语句，而且这些分支语句依赖于该对象的状态。
*/
// 状态 （弱光、强光、关灯）
class State {
    constructor(state) {
        this.state = state
    }
    handle(context) {
        console.log(`this is ${this.state} light`)
        context.setState(this)
    }
}
class Context {
    constructor() {
        this.state = null
    }
    getState() {
        return this.state
    }
    setState(state) {
        this.state = state
    }
}
// test 
let context = new Context()
let weak = new State('weak')
let strong = new State('strong')
let off = new State('off')
// 弱光
weak.handle(context)
console.log(context.getState())
// 强光
strong.handle(context)
console.log(context.getState())
// 关闭
off.handle(context)
console.log(context.getState())

//访问者模式：表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。
/*
优点：符合单一职责原则；优秀的扩展性；灵活性。
缺点：具体元素对访问者公布细节，违反了迪米特原则；违反了依赖倒置原则，依赖了具体类，没有依赖抽象；具体元素变更比较困难。
场景：对象结构中对象对应的类很少改变，但经常需要在此对象结构上定义新的操作、需要对一个对象结构中的对象进行很多不同的并且不相关的操作，而需要避免让这些操作"污染"这些对象的类，也不希望在增加新操作时修改这些类。
*/
// 访问者  
class Visitor {
    constructor() {}
    visitConcreteElement(ConcreteElement) {
        ConcreteElement.operation()
    }
}
// 元素类  
class ConcreteElement{
    constructor() {
    }
    operation() {
       console.log("ConcreteElement.operation invoked");  
    }
    accept(visitor) {
        visitor.visitConcreteElement(this)
    }
}
// client
let visitor = new Visitor()
let element = new ConcreteElement()
element.accept(visitor)


//中介者模式：解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知中介者对象即可。中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。中介者模式使网状的多对多关系变成了相对简单的一对多关系（类似于观察者模式，但是单向的，由中介者统一管理。）
/*
优点：使各对象之间耦合松散，而且可以独立地改变它们之间的交互；中介者和对象一对多的关系取代了对象之间的网状多对多的关系；如果对象之间的复杂耦合度导致维护很困难，而且耦合度随项目变化增速很快，就需要中介者重构代码。
缺点：系统中会新增一个中介者对象，因 为对象之间交互的复杂性，转移成了中介者对象的复杂性，使得中介者对象经常是巨大的。中介 者对象自身往往就是一个难以维护的对象。
场景：系统中对象之间存在比较复杂的引用关系，导致它们之间的依赖关系结构混乱而且难以复用该对象、想通过一个中间类来封装多个类中的行为，而又不想生成太多的子类。
*/
class A {
    constructor() {
        this.number = 0
    }
    setNumber(num, m) {
        this.number = num
        if (m) {
            m.setB()
        }
    }
}
class B {
    constructor() {
        this.number = 0
    }
    setNumber(num, m) {
        this.number = num
        if (m) {
            m.setA()
        }
    }
}
class Mediator {
    constructor(a, b) {
        this.a = a
        this.b = b
    }
    setA() {
        let number = this.b.number
        this.a.setNumber(number * 10)
    }
    setB() {
        let number = this.a.number
        this.b.setNumber(number / 10)
    }
}

let a = new A()
let b = new B()
let m = new Mediator(a, b)
a.setNumber(10, m)
console.log(a.number, b.number)
b.setNumber(10, m)
console.log(a.number, b.number)
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

AJAX是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

创建AJAX请求的步骤：







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

[33. SIMD - 概述 - 《阮一峰 ECMAScript 6 (ES6) 标准入门教程 第三版》 - 书栈网 · BookStack](https://www.bookstack.cn/read/es6-3rd/spilt.1.docs-simd.md)

[JavaScript事件循环机制解析 - 简书 (jianshu.com)](https://www.jianshu.com/p/23fad3814398)

[JS 常用的六种设计模式介绍 - 掘金 (juejin.cn)](https://juejin.cn/post/7061987842473345061#heading-2)

[JavaScript设计模式es6（23种) - 掘金 (juejin.cn)](https://juejin.cn/post/6844904032826294286)

[10分钟掌握JavaScript设计模式 - 掘金 (juejin.cn)](https://juejin.cn/post/7052148234097000462#heading-0)
