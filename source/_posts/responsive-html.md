---
title: 前端响应式网站设计
date: 2023-05-31 09:07:50
tags: 前端响应式
top_img: 
categories: [前端响应式, HTML, CSS]
---

# 一、为什么需要设计响应式设计

响应式设计就是为了为了统一所有设备，给用户展示最优的交互界面。
- 即便是PC或Mac用户，有查显示只有一半的人会将浏览器全屏显示，而剩下的一般人使用多大的浏览器，很难预知；
- 台式机、投影、电视、笔记本、手机、平板、手表、VR……智能设备正在不断增加，“主流设备”的概念正在消失；
- 屏幕分辨率正飞速发展，同一张图片在不同设备上看起来，大小可能天差地别；
- 鼠标、触屏、笔、摄像头手势……不可预期的操控方式正在不断出现。

<!-- more -->


响应式设计就是RWD（Responsive Web Design），与此目标比较相似的另一个设计就是 自适应网页设计AWD（Adaptive Web Design）。

**相同点**：
两者的目标相同，都是针对不同的分辨率/device采用不同的样式和布局达到页面展示最优；
在布局方式本质没有差别（AWD 也 including responsive layout）。

**差别点**: 
RWD强调一套页面进行多端兼容展示（桌机、平板、手机都是用同一个 HTML 代码和同一个 CSS 文档，能依照不同屏幕宽度的条件，来改变排版），而AWD给出多套页面，对于不同device进行了分类处理（在不同的装置开启网页时，AWD 会先判定装置屏幕尺寸是哪一种，来读取不同的 CSS 文档，呈现网页设计排版）；
RWD使用流动网格、CSS、以及灵活的基础可能需要更多的代码和实施策略（「媒体设备查询 @media」是 CSS 重要的能力之一，透过它可分辨开启网页的浏览器宽度大小，实时读取不同的样式呈现，就能达成 RWD 响应式效果），而AWD一般是server side detection，一次性渲染既定布局和样式。


# 二、响应式设计实现方案

主要从响应式布局（媒体查询、伸缩布局）、相对单位、响应式文字、响应式图片几个方面来进行响应式设计实现。

## 1、媒体查询
CSS3媒体查询可以让我们针对不同的媒体类型定义不同的样式，当重置浏览器窗口大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

在进行媒体查询实现前，需要考虑如何合理地选定分割点，可以根据你的设计需求和目标设备来定，也有一些常用的分割点，例如：480px、600px、768px、900px、1200px等。

具体语法如下所示：

**移动优先**
``` bash
 <style>
    body {
        height: 100vh;
        width: 100vw;
        background: red;
    }

    @media screen and (min-width: 480px) {
        body {
            background: yellow;
        }
    }
    @media screen and (min-width: 600px) {
        body {
            background: green;
        }
    }
    @media screen and (min-width: 780px) {
        body {
            background: blue;
        }
    }
    @media screen and (min-width: 900px) {
        body {
            background: purple;
        }
    }
    @media screen and (min-width: 1200px) {
        body {
            background: palevioletred;
        }
    }
</style>

```

**PC优先**
``` bash

```

