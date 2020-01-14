---
title: "Django Models查库姿势"
date: 2020-01-14T15:00:04+08:00
draft: false
tags: ["django"]
series: ["django"]
categories: ["Python"]
---

> 本文章记录django models使用姿势


### `datetime`时间范围查询

查询今天内的的数据

```python
from datetime import datetime
from datetime import time
now_datetime = datetime.now()
min_datetime = datetime.combine(now_datetime, time.min)
max_datetime = datetime.combine(now_datetime, time.max)
today_data   = Data.objects.filter(
    date__gte=min_datetime, date__lte=max_datetime)
```