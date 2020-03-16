---
title: "openresty使用Lua开发简单功能页面"
date: 2020-03-16T10:46:56+08:00
draft: false
series: ["openresty"]
categories: ["lua"]
---

> 本文章记录使用lua开发简单API功能页.


# 前言

开发过程中遇到一些特别简单的接口需求，但是单独写一个api接口页面又很麻烦的需求，这个时候可以借助lua来实现.


# 思路

将简单api功能模块化，统一存放某个路径.

调用时判断模块是否存在，否则返回404.

# 架构


实现根据字符串加载模块

utils/tools.lua

```lua
Tools = { _VERSION = "0.1" }

-- 字符切割
function Tools:split(s, p)
    local rt = {}
    string.gsub(s, '[^' .. p .. ']+', function(w)
            rt[#rt + 1] = w
    end)
    return rt
end

-- 返回404
function Tools:page_not_found(message)
    local message = message or "not found."
    ngx.say(message)
    ngx.exit(404)
end

-- 获取包
function Tools:get_pack(module_name)
    local file_path = package.searchpath(module_name, package.path, '.', '/')
    if not file_path then
        return nil
    end
    local loader = loadfile(file_path)
    return loader
end

-- 加载包或直接返回404
function Tools:require(modname)
    if not package.loaded[modname] then
        local loader = self:get_pack(modname)
        if loader then
            local module = loader(modname)
            return module
        else
            self:page_not_found(modname..' pack not found.')
        end
    end
    return package.loaded[modname]
end

return Tools
```

root.lua

```lua
ngx   = ngx
Tools = require("utils.tools")

local paga_name = Tools:split(ngx.var.request_uri, '/')[2]
if paga_name == nil then
    Tools:page_not_found("page not found.")
end

Tools:require("page/"..paga_name).main()
```

截取URL，判断page目录下功能模块是否存在，如果存在直接实例化main，否则返回404页面.

# 配置

```
server {
    listen       80;
    server_name  xxxx;

    location /page {
        access_by_lua_file lua/root.lua;
    }
    # ...
}
```

# 功能页

### page/ping.lua

用于监控心跳检测

```lua
_M = {}

function _M:main()
    ngx.say('pong')
end

return _M
```

请求:  curl http://localhost/page/ping
返回:  pong

### page/info.lua

实现页面查询Redis某个值

```lua
_M = {}

function _M:main()
    local query_string = ngx.req.get_uri_args()
    -- GET请求  info参数
    if query_string.info then
        local info_value =  Redis:get(query_string.info)
        if info_value   == ngx.null  then
            Tools:page_not_found("info not found.")
        end
        ngx.say(info_value)
    end
end

return _M
```

请求:  curl http://localhost/page/info/?info=test
返回:  test value / 404