---
layout: post
author: Lemonxu
title: CSS
date: 2023-06-16 11:57:58
tags: CSS, 基础
categories: [前端, 基础, CSS]
---

# CSS基础

css，也就是层叠样式表，用于设计风格和布局。

## 基本知识

### 语法

CSS的定义由三部分组成，包括选择器（selector）、属性（properties）、属性值（value）。

``` css
选择器{
    属性1:属性值1;
    属性2:属性值2;
    ……
}
```

声明：一个属性与值的键值（color:red）

注释：单行注释`/* 单行注释 */`，多行注释 `/* 在里面直接换行就行 */`

### 选择器

#### 选择器分类

​    基本选择器（标签选择器、类选择器、id选择器）、属性选择器、层级选择器、组合选择器、伪类选择器、通配符；

#### 选择器优先级

> 选择器的优先级大小如下：
>
> 10000	!important
>
> 01000	行内样式	
>
> 00100	id选择器 
>
> 00010	类选择器/伪类选择器/属性选择器
>
> 00001	标签选择器/元素选择器/伪元素选择器




```css
/*基本选择器 3种类型*/
	/*标签选择器：标签名{}*/
    div{
        color: red;
    }
	/*类选择器：类名{}*/
    .image{
        width: 100%;
    }
	/*id选择器：#id名{}*/
    #p-id{
        color: blue;
    }

/*属性选择器 [属性名]{}*/
[title]{ /*具有title属性的元素*/
    font-size: 20px;
}
[href^="http"]{ /*以http开头的元素*/
    color: red;
}
[href$="cn"]{ /*以...为结束*/
    color: blue;
}
[href*="i"]{ /*href中包含i的 */
    color: yellow;
}

/**层级选择器 */
    /*祖宗后代/父子选择器  */
    div p{
        font-size: 18px;
    }
    /* 兄弟选择器 */
    div~p{
        color: green;
    }
    /* 跟班选择器 */
    p+span{
        color: yellow;
    }
/* 以下是层级选择器对应的html */
    <div>
        <p>我是div的子标签
            <p>我是div的孙标签（后代）</p>
        </p>
    </div>
    <p>我是div的兄弟标签</p>
    <span>我是p的跟班标签</span>


/* 组合选择器 */
    div span, p span{
        color: red;
    }
/* 组合选择器对应的html案例 */
    <div>
        <span>第一个span</span>
    </div>
    <p>
        <span>我是红色的字</span>
    </P>

/* 伪类选择器 */
    /* 第一个p元素 */
    p:nth-of-type(1){
        color:red;
    }
    /* 默认被点击状态 */
    a:link{
        color: yellowGreen;
    }

/* 通配符 */
    /* 通配符作用在所有标签上，开发并不建议使用，影响网页的渲染性能 */
    *{
        font-size: 16px;
    }

/*伪元素选择器:部分行内元素和块级元素可以使用，例如div、p、img、strong等*/
    div::before{
        content: "开始";
    }
	
```

### 盒模型

**标准盒模型**：盒子的实际尺寸 = 内容（设置的宽高） + 内边距 + 边框；

**IE盒模型**：盒子的实际尺寸 = 设置的宽/高 = 内容 + 内边距 + 边框；

box-sizing:content-box(标准盒模型)、border-box（IE盒模型）；

### @规则

```css
/* @media 满足媒介查询的条件则条件规则组里的规则生效 */
@media screen and (min-width: 600px){
    background: blue;
}

/* @namespace 命名空间 告诉CSS引擎必须考虑XML命名空间 */
	/*Default namespace*/
	@namespace url(XML-namespace-URL);
	@namespace "XML-namespace-URL";
	/*prefixed namespace*/
	@namespace prefix url(XML-namespace-URL);
    @namespace prefix "XML-namespace-URL";

/*@page 描述打印文档时布局的变化,只能修改文档的margin、orphans、widows 和分页符*/
@page {
    margin-top:200px;
}
/*要更改打印的样式还有另一种方式，使用@media print*/
@media print {
    img::before{
        font-size: 20px;
    }
}

/*@font-face 描述将下载的外部的字体,下面是阿里图标的导入案例*/
@font-face {
  font-family: "iconfont"; /* Project id 3700215 */
  src: url('iconfont.woff2?t=1677138395895') format('woff2'),
       url('iconfont.woff?t=1677138395895') format('woff'),
       url('iconfont.ttf?t=1677138395895') format('truetype');
}

/*@keyframes 描述CSS动画的关键帧，搭配animation使用，注意0%{}后面不要写分号哦，否则后面的样式无效*/
/*关键帧中的!important将会被忽略*/
@keyframes shink{
    0%{color:red} /*等同于from*/
    50%{color:blue}
    100%{color:green} /*等同于to*/
}

/*@document 如果文档样式表满足给定条件则条件规则里的规则生效, 这是个实验性技术，在Level3被初始化，后被推迟到Level4，但随后被移除*/
@document url("https://www.example.com/"){
    h1{color:red;}
}

/*@charset 用于定义样式表使用的字符集，必须是样式表中的第一个元素，前面不得有任何字符。因为它不是嵌套语句，所以不能在@规则条件组中使用。 */
@charset "UTF-8";
@charset "iso-8859-15";

/*@import 用于告css引擎引入一个外部样式表，必须先于所有其他类型的规则，@charset除外，@import也不是一个嵌套语句 */
@import url("fineprint.css") print;
@import 'custom.css';

/*@support 用于查询特定的CSS是否生效，可以加上or、and、not等操作符进行判断 */
@supports (display: grid) {
  div {
    display: grid;
  }
}


```

### 伪类

#### 条件伪类

```css
/*:lang() 基于元素语言来匹配页面元素, 使用这个条件是在html中增加lang属性*/
div:lang(en){
	font-size: 25px;
}
/*对应的html*/
<div lang="en">English</div>

/*:dir() 匹配特定文字书写方向的元素*/
/* 使用直接在html标签上增加相应的属性就有效, rtl全拼是（Right To Left）， ltr全拼是（Left To Right）如下案例 */
<div dir="rtl">从右到左</div>
<div dir="ltr">从右到左</div>

/*:has() 匹配包含指定元素的元素 */
div:has(span){
    background: #008B8B;
}

/*:is() 匹配指定选择器列表里的元素，可以简化深层嵌套 */
:is(div p span){
    background: violet;
}

/*:not() 匹配不符合一组选择器的元素 */
    /* 类名不是 `.fancy` 的 <p> 元素*/
    p:not(.fancy) {
      color: green;
    }
    /* 非 <p> 元素 */
    body :not(p) {
      text-decoration: underline;
    }
```

#### 行为伪类

```css
/*:active 鼠标激活的元素*/
div p span:active{
    background: yellowgreen;
}

/*:hover 鼠标悬浮的元素*/
:is(div p span):hover{
    background: aqua;
}

/*::selection 鼠标选中的元素*/
div p span::selection{
    background: yellowgreen;
}
```

#### 状态伪类

```css
/*:target 当前锚点的元素*/
div:target{
    background: #f1fde7;
}

/*:link 未访问的链接元素*/
a:link {
  background-color: gold;
}

/*:visited 已访问的链接元素*/
a:visited {
  color: blue;
}

/*:focus 输入聚焦的表单元素*/
input:focus {
    background-color: lightblue;
}

/*:required 输入必填的表单元素, 需要在表单标签，比如input、select等标签上增加required属性才会生效 */
input:required {
    background-color: gold;
}

/*:valid 输入合法的表单元素*/
input:required:invalid {
    border-color: #c00000;
}

/*:invalid 输入非法的表单元素*/
input:invalid {
    background-color: ivory;
}

/*:checked 选项选中的表单元素*/
input[type="checkbox"]:checked {
  box-shadow: 0 0 0 3px hotpink;
}

/*:blank 输入为空的表单元素，这个是实验性技术，几乎不支持*/
```

#### 结构伪类

```css
/*:root 文档的根元素*/
:root {
    --main-color: hotpink;
    --pane-padding: 5px 42px;
}
div{
    background: var(--main-color);
}

/*:empty 无子元素的元素*/
div:empty {
    outline: 2px solid deeppink;
    height: 1em;
}

/*:first-child 元素中为首的元素*/
li:first-child {
    border: 2px solid orange;
}

/*:last-child 元素中为尾的元素*/
li:last-child {
    border: 2px solid orange;
}

/*:nth-child(n) 元素中指定索引的元素*/
.first span:nth-child(2n+1),
.second span:nth-child(2n+1),
.third span:nth-of-type(2n+1) {
  background-color: lime;
}
```



#### 伪元素

```css
/*::before 在元素前插入内容*/
a::before {
  content: "♥";
}

/*::after 在元素后插入内容*/
a::after {
    content: ' (' attr(href) ')';
}
```



### 继承性

**默认继承**：

| 类型     | 属性                                                         |
| -------- | ------------------------------------------------------------ |
| 字体相关 | font-family、font-style、font-size、font-weight              |
| 文本相关 | text-align、text-decoration、text-shadow、line-height、color |
| 其他属性 | list-style、visibility、cursor                               |

**控制继承**：

| 类型    | 属性                 |
| ------- | -------------------- |
| inherit | 继承父元素对应的属性 |
| initial | 应用该属性的默认值   |



### 文档流

**块级元素**：默认会占满整行，所以多个块级盒子之间是从上到下排列的；

**内联元素**：默认会在一行里一列一列的排布，当一行放不下的时候，会自动切换到下一行继续按照列排布；

**脱离文档流**：浮动（float）、绝对定位（position:absolute）、固定定位（position:fixed）



### 媒体查询

media属性

| 属性   | 说明               |
| ------ | ------------------ |
| all    | 适用于所有设备     |
| print  | 适用在打印设备     |
| screen | 主要用于屏幕       |
| speech | 主要用于语音合成器 |

@media 逻辑操作符： and（且）、or（或）、not（非）。

### 

## CSS常用技巧

### 清除浮动

```css
/*BFC清除浮动*/
.parent{
    overflow:hidden;
}

/*clear清除*/
.clearfix{
    zoom: 1;
}
.clearfix::after{
    content: "",
    display: block;
    clear: both;
}
```

### 居中

```css
/*水平居中*/
.parent{
    text-align: center;
}

/*垂直居中*/
.single-line{
    padding-top： 20px;
    padding-bottom: 20px;
}
.single-line{
    height: 100px;
    line-height: 100px;
}

/*固定宽高*/
/*absolute+margin 需要设置固定宽高*/
.absolute-margin{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
.absolute-margin{
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -50px 0 0-50px;
}

/*absolute-calc*/
.absolute-calc{
    position: absolute;
    left: calc(50% - 50px);
    top: calc(50% - 50px)
}

/*下面的方案不需要固定宽高*/
/*absolute-transform*/
.absolute-transform{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
/*line-height+vertical-align*/
.line-vertical{
    display: inline-block;
    line-height: initial;
    vertical-align: middle;
}

/*table-cell*/
.parent{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.child{
    display: inline-block;
}

/*flex */
.parent{
    display: flex;
    justify-content: center;
    align-item: center;
}

/*grid*/
.parent{
    display: grid;
}
.child{
    justify-self: center;
    align-self: center;
}
```

### 长文本处理

```css
/*字符超出部分换行*/
overflow-wrap: break-word;

/*字符超出位置使用连字符*/
hyphens: auto;

/*单行文本超出省略*/
.ellipsis{
    // max-width: 165px;  /*需要设置最大宽度，默认为100%，flex里面可能会无效*/
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

/*多行文本超出省略*/
.ellipsis-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  // height:50px; /*需要设置最高的高度，超出高度部分不显示*/
}

```




## CSS使用方法

主要使用方法有4种：内联样式、内部样式、使用link标记连接外部样式表、使用css的@import标记导入外部样式文件。

### 行内样式/内联样式

两者表达的是同一个意思，具体实现如以下代码：

```CSS
<a style="color:red;">测试</a>
```

### 内部样式

```css
<style type="text/css">
p{
    color: red;
    font-size: 28px;
}
</style>
```

### 外部样式/外联样式

#### link引入

样式表以单独的文件（文件后缀一般为.css）存放，让网站的所有页面通过link标记均可引用此样式文件。

```html
<link rel="stylesheet" type="text/css" href="样式表源文件地址">
```

#### @import引入

```html
<style>
    @import url(css/外部样式表.css);
</style>
```

### 样式的优先级

就近原则：行内样式/内联样式 ＞ 内部样式 == 外部样式（后面覆盖前面）；注意事项：尽量不要对同个html进行多个样式书写。

### 样式选择

如果是通用样式则选择内部样式、外部样式，当样式内容过多时，将样式单独抽离成.css文件，方便管理；当某个标签样式特殊，出现次数唯一的情况下，可以用行内样式/内联样式。



***附录：***

[命名空间 | @namespace (Namespaces) - CSS 中文开发手册 - 开发者手册 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/section/1072304)

[@document - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@document)
