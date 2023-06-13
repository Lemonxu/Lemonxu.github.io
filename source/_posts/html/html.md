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

   设置标准模式，在文档的顶部添加```<!DOCTYPE HTML>```，怪异模式则文档顶部什么都不写。



 ## script 标签中 defer 和 async 的区别

```defer``` 和 ```async ```都是用于异步加载脚本文件，但它们的作用不同。

```defer``` 用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。
```async``` 是 HTML5 新增属性，用于异步下载脚本文件，下载完毕立即解释执行代码。

简单来说，defer 是在 HTML 解析完成后才执行脚本，而 async 是在脚本下载完成后立即执行，不管 HTML 是否解析完成。

   

   

 ## 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

 ## 浏览器是如何对 HTML5 的离线储存资源进行管理和加载？

 ## Canvas 和 SVG 的区别

 ## 说一下 HTML5 drag API



***附录：***

1.[内容分类 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories)
