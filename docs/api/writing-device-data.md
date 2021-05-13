---
title: Writing Device Data
slug: /writing-device-data
---

The following rules apply to write operations:

1. Data must be always written into a property belonging to a device or app.

2. All write operations return HTTP status code 200 with a receipt object stating how many data points are accepted and how many are rejected. In order to find out the cause of rejections, you should set the device to debug mode and check its logs.

3. A valid data feed object must be provided as payload - see Data Feed.

4. Valid credentials must be provided - see [API Keys](https://csip.io/docs/apiaccess).

> ### ❗️ API Keys
> In order to complete a write operation successfully the system requires to know the requester and the destination object identities. A destination object can be a device or app property.
> 
API key credentials conveyed in the basic authentication header provides Csipio with both the identity of the requester (authentication), and the authorization information. A combination of URL path and prop attribute defined in the data feed or object provides the system with the destination object identity.
> 
In many cases the system acts differently on the request based on the requester's identity. For example, if the requester is a device, and the request is a write operation, the system doesn't consider this as a device command and send it to the physical device. On the other hand, if the requester is an external entity, then it considers it as a device command and sends this data to the device automatically over MQTT. We are going into details of this mechanism shortly.

Below we write data into a public device property called "SetPoint" using an api client key:

```
curl -X POST https://api.csip.io/v3/data/devices/thermostat/properties/setpoint \
    --user {apiclient_apikeyid}:{apiclient_apikeysecret} \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    -d @payload.json
```

> ### ❗️ Data Resolution
> The time resolution of data points is millisecond. Data points that are written into a property with the same timestamps at this resolution will overwrite each other in the time-series database, but they are stored separately in the event journal.

---

## Writing device properties

You can write device properties in groups using the conventional object format.

If you are writing using a device key you can substitute {ref} with `_this_.`

POST https://api.csip.io/v3/data/devices/ref

#### Sample Payload
````
{
  "property1": 23.3,
  "property2": "Some value"
}
````

## Single or Multiple data point(s) single property

You can write single or multiple data point(s) into single property using Data Feed format.

If you are writing using a device key you can substitute {ref} with _this_. See Data Feed format for details.

POST https://api.csip.io/v3/data/devices/ref/properties/prpref

````
{
  "dps": [
    { "t": "2017-05-01T14:00:17.799Z", "v": 23.45 },
    { "t": "2017-05-01T14:00:23.799Z", "v": 22.845 }
  ]
}
````

> ### 📘 Tip

> Note that there is no need to specify the data source (i.e. device) since it will be inferred by the system through the device key conveyed in the basic authentication header. That's why `_this_ ` is totally fine instead of device id.
> Replace this with the actual device id, or name to identify your destination object if you are using an user or api client key.

## Multiple data points multiple properties

You can write multiple data points into multiple properties using Data Feed format.

If you are writing using a device key you can substitute {ref} with `_this_.` See Data Feed format for details

POST https://api.csip.io/v3/data/devices/ref/properties

````
{
  "dps": [ 
    { "t": "2017-05-01T14:00:17.799Z", "v": 23.45, "prop": "temperature" }, 
    { "t": "2017-05-01T14:00:18.830Z", "v": 34, "prop": "humidity" }
  ]
}
````

## Writing through MQTT endpoint

Csip.io supports both `tcp` and `websocket` connections to its MQTT broker. The following addresses must be used when connecting to the Csip.io platform over MQTT:

|Protocol|	Address|
| :-------------: |:-------------:|
|Tcp|	tcp://mqtt.csip.io:1883|
|Secure Tcp	|tcp://mqtt.csip.io:8883|
|Websocket|	ws://mqtt.csip.io:8000|

> ### 🚧 IMPORTANT
> Only MQTT version 3.1.1 is supported.
> Make sure that your keep-alive is 25 seconds, and timeout is 60 seconds.

### Important MQTT Topics

| Topic |	Description|
| :-------------: |:-------------:|
| csipio/data/out/devices/{id}/properties/{name} |	publish data to the platform in raw format (e.g. 45 as temperature value). String values should be between quotes (e.g. "Operational"), and object types can be provided as standard JSON objects (e.g. {"config": { "volume": 34 } }). |
|csipio/data/out/devices/{id}/json|	publish data to the platform in JSON. Ideal for batch writes.|

> #### ❗️ Property Names in Topics
> Property names must be always given in lowercase within the topic paths.

### Writing over MQTT

MQTT provides a stateful and bi-directional connection to devices. The same connection can be used both for writing and receiving data to/from the platform.

In order to write data to the platform a device should do the following:

1. It should connect to one of the MQTT endpoints using its device id as the client id, device key id as the username and device key secret as the password.

2. Once connected, it can publish data in two ways:

    2.1.  Device can publish single data point to `csipio/data/out/devices/{id}/properties/{name} `- no timestamp is needed, just the raw data (e.g. 34, or `"alert_state"`, or `{ "version": "1`.2" }. Timestamp is set automatically by the server at the time of the receive.
    
    2.2. Alternatively, multiple data points can be published to `csipio/data/out/devices/{id}/json` topic in Data Feed format for more control.

For example: `csip.io/data/out/devices/_dev_571692235317590466/json`

````
{
  "dps": [
    { "t": "2017-05-01T14:00:57.467Z", "v": 15.45, "prop": "temperature" },
    { "t": "2017-05-01T14:00:57.468Z", "v": 45, "prop": "humidity"},
    ...
  ]
}
````