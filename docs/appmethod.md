---
title: App Method
slug: /appmethod
---

**App Method** data connector streams data into given app method. **App** can be used as an abstraction to analyze data coming from different devices, store state in app properties to make decisions, and generate alerts based on conditions. This connector can be very handy when making domain decisions based on multiple device states without doing polling. You can create an app for each scenario or analysis. For example if you make a decision if a person left home or not based on a contact sensor on the front door and a motion detector looking into the hallway, you can create an app, plug these two sensors into this app and create an App Method data connector to stream and analyze the device data.

**App Method** configuration object consists of the following attributes:

|Attribute|	Description|
| :-------------: |:-------------:| 
|type	|Connector type; must be always set to method.|
|id	|App wide unique connector id.|
|method|	Id or name of the App method that will receive data value.|
|dataProcessingMethod	|Optional. Id or name of the App method that will be used for filtering and/or transforming incoming data. This method will be called before data sent to method. See Overview page for details.|
|disabled|	Optional. When true data connector stops streaming.|

**Create:**
```
POST .../v3/apps/:ref/dataconnectors

{
  "type": "method",
  "id": "dc.method.1",
  "method": "_mtd_796058493958380409",
  "dataProcessingMethod": "_mtd_695058884056880409",
  "disabled": false
}
```