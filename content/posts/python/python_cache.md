---
title: "尝试自己写一个Python缓存装饰器"
date: 2019-05-15T12:49:13+08:00
draft: false
tags: ["python"]
series: ["python"]
categories: ["Python"]
---

本文记录尝试编写一个简单的缓存装饰器，以学习为目的，实际生产环境建议大家用标准库。


```python
from hashlib import md5
from pickle import dump, load


# 用pickle进行数据的读取、写入
def _dkL(f):
    with open(f,'rb') as file:  return load(file)
def _dkD(o,f):
    with open(f, 'wb') as file:  return dump(o,file)

def cache(ex_time=10,
    start=0,
    have_args=True,
    have_kw=True,
    cache_path="/tmp/pyCache"):

    # 判断缓存目录是否存在
    if not path.exists(cache_path): makedirs(cache_path)


    def _func(f):
        def _dec(*args, **kw):

            # args参数合并成字符串
            _func_args = ''.join([ str(_) for _ in args][start:]) if have_args else ''

            # kw参数合并成字符串
            _func_kw   = ''.join([ "%s-%s" % (i,kw[i]) for i in kw if kw]) if have_kw else ''

            # 用于识别方法名的字符串
            _func_str  = f.__qualname__ + _func_args + _func_kw 

            # 进行md5加密
            _md5 = md5()
            _md5.update(_func_str.encode('utf-8'))
            _func_md5 = _md5.hexdigest()

            # 方法执行的缓存位置
            file_path = path.join(cache_path, _func_md5)


                    # 判断方法执行结果是否过期
            if path.exists(file_path):
                file_mtime = int(path.getmtime(file_path))
                if int(time()) - file_mtime <= int(ex_time):
                    return _dkL(file_path)
            func_result = f(*args, **kw)
            _dkD(func_result, file_path)
            return func_result
        return _dec
    return _func
```

使用
```python
    @cache(60, have_args=False)
    def search_all(self):
        ....
```