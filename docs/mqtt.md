---
title: MQTT
slug: /mqtt
---


MQTT data connector configuration object consists of the following attributes:

|Attribute|	Description|
| :-------------: |:-------------:| 
|type|	Connector type; must be always set to mqtt.|
|id	|App wide unique connector id.|
|server|	Provide only the domain part of the URL without scheme.|
|port	|Service port number.|
|ssl|	Either true or false. If true uses TLS connection.|
|sslConfig|	**Optional** Used when server uses a self signed certificate. It consists of two sections: server and client. Each section has its own fields as shown in Test and Create example.|
|credentials|	**Optional** Username and password to connect to the broker.|
|clientId|	MQTT client id.|
|topic|	MQTT topic.|
|qos|	Quality of service level, one of qos0, qos1, and qos2.|
|dataProcessingMethod|	**Optional.** Id or name of the App method that will be used for filtering and/or transforming incoming data. See Overview page for details.|
|disabled|	**Optional.** When true data connector stops streaming.|

```
POST .../v3/apps/:ref/dataconnectors

{
  "id": "dc.mqtt.notsecure.1",
  "type": "mqtt",  
  "server": "test.mosquitto.org",
  "port": 1883,
  "clientId": "test-jc-2",
  "topic": "test-jc-1",
  "qos": "QoS0",
  "dataProcessingMethod": "processData",
  "ssl": false,
  "disabled": false
}
```

```
PUT .../v3/apps/:ref/dataconnectors/dc.mqtt.1

{
  "clientId": "test-client",
  "dataProcessingMethod": "processData"  
}
```