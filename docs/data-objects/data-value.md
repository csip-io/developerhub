---
title: Data Value
slug: /data-value
---

Once validated, each incoming data point is processed and transformed into a data value object. It is mainly used to represent an accepted property or method value. This representation is mainly used when streaming values to external data stores - see Data Connectors.

Simply put a data value is an enriched version of the data point with source, destination, annotations, device and profile metadata and context. It contains all the information required to make it loosely coupled with the rest of the system. It is read-only and cannot be modify by the users.

> #### 🚧 Rule
> Note that data value object representation is not used for time-series database query results. See Reading Device Data section for time-series database queries.

### Object attributes

|  Attribute|	Description|
| :-------------: |:-------------:|
|feedId	|Unique feed id. Multiple data points might share the same feed id if sent in the same data feed object. This allows you to group data points by transmission automatically.|
|account|	The account context where this operation took place.|
|app|	The app that persisted this data value.|
|sourceTime	| Time attached to the data point at source. Also known as reading, or capture time.|
|serverTime	| Time when the data point is received by the server. |
|location|	Location of this data point is captured, optional.|
|tags	|All the tags associated with the data point, optional.|
|annotations|	List of user defined annotations (i.e. key/value pairs), optional. If the source is a device and meta data annotation is enabled, all device meta data is listed under this field.|
|source	|Data source information. ip shows the remote ip of the data source. object is the entity that wrote the data point to the platform (i.e. device, api client or user). protocol is the protocol endpoint received the data point (i.e. mqtt or rest - more is coming). apiKeyId is the api key id used to make the request.|
|destination|	Entity that accepted the written data point. object is the entity that accepted the written data point (i.e. device, or app). property or method endpoints within the object where the data point is written. state is the context of the object (i.e. values of all properties).|
|value|	Value of the data point.|

````
{
  "feedId": "3029106e-e704-457e-b5c3-4b09a3b9a811",
  "account": { "id": "_acc_012345678987654321", "name": "inbiza" },
  "app": { "id": "_pp_012345678987654321", "name": "SmartFactory_1" },
  "sourceTime": "2015-07-03T14:00:37.654Z",
  "serverTime": "2017-07-04T00:01:31.689Z",
  "location": {
    "zone": "sector-1"
  },
  "tags": [
    "calibrated",
    "grp:Test"
  ],
  "annotations": {
    "cusId": "FRI8-495035-4039503",
    "facility": "michigan",
    "sn": "SN-001-0023904"
  },
  "source": {
    "ip": "53.69.144.98:61785",
    "object": { "id": "_dev_924329922537879076", "name": "Compressor.1" },
    "protocol": "rest",
    "apiKeyId": "_key_924764072656096783"
  },
  "destination": {
    "object": { "id": "_dev_924329922537879076", "name": "Compressor.1" },
    "property": { "id": "_prp_924329914680031017", "name": "PressureH" },
    "state": { "PressureH": 34.5, "Temperature": 45.6, "Vibration": 3 }
  },
  "value": 23.45
}
````

Alternatively, destination field might have a method object (e.g. `{ "method": { "id": "_mtd_924329914680031017", "name": "SetPressure" }).`