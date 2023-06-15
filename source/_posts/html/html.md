---
layout: post
title: HTML
author: Lemonxu
date: 2023-05-18 11:46:54
tags: HTML, 基础
categories: [前端, 基础, HTML]
---

# HTML基础知识

## 什么是HTML？

html是用来描述网页的一种语言，指的是超文本标志语言。html使用标记标签来描述网页，其文档包含了html标签以及文本内容，Html文档也叫做web页面。

## 什么是标签？

html标记标签通常被称为html标签，是由*尖括号*包围的关键词，比如 ```<html>```；HTML标签通常是*成对出现*的，比如 ```<b> ```和 ```</b>```,标签对中的第一个标签是*开始标签*，第二个标签是*结束标签*。

## 什么是属性？

属性是 HTML 元素提供的附加信息，一般描述与开始标签，总是以名称/值对的形式出现，比如：name="value"。doctype不区分大小写。

## 什么是DOCTYPE？

<!DOCTYPE>声明有助于浏览器中正确显示网页，网络上有很多不同的文件，如果能够正确生命HTML的版本，浏览器就能正确显示网页内容。

**通用声明：**

```html
<!-- HTML5 -->
<!DOCTYPE html>
<!-- HTML4.01 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- XHTML 1.0 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```


 ## 什么是语义化HTML？

  语义化的HTML就是正确的标签做正确的事情，用合理的HTML标记以及其特有的属性去格式化文档内容。能够便于开发者阅读和写出更优雅的代码的同时让网络爬虫更好地解析。对于HTML体系而言，web语义化是指使用语义恰当的标签，是页面有良好的结构，让页面元素含有意义。便于被浏览器、搜索引擎解析。


 ## 什么是表单？

  表单是用于显示、收集、提交用户信息的控件，包括语法和属性，是网页制作中非常重要的内容。在html当中，表单使用```<form>```标签来定义。包含所有的表单元素，比如：文本域（textarea）、下拉列表（select）、单选框（radio-buttons）、复选框（checkbox）、提交按钮（submit）等等。

 ## 什么是HTML5？

  是HTML标准的第五次修订。其中增加了许多新特性：用于绘画的canvas元素、用于媒介回放的video和audio元素、对本地离线存储的更好的支持、新的特殊内容元素（article、footer、header、nav、section）、新的表单控件（calendar、date、time、email、url、search）。


 ## 什么是元数据？

  元数据（Metadata）是数据的数据信息，也就是```<meta>```标签，提供了html文档的元数据。元数据不会显示在客户端，但会被浏览器解析。通常用于指定网页的描述、关键词，文件最后的修改时间，作者以及其他元数据。通常位于```<head>```区域内，以名称/值对出现，如果没有提供name属性，那么名称/值对中的名称就会采用http-equiv属性的值。

  在不同版本html之间的差异：

  1. HTML5中不支持scheme属性，有一个新的charset属性，便于字符集的定义。

     ```html
     <!-- HTML 4.01  -->
     <meta http-equiv="content-type" content="text/html; charset=UTF-8">
     <!-- HTML5  -->
      <meta charset="UTF-8">
     ```

  2. 在HTML中```<meta>```没有结束标签，但在XHTML中<meta>标签必须包含结束标签。

 ## 什么是嵌入式内容？

  在HTML中，嵌入式内容是流式内容的一个子集，将来自另一种标记语言或命名空间的内容。此类元素内容有：```<audio>、<canvas>、<embed>、<iframe>、<img>、<math>、<object>、<picture>、<svg> 和 <video>```。关于流式内容，参照[内容分类 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories)。

  其中：iframe旨在讲web文档嵌入到当前文档中，很适合将第三方内容纳入网站。

 ## 什么是超链接？

  超链接（HyperLink），通常简称链接（link），是网络背后的核心概念。它是一种允许我们同其他网页或者站点之间进行连接的元素。超链接使我们能够将我们的文档连接到任何其他文档（或其他资源），也可以链接到文档的指定部分。也就是html当中的```<a>```元素，将文本或者其他内容包裹在```<a>```元素内，并给它一个包含网址的href属性（也成为超文本引用或目标，它将包含一个网址）来创建一个基本链接。

# 相关资料整理

 ## 对HTML语义化的理解？

   HTML 语义化是指使用恰当的 HTML 标签来表示文档结构，使页面在去掉样式或者加载失败的时候能够让页面呈现出清晰的结构。HTML5 新增了许多语义化的标签，例如：`header`、`footer`、`nav`、`menu`、`section`、`article` 等等，单单从字面上理解，就知道标签的含义。

   > 语义化的好处包括：
   >
   > 1. 增强了可读性，便于对浏览器、搜索引擎解析；
   > 2. 即使在没有样式 CSS 的情况下也能以一种文档格式显示，并且是容易阅读的；
   > 3. 有利于 SEO：利于被搜索引擎收录，更便于搜索引擎的爬虫程序来识别；
   > 4. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
   > 5. 便团队项目的可持续运作及维护，使 HTML 代码更具有可读性

   

 ## DOCTYPE(⽂档类型) 的作⽤

   DOCTYPE是HTML5中一种标准通用标记语言的文档类型声明，目的是告诉浏览器（解析器）应该以什么样的文档类型定义来解析文档，不同的渲染模式会影响浏览器对CSS代码甚至JavaScript脚本的解析。它必须声明在HTML文档的第一行。

   > **浏览器渲染界面的2种模式：**
   >
   > 标准模式（CSS1Compat）：浏览器引入w3c的标准，按照w3c的标准进行界面渲染。在标准模式中，浏览器以其支持的最高标准呈现页面。
   >
   > 怪异模式（BackCompat）：浏览器采用自身标准（各个浏览器不同）进行界面渲染。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。
   > 设置标准模式，在文档的顶部添加```<!DOCTYPE HTML>```，怪异模式则文档顶部什么都不写。



 ## script 标签中 defer 和 async 的区别

defer 和 async 都是用于异步加载脚本文件，但它们的作用不同。

defer 用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。
async 是 HTML5 新增属性，用于异步下载脚本文件，下载完毕立即解释执行代码。

简单来说，**defer 是在 HTML 解析完成后才执行脚本，而 async 是在脚本下载完成后立即执行，不管 HTML 是否解析完成。**

   

   

 ## 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

行内元素（默认display为inline，不会独占一行，相邻行内元素会排在同一行，宽度随内容变化而变化，设置宽高无效，设置水平方向padding-left/padding-right/margin-left/margin-right生效，共11个)：a、b、span、img、input、strong、select、label、em、button、textarea；

块级元素（默认display为block，会独占一行，默认情况下宽度自动填满其父元素宽度，可以设置宽高，margin、padding，共9个）：div、ul、li、dl、dt、dd、p、h1~h6、blockquote；

空元素（即没有内容的HTML元素，共6个）：br、meta、hr、link、input、img



 ## 浏览器是如何对 HTML5 的离线储存资源进行管理和加载？

在线的情况下，浏览器发现html头部有manifest属性，它会请求manifest文件。如果是第一次访问页面，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过页面并且资源已经进行离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，就会重新下载文件中的资源并进行离线存储。

离线的情况下，浏览器会直接使用离线存储的资源。

manifest属性是HTML5中的新属性。语法：```<html manifest="URL">```，URL是缓存清单，绝对URL可以指向另一个网站，如：http://www.example.com/demo.appcache；相对URL指向网站内的一个文件，如：demo.appcache。

完整的mainfest：

``` bash
CACHE MANIFEST
# 2012-02-21 v1.0.0
# 在此标题下列出的文件将在首次下载后进行缓存
/theme.css
/logo.gif
/main.js

NETWORK:
# 在此标题下列出的文件需要与服务器的连接，且不会被缓存
login.php

FALLBACK:
# 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）:第一个 URI 是资源，第二个是替补。
/html/ /offline.html
```

***注意：manifest 的技术已被 web 标准废弃，不再推荐使用此功能***



 ## Canvas 和 SVG 的区别

1）SVG：可缩放矢量图形，是基于可扩展标记语言XML描述的2D图形的语言，使用的是元素，也意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加JavaScript时间处理。 在SVG中，每个被绘制的图形均被视为对象。如果SVG对象的属性发生变化，那么浏览器能够自动重现图形。特点：（不依赖分辨率、支持事件处理、最适合带有大型渲染区域的应用程序【比如：谷歌地图】、复杂度高会减满渲染速度【任何过度使用DOM的应用都不快】）；

矢量图，也成为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。矢量文件中的图形元素成为对象。每个对象都是一个自成一体的实体，它具有颜色、形状、轮廓、大小和屏幕位置等属性。

2）Canvas：是画布，单位是像素， 通过JavaScript来绘制2D图形，使用像素进行渲染的，渲染完毕之后，浏览器就不再关注它，其位置发生改变，就会重新进行绘制。特点：（依赖分辨率，不支持事件处理器，文本渲染能力弱，能够以.png或.jpg格式保存结果图像，最适合图像密集型的游戏，其中的许多对象会被频繁地重绘，所以大型游戏开发都用的canvas，除此之外还有统计中常见的柱状图、饼图、雷达图等也使用的canvas）。



 ## 说一下 HTML5 drag API

dropAPI也就是（HTML Drag and Drop API）允许应用程序在浏览器中使用拖放功能。用户可以使用鼠标选择可拖动的元素，将这些元素拖到可放置的元素上，然后通过释放鼠标按钮来放置它们。拖动操作期间，可拖动元素的半透明表示会跟随指针。您可以自定义哪些元素可以变为可拖动的，可拖动元素产生的反馈类型以及可放置的元素。

drapstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发；

drap：事件主体是被拖放元素，在正在拖放被拖放元素时触发；

drapend：事件主体是被拖放元素，在整个拖放操作结束时触发；

drapenter：事件主体是目标元素，在被拖放元素进入某元素时触发；

drapover：事件主体是目标元素，在被拖放在某元素内移动时触发；

drapleave：事件主体是目标元素，在被拖放元素移出目标元素时触发；

drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发；





***附录：***

1.[内容分类 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories)
