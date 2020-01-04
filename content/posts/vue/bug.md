---
title: "Vue采坑记录"
date: 2020-01-04T18:28:00+08:00
draft: false
tags: ["vue"]
series: ["bug"]
categories: ["Vue"]
---

# 前言

本文章记录Vue学习使用过程中碰到的坑.


### \#1 router.options.routes

- `addRouter`无法动态渲染菜单问题.

原因: 根据Vue官网介绍，该路由信息，在创建后不得更改. [传送门](https://github.com/vuejs/vue-router/issues/1859)

需求场景: 用户登录时根据权限动态渲染菜单，需要读取后添加路由.

解决方案: 遍历路由表，将路由Push到列表内.

```js
// routerList为路由列表
// routerObj为路由对象
for (let i in routerList) {
    routerObj.options.routes.push(routerList[i])
}
```

### \#2 alias

- 某天出现项目突然无法启动,提示`mock`引用一个路径报错.
- `alias`无法识别到,排查后发现`mock`引入`uilts`一个功能出问题.
- 在不引入前可以正常使用`alias`.
- `奇他妈比的怪`.
- 一番波折后查明真相: mock功能文件存放在src根目录外，引用了一个根目录内的文件，所以无法找到alias



