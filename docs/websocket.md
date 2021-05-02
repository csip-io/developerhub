---
title: WebSocket
slug: /websocket
---

WebSocket data connector configuration object consists of the following attributes:

|Attribute	|Description|
| :-------------: |:-------------:| 
|type|	Connector type; must be always set to `ws`.|
|id	|App wide unique connector id.|
|server	|Provide only the domain part of the URL without scheme.|
|port|	Service port number.|
|ssl	|Either `true` or `false`. If true wss scheme is used instead of .|
|path|	**Optional.** Subdirectory part of the URL.|
|headers|	**Optional** Custom HTTP headers. User can add up to 10 headers.|
|credentials	|**Optional** Basic authentication credentials object. Consists of user and password fields.|
|dataProcessingMethod|	**Optional.** Id or name of the App method that will be used for filtering and/or transforming incoming data. See Overview page for details.|
|disabled|  **Optional.** When `true` data connector stops streaming.|

---

**Create**:
```
POST .../v3/apps/:ref/dataconnectors

{
  "type": "ws",
  "id": "dc.ws.1",
  "server": "echo.kaazing.com",
  "port": 443,
  "ssl": true,
  "path": "/echo",
  "dataProcessingMethod": "_mtd_695058884056880409",
  "disabled": false
}
```
---

**Update**:
```
PUT .../v3/apps/:ref/dataconnectors/dc.ws.1

{
  "dataProcessingMethod": "processWSData"
}
```