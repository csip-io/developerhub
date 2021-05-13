---
title: Calling App Method
slug: /calling-app-method
---

### Calling method using REST API

When you call a app method you can pass your arguments as `value` object. For example this is how you can call a public method with a string argument:

```
{
  "value": "Hi"
}
```

Response will be something like:

```
{
  "result": "Hello world!"
}
```

You can provide an empty argument list as shown below for methods do not require an input:

```
{
  "value": {}
}
```

> ### 🚧 Using HTTP GET
> Alternatively, you can call a method using HTTP GET 
> `GET https://api.csip.io/v3/data/devices/:ref/methods/:ref?args=`
