---
title: "Logstash处理Nginx中文Post内容乱码"
date: 2020-01-04T19:08:29+08:00
draft: true
tags: ["Logstash"]
series: ["ELK"]
categories: ["ELK"]

---


# 前言

需求：采集Nginx用户Post内容.

> 本文章记录采集中有中文字符，出现乱码问题的处理.

# 解决

scripts/nginx_request_body.rb

```ruby
def filter(event)
    # 设置index日期
    event.set('index_day', event.timestamp.time.localtime.strftime('%Y%m%d'))

    # 切割message
    message_array = event.get("message").split("||")
    event.set("host", message_array[1])
    ...

    # request_body字段
    request_body = message_array[13]
    if request_body.nil? || request_body == '-' || request_body.empty? then
        return [event] 
    end

    # 排除form-data
    if request_body.include? "Content-Disposition: form-data" then
        event.set("[post_data]", "form-data")
        return [event]
    end

    # 重点
    request_body = request_body.gsub('\\x22','"')
    # \\xx to chr
    pt = 0
    new_request_body = ''
    begin
        while pt < request_body.length do
            if request_body[pt] == '\\' and request_body[pt + 1] == 'x' then
                word = (request_body[pt + 2] + request_body[pt + 3]).to_i(16).chr
                new_request_body = new_request_body + word
                pt = pt + 4
            else
                new_request_body = new_request_body + request_body[pt]
                pt = pt + 1
            end
        end
    rescue
        event.set("[post_data]", request_body)
        return  [event]
    end

    # 内容脱敏采集
    begin
        Array["password","user.pwd","user_pwd"].each{ | e|
            if new_request_body.include? e
                new_request_body.gsub!(/#{e}=.*&/,"#{e}=***&")
            end
        }
        new_request_body.gsub('\"','')
        event.set("[post_data]", new_request_body)
    rescue
        event.set("[post_data]", "setting post_data error!")
    end

    return [event]
end
```

nginx.conf
```conf

filter {
    if [fields][out_topic] == "logstash-nginx_access" {
        # 引入脚本
        ruby {
            path => "/etc/logstash/scripts/nginx_request_body.rb"
        }
        useragent {
            source => "http_user_agent"
            target => "user_agent"
        }
        geoip {
            source => "remote_addr"
            target => "geoip"
            database => "/var/GeoLite/GeoLite2-City.mmdb"
            add_field => [ "[geoip][coordinates]", "%{[geoip][longitude]}" ]
            add_field => [ "[geoip][coordinates]", "%{[geoip][latitude]}" ]
        } 
        mutate {
            convert => [
                "status","integer",
                "request_time","float",
                "upstream_response_time","float",
                "[geoip][coordinates]", "float"
            ]
            remove_field => "message"
            remove_field => "prospector"
            remove_field => "request"
        }
    }
}
```
