# 服务端接口的约束

1. api返回结果格式

```{
    code: 1/0,
    err: xxx,
    data: xxx
}
```

2. 集合article请求的具体请求方式（接口统一为： /api/article）
    1. 增加文章
        1. method：post请求
        2. 参数：文章对象，具体放在body里面，raw/json
    2. 删除文章
        1. method：delete请求
        2. 参数：aId文章id
    3. 查询一篇文章
        1. method：get请求
        2. 参数：path    /aId
    4. 分页查询文章
        1. method：get请求
        2. 参数：query   ?page=1&limit=10&key=1
    5. 修改一篇文章
        1. method: put
        2. 参数：path /aId, body 文章对象，具体放在body里面，raw/json

