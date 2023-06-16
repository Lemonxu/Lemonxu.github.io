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

## 基本语法

CSS的定义由三部分组成，包括选择器（selector）、属性（properties）、属性值（value）。

``` css
选择器{
    属性1:属性值1;
    属性2:属性值2;
    ……
}
```

#### 选择器

选择器分为：基本选择器（标签选择器、类选择器、id选择器）、属性选择器、层级选择器、组合选择器、伪类选择器、通配符、选择器优先级；

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
[href$="cn"]{
    color: blue;
}
[href*="i"]{
    
}
	

```





## 使用方法

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
