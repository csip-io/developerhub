---
title: Data Point
slug: /data-point
---

|  Attribute|	Description|
| :-------------: |:-------------:|
|t	| Reading time. The time when the data value is captured in ISO 8601 format - time zone designator is required.
|v |	Observed value (a.k.a reading). Should match to its destination property's type.
|tt	|***Optional.*** A numeric value can be given as delta in milliseconds relative to base time given at feed level. Can be both negative and positive.|
|tags	|***Optional.*** Array of tags associated with the data point.|
|loc	|***Optional.*** The location where the data point is captured. See Location subresource for details.|
|prop	|***Optional.*** id or name of the destination property. This metadata is required by the system to identify the destination property when it cannot be inferred from the endpoint i.e. `POST .../v3/data/devices/{id or name}/properties.`|
|ann	|***Optional.*** The list of annotations (metadata) associated with this data point.|

> ### 🚧 Rule 
> Some default attributes defined inside the `Feed` object level might overlap with the attributes defined within the `Datapoint` object. In such case the attributes defined inside the `Datapoint` object takes precedence over Feed object level ones. For example `loc` object defined in `Feed` can be overwritten by another `loc` object defined inside the `Datapoint` object.

It is highly recommended to move all repetitive information from data point level to Feed level using default attributes and annotations in order to minimize the data size on wire.

For example all three representations shown below are considered identical by the system.

#### Verbose:
````
{
  "dps": [
   { "t": "2017-05-01T14:00:37.575Z", "v": 23.45, 
    "ann": { "cusId": "C3434" }, "loc": { "zone": "factory1"}, "tags": ["test"]
   },
   { "t": "2017-05-01T14:00:37.645Z", "v": 23.65, 
    "ann": { "cusId": "C3434" }, "loc": { "zone": "factory1"}, "tags": ["test"]
   },
   { "t": "2017-05-01T14:00:37.775Z", "v": 24.01, 
    "ann": { "cusId": "C3434" }, "loc": { "zone": "factory1"}, "tags": ["test"]
   },
   { "t": "2017-05-01T14:00:37.885Z", "v": 23.99, 
    "ann": { "cusId": "C3434" }, "loc": { "zone": "factory1"}, "tags": ["test"]
   }
  ]
}
````

#### Optimized: 
````
{
  "ann": { "cusId": "C3434" },
  "tags": ["test"], 
  "loc": { "zone": "factory1" },
  "dps": [
   {"t": "2017-05-01T14:00:37.575Z", "v": 23.45},
   {"t": "2017-05-01T14:00:37.645Z", "v": 23.65},
   {"t": "2017-05-01T14:00:37.775Z", "v": 24.01},
   {"t": "2017-05-01T14:00:37.885Z", "v": 23.99}
  ]
}
````

#### More Optimized:
```` More optimized
{
  "ann": { "cusId": "C3434" },
  "tags": ["test"], 
  "loc": { "zone": "factory1" },
  "t": "2017-05-01T14:00:37.645Z",
  "dps": [
   {"tt": -70, "v": 23.45},
   {"v": 23.65},               // "tt": 0 is not required
   {"tt": 130, "v": 24.01},
   {"tt": 240, "v": 23.99}
  ]
}
````

### Some Data Point Examples

#### 4 data points with explicit property names

````
{
  "dps": [
    { "t": "2017-05-01T14:00:57.435Z", "v": 23.45, "prop": "temperature" },
    { "t": "2017-05-01T14:01:58.421Z", "v": 23.40, "prop": "temperature" },
    { "t": "2017-05-01T15:00:54.786Z", "v": 55, "prop":"humidity", "tags":["Fan345"]},
    { "t": "2017-05-01T15:01:56Z", "v": 65, "prop": "humidity"},
  ]
}
````

#### Waypoint example

````
{
  "dps": [
    { 
      "t": "2015-05-01T14:00:57Z", 
      "v": { "geo": { "lat": 49.35, "lon": -123.07 } } }
   ]
}
````

> #### 📘 Tip
> Waypoint properties are special and accept `location` object as value.
