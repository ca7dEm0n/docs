---
title: "Zabbix常用SQL操作"
date: 2020-01-14T23:46:10+08:00
draft: false
tags: ["zabbix"]
series: ["zabbix"]
categories: ["ops"]
---

# 前言

线上API项目中, 有部分常用Zabbix操作, 采用直接读库方式。 

> 本文章记录出现在项目中的常用SQL操作(主要以3.x版本为例)，主要使用Python语言做演示。

Zabbix一些对应关系及常量

```python
# 历史表对应ID
ZBX_HISTORY_TABLES = ("history", "history_str",
                        "history_log", "history_uint", "history_text")

# 一些主要的常量
ZBX_MAPPING = {
    "EVENT_SOURCE_TRIGGERS": 0,
    "EVENT_OBJECT_TRIGGER": 0,
    "TRIGGER_VALUE_FALSE": 0,
    "SEC_PER_DAY": 86400,
    "TRIGGER_VALUE_TRUE": 1,
    "TRIGGER_VALUE_TRUE": 0
```

## 常用基础操作

### 获取主机ID

```python
# hostname 主机名
def get_host_id(self, hostname):
    sql = """
    SELECT hg.hostid  from hosts_groups hg,hosts h 
    WHERE h.hostid=hg.hostid and h.HOST='%s' limit 1;
    """ % hostname
```

### 获取主机TriggerID

```python
# hostid 主机ID
# triggername 触发器名
def get_trigger_id(self, hostid, triggername):
    sql = """
    SELECT  DISTINCT  
        t.triggerid
    FROM 
        triggers t,functions f,items i 
    WHERE 
        i.hostid='%s' 
    AND f.triggerid=t.triggerid
    AND f.itemid=i.itemid
    AND t.description like "%%%s%%"
    """ % (hostid, triggername)
```

### 获取主机Item ID

```python
# hostid 主机ID
# item   item名
def get_item_id(self, hostid, item):
    sql = """
    SELECT DISTINCT
    i.itemid
    FROM
        items i
    WHERE
        i.hostid = "%s"
    AND i.key_ = "%s"
    """ % (hostid, item)
```

### 获取ItemID的类型

```python
# itemid   itemID
def get_itemid_type(self, itemid):
    sql = "SELECT i.value_type FROM items i WHERE i.itemid='%s'" % itemid
```

### 获取关闭的Triger(适用于巡检)

```python
def get_close_trigger(self):
    sql = """
    SELECT
        `triggers`.description,
        `hosts`.`host`
    FROM
        `triggers`
    INNER JOIN functions ON functions.triggerid = `triggers`.triggerid
    INNER JOIN items ON functions.itemid = items.itemid
    INNER JOIN `hosts` ON items.hostid = `hosts`.hostid
    WHERE
        `triggers`.`status` <> 0
    """
```

### 获取状态异常的监控项(适用于巡检)

```python
def get_not_supported(self):
    sql = """ 
    SELECT 
        i.name,i.error,h.host
    FROM
        items i ,hosts h
    WHERE
        h.hostid = i.hostid and i.error != "" ;
    """
```

### 获取关闭的告警器(适用于巡检)

```python
def get_close_trigger(self):
    sql = """
    SELECT
        `triggers`.description,
        `hosts`.`host`
    FROM
        `triggers`
    INNER JOIN functions ON functions.triggerid = `triggers`.triggerid
    INNER JOIN items ON functions.itemid = items.itemid
    INNER JOIN `hosts` ON items.hostid = `hosts`.hostid
    WHERE
        `triggers`.`status` <> 0
    """
```

## 组合操作

### 获取主机Item历史记录

```python

# self.sql_query为SQL查询器
def get_host_item_history(self, hostname, item, startTime=int(time()) - 60 * 15, endTime=int(time())):
    hostid = self.get_host_id(hostname)

    # 获取主机id
    if not hostid[0]:
        return hostid
    hostid = hostid[1]

    # 获取itemID
    itemid = self.get_host_item(hostid, item)
    if not itemid[0]:
        return itemid
    itemid = itemid[1][0]["itemid"]

    # 获取itemType
    itemtype = self.get_itemid_type(itemid)
    if not itemtype[0]:
        return itemtype

    # 历史数据表对应关系
    tables_name = self.ZBX_HISTORY_TABLES[itemtype[1]]

    # 获取历史数据
    sql = """
    SELECT
        h.clock,
        h.value
    FROM
        %s h
    WHERE
        h.itemid = '%s'
    AND h.clock >= '%s'
    AND h.clock <= '%s';
    """ % (tables_name, itemid, startTime, endTime)
    result = self.sql_query(sql)
```

## 进阶操作

### 获取Trigger可用率

```python
def get_trigger_availability(self, hostname, trigger, startTime=0, endTime=0):
    get_host_id = self.get_host_id(hostname)
    if not get_host_id[0]:
        return get_host_id

    get_trigger_id = self.get_trigger_id(get_host_id[1], trigger)
    if not get_trigger_id:
        return get_trigger_id

    calculateAvailability = self.calculateAvailability(
        get_trigger_id[1], startTime, endTime)
    return calculateAvailability

# 这一段根据ZabbixWeb PHP源码改写Python版
def calculateAvailability(self, triggerid, startTime=0, endTime=0):
    '''
    @description: ZABBIX可用率计算(照搬源码)
    @param {triggerid}     触发器ID
    @param {startTime}     开始时间
    @param {endTime}       结束时间
    @return: (True/False, Data)
    '''
    startTime = int(startTime)
    endTime = int(endTime)
    startValue = self.ZBX_MAPPING["TRIGGER_VALUE_FALSE"]
    minValue = None
    if startTime > 0 and startTime <= int(time()):
        __sql = """
        SELECT
            e.eventid,e.value
        FROM 
            events e
        WHERE 
            e.objectid=%s
        AND e.source=%s
        AND e.object=%s
        AND e.clock<%s
        ORDER BY e.eventid DESC
        LIMIT 1
        OFFSET 0
        """ % (triggerid,
                self.ZBX_MAPPING["EVENT_SOURCE_TRIGGERS"],
                self.ZBX_MAPPING["EVENT_OBJECT_TRIGGER"],
                startTime)
        result = self.sql_query(__sql)
        logger.debug(__sql)

        if result:
            startValue = result[0]['value']

        minValue = startTime

    __sql = """
    SELECT 
        COUNT(e.eventid) AS cnt,
        MIN(e.clock) AS min_clock,
        MAX(e.clock) AS max_clock
    FROM 
        events e
    WHERE 
        e.objectid=%s
    AND e.source=%s
    AND e.object=%s
    """ % (triggerid,
            self.ZBX_MAPPING["EVENT_SOURCE_TRIGGERS"],
            self.ZBX_MAPPING["EVENT_OBJECT_TRIGGER"])

    if startTime:
        __sql += "AND e.clock>=%s " % startTime
    if endTime:
        __sql += " AND e.clock<=%s " % endTime
    dbEvent = self.sql_query(__sql)
    logger.debug(__sql)
    if dbEvent[0]['cnt'] > 0:
        if minValue is not None:
            minValue = dbEvent[0]['min_clock']
        maxValue = dbEvent[0]['max_clock']
    else:
        if startTime == 0 and endTime == 0:
            maxValue = int(time())
            minValue = maxValue - self.ZBX_MAPPING["SEC_PER_DAY"]
        else:
            resultDict = {
                'true_time': 0,
                'false_time': 0,
            }
            resultDict['true'] = 100 if self.ZBX_MAPPING["TRIGGER_VALUE_TRUE"] == startValue else 0
            resultDict['false'] = 100 if self.ZBX_MAPPING["TRIGGER_VALUE_FALSE"] == startValue else 0
            return True, resultDict

    State = startValue
    Time = minValue
    True_time = 0
    False_time = 0

    if startTime == 0 and endTime == 0:
        maxValue = int(time())

    if endTime == 0:
        endTime = maxValue

    rows = 0

    dbEvents = self.sql_query("""
    SELECT 
        e.eventid,
        e.clock,
        e.value
    FROM 
        events e
    WHERE 
        e.objectid=%s
    AND e.source=%s
    AND e.object=%s
    AND e.clock BETWEEN %s AND %s
    ORDER BY e.eventid
    """ % (triggerid,
            self.ZBX_MAPPING["EVENT_SOURCE_TRIGGERS"],
            self.ZBX_MAPPING["EVENT_OBJECT_TRIGGER"],
            minValue, maxValue))

    if dbEvents:
        for row in dbEvents:
            clock = row["clock"]
            value = row["value"]
            diff = max(int(clock) - int(Time), 0)
            Time = clock

            if State == 0:
                False_time += diff
                State = value

            elif State == 1:
                True_time += diff
                State = value

        if State == self.ZBX_MAPPING["TRIGGER_VALUE_FALSE"]:
            False_time = False_time + endTime - Time
        elif State == self.ZBX_MAPPING["TRIGGER_VALUE_TRUE"]:
            True_time = True_time + endTime - Time
        Total_time = True_time + False_time

        if Total_time == 0:
            resultDict = {
                'true_time': 0,
                'false_time': 0,
                'true': 0,
                'false': 0
            }
        else:
            resultDict = {
                'true_time': True_time,
                'false_time': False_time,
                'true': "%.4f" % ((100 * True_time) / Total_time),
                'false': "%.4f" % ((100 * False_time) / Total_time)
            }
        return True, resultDict
    return False, "dbEvents Query error!"
```