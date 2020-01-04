---
title: "Django Rest Framework 分页功能与搜索功能"
date: 2019-03-27T10:25:13+08:00
draft: false
tags: ["drf"]
series: ["django"]
categories: ["Python"]
---

# 前言

本文章记录在drf框架中实现`分页`、`搜索`功能.

# 实践

### 分页器

分页器的实现官网介绍有两种方式：

- 配置文件配置
- 继承父类完成自定义分页器

**分析分页器源码**

自定义分页器主要是继承`PageNumberPagination`，改写`get_paginated_response`方法与`paginate_queryset`方法.
> 其中`get_paginated_response`主要是编写分页器的返回结果.


需求示例：

前端采用`iView`组件中的分页器，该前端分页器主要接收总页数与当前页数.所以后端需要返回数据，并且返回一个总页数.

```python
class MyPagination(PageNumberPagination):

    # 指定每一页的个数，默认为配置文件里面的PAGE_SIZE
    page_size = 10
   

    # 可以让前端指定每页个数，默认为空，这里指定page_size去指定显示个数
    page_size_query_param = 'page_size'

    # 可以让前端指定页码数，默认就是page参数去接收
    page_query_param = 'page'
    
    # 指定返回格式，根据需求返回一个总页数，数据存在results字典里返回
    def get_paginated_response(self, data):
        from collections import OrderedDict
        return Response(
            OrderedDict([('count', self.page.paginator.count), ('results',data)]))
```

view.py

```python
def get(self, request, format=None):
	pagination_class = MyPagination()
	
	# 资产列表库
	assets_lists = AssetsList.objects.all().order_by('id')
	
	# 实例化查询
	page_query = pagination_class.paginate_queryset(
            queryset=assets_lists, request=request, view=self)
            
	# 序列化及结果返回
  result_serializer = AssetsListSerializer(page_query, many=True)
  page_result = pagination_class.get_paginated_response(
            result_serializer.data)
  return page_result
```

### 搜索器

分析源码，搜索器是对`models.Q`做条件查询.


场景1：

> 多个字段中包含搜索关键字返回

```python
from rest_framework import filters

...
def get(self, request, format=None):

	# 实例化搜索器
	search_class = filters.SearchFilter()
	
	# 资产列表
	assets_lists = AssetsList.objects.all().order_by('id')
	
	# 指定需要搜索的字段，这些字段包含搜索关键字就返回结果;根据源码，搜索支持模糊匹配，精准匹配，正则匹配等
	self.search_fields = ['id', 'property_number']
	# http://a-cat.cn/?search=1，将会返回id、property_number包含1的结果
	
	# 搜索结果
	search_query = search_class.filter_queryset(request, assets_lists, self)
	
	result_serializer = AssetsListSerializer(search_query,many=True)
	return result_serializer.data

```

场景2：

> 显示多个类型结果

```python
    def post(self, request, format=None):
        view_types = request.data.get('types', '')
        if view_types:

						# 根据assets_type的id字段
            queries = [
                models.
                Q(**
                  {LOOKUP_SEP.join(["assets_type__id", 'iexact']): type_name})
                for type_name in json.loads(view_types)
            ]
            query_set = AssetsList.objects.filter(
                reduce(operator.or_, queries))
                
```
传入`assets_type`id列表，返回列表`id`类型结果


### 分页器与搜索器

对搜索结果进行分页

```python
    def get(self, request, format=None):
        pagination_class = MyPagination()
        search_class = filters.SearchFilter()
        self.search_fields = [
            'id', 'property_number', 'specification_model',
            'registration_card_number'
        ]

        assets_lists = AssetsList.objects.all().order_by('id')

        search_query = search_class.filter_queryset(request, assets_lists,
                                                    self)
        page_query = pagination_class.paginate_queryset(
            queryset=search_query, request=request, view=self)

        result_serializer = AssetsListSerializer(page_query, many=True)
        page_result = pagination_class.get_paginated_response(
            result_serializer.data)
        return page_result
```