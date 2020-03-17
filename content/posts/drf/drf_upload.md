---
title: "Django Rest Framework Image Upload"
date: 2020-02-28T10:26:10+08:00
draft: false
tags: ["drf"]
series: ["django"]
categories: ["Python"]
---


> 本文章记录在drf框架中实现图片上传功能.

## models.py

```python
import os
from uuid import uuid4
from datetime import datetime
from django.utils import timezone
from django.template.defaultfilters import date

class ImgModel(models.Model):
    def generate_image_filename(_, filename):
        filename = "%s-%s" % (uuid4(), filename)
        tzinfo = timezone.get_current_timezone()
        date_dir = date(datetime.now(tz=tzinfo), 'Y/m/d')
        return "static/images/%s/%s" % (date_dir, filename)
    # echo: static/images/2020/02/28/930da205-7055-4ce7-9822-24ff2c500fe5-1.jpg

    file = models.ImageField('图片', upload_to=generate_image_filename, blank=True)
    uploaded_by = models.CharField(max_length=20, verbose_name='作者')
    time = models.DateTimeField('创建时间', auto_now_add=True)
```

## serializer.py

```python
from .models import *
from rest_framework import serializers
from rest_framework.serializers import ValidationError

class ImgSerializers(serializers.ModelSerializer):
    file = models.FileField(blank=False, null=False)

    class Meta:
        model = ImgModel
        fields = "__all__"

    def validate_file(self, value):
        _allowed_ext = ('.jpg', '.jpeg', '.png', '.bmp', '.gif')
        _, ext = os.path.splitext(value.name)
        ext = ext.lower()
        if ext not in _allowed_ext:
            raise ValidationError("图片文件只允许以下后缀: %s." % (','.join(_allowed_ext), ))
        return value
```

## views.py

```python
from .serializer import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class ImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        request.data['uploaded_by'] = request.user.user_name
        file_serializer = ImgSerializers(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

## settings.py

```python
# DEBUG=True
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "staticfiles"),
)
STATIC_URL = '/static/'

# DEBUG=False
STATIC_ROOT = os.path.join(BASE_DIR, '/static/')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = 'media/'
```

## url.py

```python
from django.conf.urls.static import static
from .settings import MEDIA_ROOT
from .settings import MEDIA_URL

urlpatterns = [
    path('upload/', ImageUploadView.as_view()),
] + static(MEDIA_URL, document_root=MEDIA_ROOT)
```

## 测试

上传

```shell
# 请求
curl --location --request POST 'http://localhost:8000/upload/' \
     --header 'Authorization: xxx' \
     --form 'file=@/Users/cA7/Downloads/1.jpg'

# 返回 
{
    "file": "media/static/images/2020/02/28/31894ca4-f1b0-406a-ac0a-7c52dbce3ef7-1.jpg",
    "uploaded_by": "cA7",
    "time": "2020-02-28T02:33:39.765007Z"
}
```

在`media/static/images/2020/02/28/`中可以看到图片.

通过访问链接`http://localhost:8000/media/static/images/2020/02/28/31894ca4-f1b0-406a-ac0a-7c52dbce3ef7-1.jpg`可以看到图片.


