---
title: "Django Rest Framework JWT鉴权实践"
date: 2019-03-22T19:01:13+08:00
draft: false
tags: ["drf"]
series: ["django"]
categories: ["Python"]
---

> 本文章记录在drf框架中对JWT鉴权实践过程.

# 实践

安装`djangorestframework-jwt`模块


## 场景1: 修改默认Username作为用户名验证

> 改成以uid作为用户名

settings.py

```python

JWT_PAYLOAD_GET_USERNAME_HANDLER = 'uid'

# 修改验证后端
AUTHENTICATION_BACKENDS = [
    'auth.utils.UidAuthenticate'
]

REST_USE_JWT = True

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser'
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',  
    )
}
```

auth.utils
```python
class UidAuthenticate(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # 改动此处
            user = User.objects.get(uid=username)
            if user.check_password(password):
                return user
        except Exception as e:
            return None
```

models.py
```python
from django.contrib.auth.models import AbstractUser
class User(AbstractUser):
    # ...

    # 类中指定uid作为用户名字段
    USERNAME_FIELD = 'uid'
```

url.py
```python
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # 登录
    path('login/',obtain_jwt_token)
]
```

测试

```shell
curl --request POST \
  --url http://localhost:8000/login/ \
  --header 'cache-control: no-cache' \
  --header 'content-type: multipart/form-data;'
  --form password=123123123 \
  --form uid=123

# {
# "token": "eyJ0eXAiOiJKV1QiLCJhbDcu9pvU ..."
# }
```

## 场景2: 新增LDAP支持

提示

- 官网: 验证模块应该是可插拔的。
- 列表顺序等于验证顺序，验证不通过就用下一个，直到全部失败。


settings.py

```python
AUTHENTICATION_BACKENDS = [
    'auth.utils.UidAuthenticate',

    # 新增
    'django_auth_ldap.backend.LDAPBackend',
]

# 根据实际修改
AUTH_LDAP_SERVER_URI = AD_DOMAIN
AUTH_LDAP_BIND_DN = AD_ADMIN_USER
AUTH_LDAP_BIND_PASSWORD = AD_ADMIN_PASSWD
AUTH_LDAP_USER_SEARCH = LDAPSearch(AD_DN, ldap.SCOPE_SUBTREE, "(&(objectClass=person)(samaccountname=%(user)s))")
AUTH_LDAP_ALWAYS_UPDATE_USER = True
AUTH_LDAP_USER_ATTR_MAP = {
    "username": "cn",
    "email": "mail",
    "first_name":"sn",
    "last_name":"givenName",
    "uid": "sAMAccountName",
}

```

## 场景3: Payload自定义

utils.py
```python
def jwt_payload_handler(user):
    username_field = get_username_field()
    username = get_username(user)
    warnings.warn(
        'The following fields will be removed in the future: '
        '`email` and `user_id`. ', DeprecationWarning)
    # 自定义
    payload = {
        'user_id': user.pk,
        'username': username,
        'user_title': user.user_title,
        'user_role': user.user_role,
        'exp': datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA
    }
    if hasattr(user, 'email'):
        payload['email'] = user.email

    payload[username_field] = username

    if api_settings.JWT_ALLOW_REFRESH:
        payload['orig_iat'] = timegm(datetime.utcnow().utctimetuple())

    if api_settings.JWT_AUDIENCE is not None:
        payload['aud'] = api_settings.JWT_AUDIENCE

    if api_settings.JWT_ISSUER is not None:
        payload['iss'] = api_settings.JWT_ISSUER

    return payload
```

settings.py

```python
JWT_AUTH = {
    'JWT_PAYLOAD_HANDLER': 'utils.jwt_payload_handler'
}
```

### 场景4: Response自定义

utils.py
```python
def jwt_response_payload_handler(token, user=None, request=None):
    user = User.objects.get(uid=str(user))
    return {
        'token': token,
        # 自定义返回
        'user': {
            'role': user.user_role,
            'username': user.username,
            'title': user.user_title,
        },
    }
```

settings.py
```python
JWT_AUTH = {
    'JWT_RESPONSE_PAYLOAD_HANDLER': 'utils.jwt_response_payload_handler'
}
```