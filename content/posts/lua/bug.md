---
title: "Openresty开发采坑记录"
date: 2020-01-04T18:28:05+08:00
draft: false
series: ["bug"]
categories: ["lua"]
---

# 前言

本文章记录Openresty学习使用过程中碰到的坑.

### \#1 打印日志

初学为了直观显示输出,习惯性使用`ngx.say`调试.

在一开发跳转需求功能的时候发现: 

> ngx.say会覆盖ngx.req.set_uri(跳转功能)影响最终结果.


### \#2 Redis连接`Bad request`

为了Redis连接池共用，将Redis连接存储为共享数据.

后续使用断断续续出现`Bad request`.

查官网后得知真相:

> 建议不要使用全局lua变量，并发请求可能会出现因资源竞争导致的请求失败.
> [传送门](https://github.com/openresty/lua-nginx-module/#data-sharing-within-an-nginx-worker)



