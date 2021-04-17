---
title: Calling Device Method
slug: /calling-device-method
---

## Calling method using REST API

When you call a device method you can pass your arguments as `value` object. For example this is how you can call a public method with a string argument:

`POST https://api.csip.io/v3/data/devices/:ref/methods/:ref`

````
{
  "value": "Hi"
}
````

Response will be something like:

````
{
  "result": "Hello world!"
}
````

You can provide an empty argument list as shown below for methods do not require an input:
````
{
  "value": {}
}
````

> #### 🚧 USING HTTP GET
> Alternatively, you can call a method using HTTP GET
>  `GET https://api.csip.io/v3/data/devices/:ref/methods/:ref?args=`

## Calling methods through MQTT

In some cases you might want to feed data into device methods via MQTT in order to make some transformation on the raw input. For such purpose, Csip.io provides two topics to call methods through MQTT.

The first topic allows you to call single method:

`csipio/data/out/devices/:id/methods/:method_name`

The second topic allows you to call multiple methods at once.

`csipio/data/out/devices/:id/methods/json`

````
{ 
  "dps": [ 
     { "method": "mymethod1", "value": 6 },
     { "method": "mymethod2", "value": [7, 4] },
     ............
  ]
}
````