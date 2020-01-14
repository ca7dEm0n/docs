---
title: "使用Django Rest Framework进行API接口开发"
date: 2020-01-06T15:47:10+08:00
draft: false
tags: ["drf"]
series: ["django"]
categories: ["Python"]
---


> 本文章记录使用drf框架进行API接口开发

# 安装

- 安装模块

```shell
pip install djangorestframework  
```

- 快速启动项目

```shell
# 生成一个名为name的项目
django-admin startproject app 

# 生成名为api的app
django-admin startapp api 
```

# 引入

settings.py

```python
INSTALLED_APPS = [
    # ... 省略
    'rest_framework',
]
REST_FRAMEWORK = {
    # 默认解析，为了解析POST内容
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
    )
}
```