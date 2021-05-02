---
title: HTTP
slug: /data-connector-http
---

HTTP data connector configuration object consists of the following attributes:

|Attribute	|Description|
| :-------------: |:-------------:| 
|type|	Connector type; must be always set to http regardless of ssl selection.|
|id	|App wide unique connector id.|
|server|	Provide only the domain part of the URL without scheme.|
|port	|Service port number.|
|ssl|	Either true or false. If true HTTPS scheme is used instead of HTTP.|
|path|	Optional Subdirectory part of the URL.|
|method	|HTTP verb. Can be either PUT or POST.|
|headers|	Optional Custom HTTP headers. User can add up to 10 headers.|
|credentials|	Optional Basic authentication credentials object. Consists of user and password fields.|
|dataProcessingMethod	|Optional. Id or name of the App method that will be used for filtering and/or transforming incoming data. See Overview page for details.|
|disabled|	Optional. When true data connector stops streaming.|

**Create:**
```
POST .../v3/apps/:ref/dataconnectors

{
    "type": "http",
    "id": "dc.http.1",
    "server": "postb.in",
    "port": 443,
    "ssl": true,
    "method": "post",
    "path": "/1568035078234-1569763426668",
    "credentials": {
        "user": "user",
        "password": "password"
    },
    "headers": {
        "test-header": "Hello world!"
    },
    "dataProcessingMethod": "processData",
    "disabled": false
}
```

**Update**
````
PUT .../v3/apps/:ref/dataconnectors/dc.http.1

{
    "ssl": true,
    "method": "post",
    "path": "/1568035078234-1569763426668",
    "headers": {
        "test-header": "Hello world!"
    },
    "dataProcessingMethod": "_mtd_695058884056880409"
}
````

> ### 📘 Important
>[1] Explicit `Content-Type: application/json` header is not required.
>[2] HTTP data connector does not support TEST endpoint.