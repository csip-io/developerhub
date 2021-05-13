---
title: Devices
slug: /devices
---

A Device instance resource represents a single device entity.

## Resource Attributes

|Attribute|	Description|
| :-------------: |:-------------:|
|id	|A 23 to 26 characters long string that uniquely identifies this device.|
|accountId|	The unique id of the account that created this device.|
|name|	Account wide unique, URL friendly name of the device.|
|friendlyName|	Human friendly name of the device.|
|profileId|	Id of the device profile that this device is generated from.|
|apps|	Id list of the apps that this device plugged into. Can be empty.|
|description|	Optional. Device description, maintenance notes, etc.|
|tags|	Optional. Device tags.|
|status|	Can be enabled, disabled and debug. All incoming and outgoing data are rejected for disabled devices. Disabled devices cannot connect to csipio via MQTT. Default value is enabled.|
|period|	Number of seconds that is the expected reporting period of the device. This attribute helps csipio to determine whether a device is active and communicating as expected. 0 can be set to disable this feature. Default is 0. See predefined device profiles tutorial for advanced usage of this attribute.|
|customIds|	Optional. Map of user defined identifiers. Supported custom id types are sn, mac, imei, and esn.|
|timezone	|Optional. The time zone of this device to be used when visualizing device data.
|annotateWithLoc	|if true, each incoming data point is annotated with device location info. Default value is false.|
|annotateWithMeta|	if true, each incoming data point is annotated with device meta data such as device profile tags, device tags, device class, product name, custom ids etc. Default value is false.|
|location|	Optional. Location of the device.|
|locked	|if locked, entity cannot be modified, deleted.|
|dateCreated	|The date that this device was created, in ISO 8601 format.|
|dateModified	|The date that this device entity was modified in ISO 8601 format.|

> ### 🚧 Rule
> Note that all custom ids are case sensitive. They must be account wide unique; otherwise device won't be located. Max length of a custom id value can be 64 ASCII character long.

> ### 📘 Tip
> `debug` status is a feature designed to provide more visibility into device backend's behaviour. When in `debug` mode, device backends log unexpected events such as data point rejections, out of bounds conditions, etc.

As its name suggests it should not be used in production due to performance implications. When set, the following internal errors and events are written into the device log:

* Data rejections caused by property type and boundaries
* Invalid / malformed data feeds
* Every web hook calls done by alert notification mechanism
* Provisioning attempts
* Errors related to methods

> ### 📘 Tip
> When `annotateWithLoc` attribute is true, all data points written by the device is automatically enriched by the device location at the server. This feature eliminates the need to set location information in each data point sent over wire and helps users to better control the size of the payload.

```
{
  "id": "_dev_867347085435988080",
  "accountId": "_acc_865397927566828278",
  "name": "factory3.floor4.forklift4",
  "friendlyName": "Fork lift 001-0023904",
  "profileId": "_dpf_865412173101628139",
  "apps": ["_app_865398009039773695"],
  "description": "Maintenance cycle: every 1,000 km",
  "tags": [
    "forklift",
    "ford"
  ],
  "status": "enabled",
  "period": 60,
  "customIds": {
    "sn": "SN-001-0023904"
  },
  "timezone": "Vancouver UTC-08:00",
  "annotateWithLoc": false,
  "annotateWithMeta": false,
  "location": {
    "zone": "vancouver-facility",
    "geo": {
      "lat": 41.0296287,
      "lon": 28.6232202,
      "alt": 0
    }
  },
  "locked": false,
  "dateCreated": "2017-03-23T08:12:16.597Z",
  "dateModified": "2016-03-23T08:12:16.597Z"
}
```

## Create device

### POST https://api.csip.io/v3/devices

```
{
  "name": "factory3.floor4.forklift11",
  "friendlyName": "Forklift #11",
  "profile": "Forklift",
  "status": "enabled",
  "customIds": {
        "mac": "3c:15:d2:ec:ab:30"       
    },
  "period": 0,    
  "description": "Maintenance cycle: every 1,000 miles",
  "tags": ["forklift", "test"],
  "location": {"zone": "factory3.floor4", "geo": { "lat": 49.58695, "lon": -123.59685} },
  "timezone": "Vancouver UTC-08:00",
  "annotateWithLoc": true,
  "annotateWithMeta": true
}
```

> ### 📘 Creating multiple devices
> Simply make your request within an array element:
>``` [ 
  {
  "name": "factory3.floor4.forklift5",
  "friendlyName": "Forklift #5",
  "profile": "Forklift",
  "status": "enabled",
  "customIds": {
        "mac": "3c:15:d2:ec:ab:30"       
    },
  "period": 0,    
  "description": "Maintenance cycle: every 1,000 miles",
  "tags": ["forklift", "test"],
  "location": {"zone": "plant3.floor4", "geo": { "lat": 49.58695, "lon": -123.59685} },
  "timezone": "Vancouver UTC-08:00",
  "annotateWithLoc": true,
  "annotateWithMeta": true
  },
 {
  "name": "factory3.floor4.forklift6",
  "friendlyName": "Forklift #6",
  "profile": "Forklift",
  "status": "enabled",
  "customIds": {
        "mac": "dd:15:00:ec:aa:30"       
    },
  "period": 0,    
  "description": "Maintenance cycle: every 1,000 miles",
  "tags": ["forklift", "test"],
  "location": {"zone": "plant3.floor4", "geo": { "lat": 49.58695, "lon": -123.59685} },
  "timezone": "Vancouver UTC-08:00",
  "annotateWithLoc": true,
  "annotateWithMeta": true
  }
]```

## List devices

### GET https://api.csip.io/v3/devices

#### cURL
```
curl --request GET \
  --url https://api.csip.io/v3/devices
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/devices';
const options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### Ruby

```
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/devices")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/devices', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/devices"

response = requests.request("GET", url)

print(response.text)
```

> ### 📘 Filtering by CUSTOM ID and DEVICE NAME
> "Custom id" and "Name" filter always return single or no result. When mixed with other filters, other filters will be automatically ignored. Custom id value is always case sensitive; Name value is case insensitive.

All filters except "Custom id" and "Name" can be mixed. Mixed queries are applied to the device set in the order shown above starting from "Device Profile" filter.

> ### Filtering by TAG
> ou can use logical operator for tag filtering. If you add "-" operator in front of a tag, it implies a NEGATE; if you add "^" operator to the end of a tag, it implies an OR.
> For example, if you like to see all the devices tagged as "house", and tagged as either "kitchen", "bathroom", or "bedroom" but not tagged as "mansion" you should set a tag filter as:
> `?tags=house, kitchen^, bathroom^, bedroom^, -mansion`

> ### 📘 Filtering by PROPERTY VALUES
> You can use both property name or qualified name within property value filters.
> For example:
`?prop=connecteddevice$connectionstatus,eq,online` and `?prop=connectionstatus,eq,online` considered same.
> Property value comparison operator could be one of the following `eq, neq, lt, lte, gte, gt, and match` (for case insensitive text comparison).
> Note that private properties, Waypoint, Object, Blob and File type properties cannot be used in property value filters.

> ### 🚧 Filtering by ConnectionStatus Property
> When a device with ConnectionStatus property is created, this property is set to undefined until it connects to the system via MQTT. If you query the device before the first connection you are not going to get any result from both `?prop=connectionstatus,eq,online` and
`?prop=connectionstatus,eq,offline` queries.

## View device details

### GET https://api.csip.io/v3/devices/ref

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/devices/ref
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/devices/ref';
const options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```


#### Ruby

```
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/devices/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/devices/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/devices/ref"

response = requests.request("GET", url)

print(response.text)
```

#### View device logs

### GET https://api.csip.io/v3/devices/ref/logs

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/devices/ref/logs
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/devices/ref/logs';
const options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### Ruby

```
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/devices/ref/logs")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/devices/ref/logs', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/devices/ref/logs"

response = requests.request("GET", url)

print(response.text)
```

## Modify Device Data

### PUT https://api.csip.io/v3/devices/ref

#### cURL

```
curl --request PUT \
  --url https://api.csip.io/v3/devices/ref \
  --header 'Content-Type: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/devices/ref';
const options = {method: 'PUT', headers: {'Content-Type': 'application/json'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### Ruby

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/devices/ref';
const options = {method: 'PUT', headers: {'Content-Type': 'application/json'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### JavaScript

```
const options = {method: 'PUT', headers: {'Content-Type': 'application/json'}};

fetch('https://api.csip.io/v3/devices/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/devices/ref"

headers = {"Content-Type": "application/json"}

response = requests.request("PUT", url, headers=headers)

print(response.text)
```

## Delete device

### DELETE https://api.csip.io/v3/devices/ref

#### cURL 

```
curl --request DELETE \
  --url https://api.csip.io/v3/devices/ref
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/devices/ref';
const options = {method: 'DELETE'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### Ruby

```
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/devices/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'DELETE'};

fetch('https://api.csip.io/v3/devices/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/devices/ref"

response = requests.request("DELETE", url)

print(response.text)
```

## Regenerate device key

### POST https://api.csip.io/v3/devices/id/apikey 

#### cURL

```
curl --request POST \
  --url https://api.csip.io/v3/devices/id/apikey
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/devices/id/apikey';
const options = {method: 'POST'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### Ruby

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/devices/id/apikey';
const options = {method: 'POST'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### JavaScript

```
const options = {method: 'POST'};

fetch('https://api.csip.io/v3/devices/id/apikey', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python 

```
import requests

url = "https://api.csip.io/v3/devices/id/apikey"

response = requests.request("POST", url)

print(response.text)
```

## View device key

### GET https://api.csip.io/v3/devices/id/apikey

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/devices/id/apikey
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/devices/id/apikey';
const options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### Ruby

```
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/devices/id/apikey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/devices/id/apikey', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/devices/id/apikey"

response = requests.request("GET", url)

print(response.text)
```

