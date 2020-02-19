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

### 引入

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
        'rest_framework.parsers.MultiPartParser'
    )
}
```

### 配置
.DEBUG_CONFIG
```shell
# 配置文件
export DB_DATABASE="information"
export DB_USER="root"
export DB_PASSWORD="123456"
export DB_HOST="127.0.0.1"
export DB_PORT="3306"
```

settings.py
```python
# 读取敏感信息读取环境变量
ENV_DICT    = os.environ
DB_DATABASE = ENV_DICT.get('DB_DATABASE','')
DB_USER     = ENV_DICT.get('DB_USER','')
DB_HOST     = ENV_DICT.get('DB_HOST','localhost')
DB_PORT     = int(ENV_DICT.get('DB_PORT','3306'))
DB_PASSWORD = ENV_DICT.get('DB_PASSWORD','123456')
DATABASES   = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': DB_DATABASE,
        'USER': DB_USER,
        'PASSWORD': DB_PASSWORD,
        'HOST': DB_HOST,
        'PORT': DB_PORT,
        'CONN_MAX_AGE': 3600,
    }
}
```

### 启动脚本
run.sh
```shell
# git clone https://github.com/ca7dEm0n/ShellSDK 
# mv ShellSDK/sdk ./
# rm -rf ShellSDK

. ./sdk/utils
. ./sdk/echo

SCRIPT_DIR=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)

init() {
    : 读取最新修改的配置文件
    CONFIG_FILE_NAME=$(ls -at |grep ".*_CONFIG" |head -1)
    [ -z "${CONFIG_FILE_NAME}" ] && echoRed "[!] config not found" && exit 0

    : 加载环境变量
    source ${CONFIG_FILE_NAME}
    : 初始化
    PYTHON=${PYTHON:-"python"}
    LOG_LEVEL=${SHELL_LOG_LEVEL:-2}
    LOG_PATH=${SHELL_LOG_PATH:-"run.log"}
    LOG_CONSOLE=${SHELL_LOG_CONSOLE:-1}
    wLog 2 "读取[${CONFIG_FILE_NAME}]配置文件"
}

manage() {
    wLog 2 "执行[$*]"
    ${PYTHON} manage.py $*
}

init
$*
```

# 上手

> 需求： 做一个记录日常维护记录功能

- 包含一个列表页.
- 可以增删改查某个记录.



### 列表页查询

models.py
```python
from django.db import models
class OpsModels(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="维护名称")
    user = models.CharField(max_length=20, verbose_name='作者')
    projectname = models.CharField(max_length=100, blank=True, null=True, verbose_name="维护项目")
    contents = models.TextField(max_length=100000, blank=True, null=True, verbose_name="维护内容")
    ops_time = models.DateTimeField(verbose_name="维护时间")

    def __str__(self):
        return self.name
```

创建并生成
```shell
sh run.sh manage makemigrations
sh run.sh manage migrate
```

完成数据库部分后，开始写序列化部分.

> 因为是用于列表页的序列化，所以我们排除`内容`字段. 
> `ModelSerializer`默认会包含所有字段.

serializer.py
```python
from .models import *
from rest_framework import serializers

class OPSListSerializers(serializers.ModelSerializer):
    class Meta:
        model   = OpsModels
        exclude = ['contents']
```

完成了数据库部分以及序列化部分后，咱们开始写视图部分.

通常，一个视图集成`分页`、`搜索`、 `鉴权`等功能，你可能会这样写

```python
class List(APIView):
    permission_classes = [IsAdminRole,]

    def get(self, request, format=None):
        pagination_class = MyPagination()
        search_class = filters.SearchFilter()
        self.search_fields = [
            'id', 'property_number'
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

但其实`restframework`都有集成一些你想到的并且通用的视图类.

所以我们用一个通用类来完成列表页展示需求.

views.py
```python
from rest_framework import filters, generics
from pysdk.web.drf import MyPagination
from .serializer import *

# 通过查阅源码发现
# 其实ListAPIView就是继承mixins.ListModelMixin与GenericAPIView
class OPSListView(generics.ListAPIView):
		# 指定查询数据
    queryset = OpsModels.objects.all().order_by('id')
    # 指定序列化
    serializer_class = OPSListSerializers
    
    # 分页功能
    pagination_class = MyPagination
    
    # 指定搜索功能
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'name', 'user']
```



url.py
```python
from django.urls import path

urlpatterns = [
    path('ops/', OPSListView.as_view())
]
```

补充一下，我的分页器长这样:
- 使用`page_size`指定返回数量长度大小.
- 使用`page`关键字指定页数.
- 返回内容十分简单，只有`count`与`results`
```python
class MyPagination(PageNumberPagination):
    '''
    @description: 自定义分页器
    '''
    page_size = 10
    page_size_query_param = 'page_size'
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response(
            OrderedDict([('count', self.page.paginator.count),
                         ('results', data)]))
```

完成后插入测试数据，你可以像这样测试:

```shell
# 默认请求，默认返回10条记录
GET /ops/

# 获取第二页，每页20条数据
GET /ops/?page=2&page_size=20

# 搜索字段中包含"测试"的数据，返回第二页，每页展示20条记录
GET /api/ops/?page=2&page_size=20&search=测试

```


### 创建一个新记录

创建新记录即`POST`请求，我们同样采用通用视图来完成.


serializer.py
```python

# 新增一个序列化
# 对ops_time字段做单独处理，使其能够适配ios-8601、及我们自定义的格式
class OPSEditSerializers(serializers.ModelSerializer):
    ops_time = serializers.DateTimeField(
        input_formats=["iso-8601", "%Y-%m-%d %H:%M:%S"]
    )
    class Meta:
        model  = OpsModels
        fields = "__all__"

		# 增加一个create方法
    def create(self, validated_data):
        return OpsModels.objects.create(**validated_data)
```
views.py
```python
# 继承类改为ListCreateAPIView
# 通过查看源码，我们可以发现，该类其实新增一个CreateModelMixin的继承
class OPSListView(generics.ListCreateAPIView):
    queryset = OpsModels.objects.all().order_by('id')
    serializer_class = OPSListSerializers
    pagination_class = MyPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'name', 'user', 'projectname']

    def post(self, request, *args, **kwargs):
        self.serializer_class = OPSEditSerializers
        return self.create(request, *args, **kwargs)
```
这里因为序列化实例改变，所以我们要覆盖post方法，将序列化实例改为`OPSEditSerializers`

完成后，进行测试

```shell
curl --location --request POST 'http://127.0.0.1:8000/api/ops/?search=1111' \
		 --header 'Content-Type: application/json' \
		 --form 'name=1' \
     --form 'user=1' \
     --form 'projectname=111' \
     --form 'ops_time=2014-08-15 10:40:26' \
     --form 'contents=22222'
```

### 操作某个具体记录

操作具体记录即(`GET` `PUT` `DELETE`)，因为没有复杂的关联，没有嵌套查询，所以我们采用通用视图来完成.

views.py
```python
class OPSEditView(generics.RetrieveUpdateDestroyAPIView):
		# 指定以某个字段查询
    lookup_field = 'id'
    
    # 数据表
    queryset = OpsModels.objects.all()
    
    # 序列化
    serializer_class = OPSEditSerializers
```

urls.py
```python
urlpatterns = [
    path('ops/', OPSListView.as_view()),
    path('ops/<int:id>/', OPSEditView.as_view())
]
```
测试
```shell
# 获取id为1的详细信息
curl http://127.0.0.1:8000/api/ops/1/

# 把id为1的name修改为test
curl --location --request PUT 'http://127.0.0.1:8000/api/ops/1/' \
		 --header 'Content-Type: application/json' \
		 --form 'name=test'

# 删除id为1的记录
curl --location --request DELETE 'http://127.0.0.1:8000/api/ops/1/' \
		 --header 'Content-Type: application/json' \
		 --form 'name=test'

```