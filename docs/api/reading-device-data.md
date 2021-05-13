---
title: Reading Device Data
slug: /reading-device-data
---

You can read the most recent or historical values of device and app properties using either the device key, or proper api client key.

## Reading device properties

You can read all device properties in conventional object format as shown below.

If you are writing using a device key you can substitute {ref} with `_this_.``


#### curl GET

``` curl --request GET \
  --url https://api.csip.io/v3/data/devices/ref 
```

#### Node GET

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/data/devices/ref';
const options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### Ruby GET

```
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/data/devices/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript GET

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/data/devices/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python GET 

```
import requests

url = "https://api.csip.io/v3/data/devices/ref"

response = requests.request("GET", url)

print(response.text)
```

## Reading device state through State object

You can read full device state including its meta data, methods, properties and alerts. You can also shape the response object by providing parameters shown below.

If you are writing using a device key you can substitute {ref} with `_this_.`

#### curl GET

```
curl --request GET \
  --url 'https://api.csip.io/v3/data/devices/ref/state?header=false&meta=false&stats=false'
``` 

#### Node GET

``` const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/data/devices/ref/state?header=false&meta=false&stats=false';
const options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));

```

#### Ruby GET 

```
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/data/devices/ref/state?header=false&meta=false&stats=false")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### Ruby GET

```
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/data/devices/ref/state?header=false&meta=false&stats=false")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body

```
#### JavaScript Get

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/data/devices/ref/state?header=false&meta=false&stats=false', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

```

#### Python GET 

```
import requests

url = "https://api.csip.io/v3/data/devices/ref/state"

querystring = {"header":"false","meta":"false","stats":"false"}

response = requests.request("GET", url, params=querystring)

print(response.text)
```

### State Object
Device state is a compact representation of device metadata, and the most recent device values. It is mainly consists of 4 sections:

1. State Header: mainly device metadata plus some additional fields
2. List of property instances: property metadata and the most recent instant value
3. List of method instances: method metadata and method statistics
4. List of alert instances: alert metadata and alert statistics
Most recent property values, method and alert statistics only show up after the first use. Users can customize state view using query parameters (see below) to include or exclude sections.

#### State Header

Below we list attributes specific to device state header.

| Attribute |	Description |
| :-------------: |:-------------:|
| initiatedAt| 	Device backend start date and time in ISO 8601 format. This is mostly used for debugging purposes. In general, a device backend begins to exist with the first incoming or outgoing data, but cluster manager can kill or start device backends as it sees fit.| 
| ingestion| Device ingestion rate. It consists of 2 fields: `rateLimit` defines the maximum number of feeds per minute, and `maxNrOfDpPerFeed` defines the maximum number of data points allowed per feed. ingestion cannot be changed by the user; it is automatically set by device's account plan. See your account plan details for device ingestion rates.| 

#### Properties

It consists of 4 subsections: `ref`, `meta`, `value` and `stats`. ref shows the property references, `meta` show the details of the property, value is the most recent value written into the property and `stats` shows the write statistics of this property.

At minimum, it has only `ref` and `meta` subsection. `value` and `stats` subsections show up only after the first write operation.

`meta` subsection contains the property instance meta data, value subsection contains the most recent value of the property instance in form of data value object, stats subsection contains property statistics where count shows how many times this property is set since its owner object is created.

Below we show a fully populated value and stats subsections of a numeric property instance. Non numeric properties contain only count field in their stats subsections.

```
"ref": {
  "id": "_prp_944478333222595585",
  "qname": "mysensor$temp"
},
"meta": {
  "id": "_prp_944478333222595585",
  "accountId": "_acc_944477132420380208",
  "ownerId": "_dpf_944477240279924130",
  "name": "Temp",
  "friendlyName": "Temperature",
  "qualifiedName": "mysensor$temp",
  "description": "Indoor temperature readings",
  "type": "number",
  "access": "protected",
  "publish": "changed",
  "retention": {
    "type": "mostrecent",
      "condition": {
        "when": "always"
       }
     },
  "locked": false,
  "dateCreated": "2017-06-27T03:07:42.324Z",
  "dateModified": "2017-06-27T03:07:42.324Z"
},
"value": {
  "mostRecent": 23,
  "time": "2017-07-21T00:27:59.123Z",
  "annotations": {
    "customer-id": "8CS238429929348923"
  },
  "location": {
    "zone": "Portland Factory",
    "geo": {
      "lat": 41.0296287,
      "lon": 28.6232202,
      "alt": 0
    }
  },
  "tags": [
    "grp:floor1"
  ]
},
"stats": {
  "count": 3,
  "min": 23,
  "max": 23,
  "sum": 69 
}
```

#### Methods

Method consists of 5 sections. `ref`, `meta`, `lastExecution`, `stats` and `disabled`. `lastExecution` shows a brief about the last execution. time shows execution time in milliseconds. `stats` section shows how many times this method is executed, minimum and maximum execution times in milliseconds.

```
"ref": {
  "id": "_mtd_944552945643610010",
  "qname": "mysensor$gettemperature"
},
"meta": {
  "id": "_mtd_944552945643610010",
  "accountId": "_acc_944477132420380208",
  "ownerId": "_dpf_944478335659071432",
  "name": "getTemperature",
  "friendlyName": "getTemperature",
  "inherited": false,
  "qualifiedName": "mysendor$gettemperature",
  "access": "public",
  "inputTTL": "5 seconds",
  "inputId": "_prp_944478333222595585",
  "methodImpl": {
    "funcBody": "if (value > 35.0) { return \"hot\" } else { return \"warm\"; }",
    "script": "javascript"
  },
  "locked": false,
  "dateCreated": "2017-07-27T05:38:05.593Z",
  "dateModified": "2017-07-27T05:41:48.56Z"
},
"lastExecution": {
  "status": "Success",
  "at": "2017-07-27T05:49:33.603Z",
  "time": 1
},
"stats": {
  "count": 1,
  "min": 1,
  "max": 1,
  "sum": 1,
  "failures": 0
},
"disabled": false
```

## Reading historical data

This section explains how to read data points from the system's time-series database.

#### cURL GET 

```
curl --request GET \
  --url 'https://api.csip.io/v3/data/devices/ref1/properties/ref2?source=object&limit=1000&order=desc'
```

#### Node GET

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/data/devices/ref1/properties/ref2?source=object&limit=1000&order=desc';
const options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### Ruby GET

```
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/data/devices/ref1/properties/ref2?source=object&limit=1000&order=desc")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript GET

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/data/devices/ref1/properties/ref2?source=object&limit=1000&order=desc', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python GET

```
import requests

url = "https://api.csip.io/v3/data/devices/ref1/properties/ref2"

querystring = {"source":"object","limit":"1000","order":"desc"}

response = requests.request("GET", url, params=querystring)

print(response.text)
```

This is a convenience method to make historical queries fast. It can be used as an alternative to /query endpoint. Grouping and Aggregators are not supported through this interface. Maximum 1000 data points can be fetched at a time.


## Querying historical data

This section explains how to read data points from the system's time-series database.

#### POST 

Endpoint: https://api.csip.io/v3/data/devices/ref1/properties/ref2/query

```
{
  "startRelative": {
    "value": 10,
    "unit": "days"
  },
  "attributes": { "source": ["object"] },
  "limit": 3,
  "aggregators": [
    {
      "name": "sum",
      "sampling": {
      "value": 10,
      "unit": "minutes"
    }
   }
  ]
}
```

### Query Object

|Attribute|	Description|
| :-------------: |:-------------:| 
|startAbsolute|	The time in ISO 8601 format.|
|startRelative|	Contains value and unit sub attributes. The relative start time is the current date and time minus the specified value and unit. Possible unit values are “milliseconds”, “seconds”, “minutes”, “hours”, “days”, “weeks”, “months”, and “years”. For example, if the start time is 5 minutes, the query will return all matching data points for the last 5 minutes.|
|endAbsolute|	The time in ISO 8601 format. This must be later in time than the start time. If not specified, the end time is assumed to be the current date and time.|
|endRelative|	The relative end time is the current date and time minus the specified value and unit. Possible unit values are “milliseconds”, “seconds”, “minutes”, “hours”, “days”, “weeks”, “months”, and “years”. For example, if the start time is 30 minutes and the end time is 10 minutes, the query returns matching data points that occurred between the last 30 minutes up to and including the last 10 minutes. If not specified, the end time is assumed to the current date and time.|
|timeZone|	The time zone for the time range of the query. If not specified, UTC is used.|
|aggregators|	This is an ordered array of aggregators. They are processed in the order specified. The output of an aggregator is passed to the input of the next until all have been processed. If no aggregator is specified, then all data points are returned.|
|tags|	System set data point tags. Can be ori or req. See above for possible values. Tags narrow down the search. Only property values that include the tag and matches one of the values are returned. Tags is optional.|
|groupBy|	The resulting data points can be grouped by one or more tags, a time range, or by value, or by a combination of the three. The groupBy attribute in the query is an array of one or more groupers. Each grouper has a name and then additional properties specific to that grouper.|
|excludeTags	|By default, the result of the query includes tags and tag values associated with the data points. If excludeTags is set to true, the tags will be excluded from the response.|
|limit|	Limits the number of data points returned from the data store. The limit is applied before any aggregator is executed.|
|order|	Orders the returned data points. Values for order are asc for ascending or desc for descending. Defaults to ascending. This sorting is done before any aggregators are executed.|

You must specify either `startAbsolute` or `startRelative` but not both. Similarly, you may specify either `endAbsolute` or `endRelative` but not both. If either end time is not specified the current date and time is assumed.

### Understanding Query Elements

#### Tags

It is possible to filter the data returned by specifying a tag. The data returned will only contain data points associated with the specified tag.

As of version 3, only the system designated tags are stored in the time-series database and can be used for filtering. User defined tags cannot be used.

The following table explains the system designated tags and their purpose:

|Tag name|	Values|	Description|
| :-------------: |:-------------:| :-------------:|
|protocol|	rest, mqtt, internal|	The channel used to write this data point.|
|source	|object, or external_client|	Data source type. object means the data source is the object which is writing the data, either device or app. external_client means data source is an api client which is writing data into a device or app. When sending commands to devices, source must be always an external_client.|


### Grouping

The results of the query can be grouped together.There are three ways to group the data; by tags, by a time range, and by value.

#### Grouping by Time

The `time` grouper groups results by time ranges. Possible unit values are “milliseconds”, “seconds”, “minutes”, “hours”, “days”, “weeks”, “months”, and “years”.

For example, you could group data by day of week. Note that the grouper calculates ranges based on the start time of the query. So if you wanted to group by day of week and wanted the first group to be Sunday, then you need to set the query’s start time to be on Sunday.

```
"groupBy": [
      {
        "name": "time",
        "groupCount": "7",
        "rangeSize": {
          "value": "1",
          "unit": "days"
        }
      }
]
```

#### Grouping by Value

The value grouper groups by data point values. Values are placed into groups based on a range size. For example, if the range size is 100, then values between 0-99 are placed in the first group, values between 100-199 into the second group, and so forth.

This example groups value by a range size of 100.

```
"groupBy": [
      {
        "name": "value",
        "rangeSize": 100
      }
]
```

### Grouping by Bin

The bin grouper groups data point values into bins or buckets. Values are placed into groups based on a list of bin values. For example, if the list of bins is 10, 20, 30, then values less than 10 are placed in the first group, values between 10-19 into the second group, and so forth.

This example groups values into groups of 2.

```
"groupBy": [
      {
        "name": "bin",
        "bins": ["2", "4", "6", "8"]
      }
]

```

> ### 🚧 Rule
> `value` and `bin` grouping can be only applied to numeric data points.

### Aggregators

Optionally you can specify aggregators. Aggregators perform an operation on data points and down samples. For example, you could sum all data points that exist in 5 minute periods.

Aggregators can be combined together. For example, you could sum all data points in 5 minute periods then average them for a week period.

Aggregators are processed in the order they are specified in the query object. The output of one is send to the input of the next.

Most aggregators support downsampling. Downsampling allows you to reduce the sampling rate of the data points and aggregate these values over a longer period of time. For example, you could average all daily values over the last week. Rather than getting 7 values you would get one value which is the average for the week. Sampling is specified with a “value” and a “unit”.

#### Supported aggregators
Connio time-series database supports various number of aggregators.

|Aggregator|	Description	|Parameters|
| :-------------: |:-------------:| :-------------:|
|avg|	Computes average value.	|See Range aggregator type|
|dev|	Computes standard deviation.|	See Range aggregator type|
|count|	Counts the number of data points.|	See Range aggregator type|
|first|	Returns the first data point for the interval.|See Range aggregator type|
|gaps|	Marks gaps in data according to sampling rate with a null data point.	|See Range aggregator type|
|last|	Returns the last data point for the interval.|	See Range aggregator type|
|least_squares	|Returns two points for the range which represent the best fit line through the set of points.|	See Range aggregator type|
|max|	Returns the largest value in the interval.|	See Range aggregator type|
|min|	Returns the smallest value in the interval.|	See Range aggregator type|
|percentile|	Finds the percentile of the data range. Calculates a probability distribution and returns the specified percentile for the distribution. The “percentile” value is defined as 0 < percentile <= 1 where .5 is 50% and 1 is 100%.|	percentile (double) - Percentile to count.|
|sum|	Sums all values.|	See Range aggregator type|
|diff|	Computes the difference between successive data points.|	None|
|div|	Returns each data point divided by a divisor. Requires a “divisor” property which is the value that all data points will be divided by.	divisor (double) - |Value to divide data points by.|
|rate|	Returns the rate of change between a pair of data points. Requires a “unit” property which is the sampling duration (ie rate in seconds, milliseconds, minutes, etc...).|	sampling (see Sampling type) - Sets the sampling for calculating the rate. unit (see Unit type) - Shortcut for setting the sampling to a single unit. If you set the unit to SECONDS then the sampling is over one second. time_zone (Long format time zone) -  Time zone for doing time calculations.|
|sampler|	Computes the sampling rate of change for the data points. Requires a “unit” which is the sampling duration (i.e. rate in seconds, milliseconds, minutes, etc...).|	unit(see Unit type) - Sets the sampling unit. If you set the unit to SECONDS then the sampling rate is over one second. time_zone (Long format time zone) - Time zone for doing time calculations.
|scale|	Scales each data point by a factor. Requires a “factor” property which is the scaling value.|	factor (double) - Scale factor.|
|trim	|Trims off the first, last or both data points for the interval. Useful in conjunction with the save_as aggregator to remove partial intervals.	| trim (FIRST, LAST, BOTH) - Trims either first, last or both end data points.|

#### Aggregator Parameters

###### Range aggregator type

|Attribute|	Description|
| :-------------: |:-------------:| 
|name|	Aggregator name. See below.|
|sampling	|It consists of value and unit fields. value is an integer value, and unit represents time range as “milliseconds”, “seconds”, “minutes”, “hours”, “days”, “weeks”, “months”, and “years”.|
|alignSampling|	An optional attribute. Setting this to true will cause the aggregation range to be aligned based on the sampling size. For example if your sample size is either milliseconds, seconds, minutes or hours then the start of the range will always be at the top of the hour. The effect of setting this to true is that your data will take the same shape when graphed as you refresh the data. This is false by default. Note that alignSampling and alignStartTime are mutually exclusive. If both are set, unexpected results will occur.|
|alignStartTime|	An optional attribute. When set to true the time for the aggregated data point for each range will fall on the start of the range instead of being the value for the first data point within that range. This is false by default. Note that alignSampling and alignStartTime are mutually exclusive. If both are set, unexpected results will occur.|
|startTime|	An optional attribute. Used along with alignStartTime. This is the alignment start time. This defaults to 0.|
|timeZone|	Time zone to use when doing time based calculations.|

```
"aggregators": [
{
  "name": "sum",
  "alignSampling": true,
  "alignStartTime": true,
  "sampling": {
    "value": 1,
    "unit": "minutes"
  }
}]
```

##### Unit type

Unit is a time unit represented as a string and must be one of ( MILLISECONDS, SECONDS, MINUTES, HOURS, DAYS, WEEKS, MONTHS, YEARS)

##### Sampling type

A sampling is a json object containing two values a value and a unit. The value is a long and the unit is see unit.

> #### 📘 Sample Size
> Sample size is not the same as the result set size. It represents the number of items processed in order to generate the query result. It can be equal or greater than the result set size.

> #### 👍 Time-Series Databases
> Connio's historical data API is modelled after the open source project KairosDB. Some section of this document is directly adapted from this project. We highly suggest you to take a look at the KairosDB documentation to better understand the principles behind time-series databases.