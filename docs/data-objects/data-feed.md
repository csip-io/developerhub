---
title: Data Feed
slug: /data-feed
---

The main entity used for writing data is called `DataFeed` or simply as `Feed` object. It encapsulates the data points and the metadata associated with the data point and/or the write operation. The simplest form of a `Feed` object is as follows:

````
{
  "dps": [{ "t": "2015-05-01T14:00:37Z", "v": 23.45 }]
}
````

Below shows an example of `Feed` object with tags, `loc` and annotation (`ann`) metadata.

````
{
  "ann": { 
    "CustomerID": "FRI8-495035-4039503",
    "AmbulanceCode": "49584"
  },
  "tags": ["test"], 
  "loc": { "geo": { "lat": 49.35031020677566, "lon": -123.07629883289337 } },
  "dps": [ { "t": "2015-05-01T14:00:37Z", "v": 23.45 } ]
}
````

`Feed` object has the following attributes:

| Attribute	| Description|
| :-------------: |:-------------:|
| dps	| Array of `Datapoint` objects. See below. |
| tags |	***Optional.*** Tags that will be associated with every data points in this feed when processed. Can be override by the data point tags. |
| loc |	***Optional.*** Location that will be associated with every data points in this feed when processed. Can be override by data point location. See Location subresource for details. |
| prop	| ***Optional.*** Property name or id that feed data points will be associated with. If property name is ambiguous (i.e. has multiple properties with the same name belong to different device profile) then the user should use qualified name of the property such as, `<deviceprofile_name>$<property_name>.` |
| ann	| ***Optional.*** The list of annotations (customer metadata) associated with this feed. |
| t	| ***Optional.*** Base time. | 

### Annotations

Every `Feed` and `Datapoint` object can be enriched by using annotation mechanism. It becomes very handy when establishing relationships between the collected data and external entities unknown to the Connio platform, similar to foreign key mechanism. Especially handy when streaming data to an external data store through a Connio app.

> #### 🚧 Rule
> Max 10 user defined annotations are allowed, annotation value must be provided in quotes, and their size cannot exceed 128 characters.