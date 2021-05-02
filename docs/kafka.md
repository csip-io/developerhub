---
title: Kafka
slug: /kafka
---


Kafka data connector configuration object consists of the following attributes:

| Attribute | 	Description| 
| :-------------: |:-------------:| 
| type| 	Connector type; must be always set to kafka.| 
| id	| App wide unique connector id.| 
| server| 	Provide only the domain part of the URL without scheme.| 
| port| Service port number.| 
| ssl	| Either true or false. If true uses TLS connection.| 
| sslConfig| 	**Optional**  Used when server uses a self signed certificate. It consists of two sections: server and client. Each section has its own fields as shown in Test and Create example.| 
| topic	| The name of the topic that the message will be delivered to.| 
| dataProcessingMethod| 	**Optional.** Id or name of the App method that will be used for filtering and/or transforming incoming data. See Overview page for details.| 
| disabled | **Optional.** When true data connector stops streaming. |

**Create:**
```
POST .../v3/apps/:ref/dataconnectors

{
    "type": "kafka",
    "id": "dc.kafka.1",
    "server": "kafka-3ab75600-smart-bb56.aivencloud.com",
    "port": 14016,
    "topic": "test",
    "ssl": true,
    "sslConfig": {
     "server": {
       "certificate": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----"
        },
     "client": {
       "certificate": "-----BEGIN CERTIFICATE-----\...-----END CERTIFICATE-----",
       "key": "-----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----"
     }
    },
    "dataProcessingMethod": "processData",   
    "disabled": false
}
```

**Update:**
```
PUT .../v3/apps/:ref/dataconnectors/dc.kafka.1

{
  "topic": "test",
  "dataProcessingMethod": "processData",
  "ssl": true
  "disabled": false
}
```