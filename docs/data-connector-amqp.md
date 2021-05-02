---
title: AMQP
slug: /data-connector-amqp
---

AMQP data connector configuration object consists of the following attributes:

|Attribute	|Description|
| :-------------: |:-------------:| 
|type	|Connector type; must be always set to `amqp`.|
|id	|App wide unique connector id.|
|server	|Provide only the domain part of the URL without scheme.|
|port|	Service port number.|
credentials|	Optional Username and password to connect to the service.|
|ssl	|Either `true` or `false`. If true uses TLS connection.|
|sslConfig|	**Optional**  Used when server uses a self signed certificate. It consists of two sections: `server` and `client`. Each section has its own fields as shown in `Create` example.|
|queue|	The name of the queue that the message will be delivered to.|
|vhost	|**Optional**  Virtual host name, if needed.|
|dataProcessingMethod|	**Optional.**  Id or name of the App method that will be used for filtering and/or transforming incoming data. See Overview page for details.|
|disabled|	**Optional.** When `true` data connector stops streaming.|

---
**Create**:
````
POST .../v3/apps/:ref/dataconnectors

{
   "id": "dc.amqp.1",
   "type": "amqp",
   "server": "caterpillar.rmq.cloudamqp.com",
   "port": 5672,
   "credentials": {
     "user": "ikyzv",
     "password": "tVEgVdRX8QAW0_U0DrO5Gv26hLk5"
   },
   "sslConfig": {
     "server": {
       "certificate": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----"
     },
     "client": {
       "certificate": "-----BEGIN CERTIFICATE-----....-----END CERTIFICATE-----",
       "key": "-----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----",
       "password": "somepassw"  
     }
   },  
   "vhost": "ikyzvusw",
   "queue": "jc",
   "dataProcessingMethod": "processData",
   "ssl": false,
   "disabled": false
}
````

---

**Update**:
````
PUT .../v3/apps/:ref/dataconnectors/dc.amqp.1

{
   "credentials": {
     "user": "ikyz12122v",
     "password": "tVEgVdRX8QAW01212_U0DrO5Gv26hLk5"
   },
   "vhost": "ikyzvusw12122",
   "queue": "newQ",
   "dataProcessingMethod": "processData2"  
}
````