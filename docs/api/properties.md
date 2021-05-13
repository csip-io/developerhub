---
title: Properties
slug: /properties
---

A Property instance resource represents a single property entity. Since properties always belong to some owner entity (i.e. app profile or device profile), they are usually accessed through their parent's path (you can access a property resource directly by id for some operations; see operations section).

> ### 📘 Admin vs Data API
> Properties resource represents different meanings when used from Admin and Data services APIs.
> When used from Admin Services API, it represents the definition or metadata of a property. The user can create new properties, modify and delete existing ones through this service.
> When used from Data Services API, it represents the data value stored within a property. The user can read and write data from/into properties through this service.
> Please note that when we say property we refer to the property definition created within a profile entity which is uniquely identified by an id. On the other had, when we say device or app property, we refer to the instance of this property created under an object which is uniquely identified by both its parent object's id and its definition's id.

## Resource Attributes

|Attribute|	Description|
| :-------------: |:-------------:|
|id	|A 23 to 26 characters long string that uniquely identifies this property.|
|accountId	|The unique id of the account that created this property.|
|name|	A name that uniquely identifies the property among its siblings. Unlike other resources, property name cannot be used as slug since the name is only context sensitive.|
|friendlyName|	Human friendly name of the property.|
|ownerId|	The entity owning the property definition. Owner entity can be device profile, or app profile.|
|type|	Defines the data type this property can store. Can be number, waypoint, boolean, string, enum, object, file or blob. See supported data types table for details.|
|access	|Can be one of the following private, protected and public. See the access types section below for details.|
|publish|Can be always, changed or never. When always, this property value is published back to the device if set/written using an external API key (i.e not device key). When changed, it is published only when the value is changed. You can create server-side and device-side properties using this attribute. All properties with publish value set to never are considered server-side attribute.|
|inherited	|true or false. Device and app profiles can be based on other profiles (of their type) when created. The properties of the base profile show up as inherited under the child profile.|
|qualifiedName|	A name that uniquely identifies this property within its owner account context. Qualified name is used in object property queries to eliminate name ambiguity.|
|measurement|	Optional. Measurement is a convenience for numeric properties (number type). When set, it enriches the visualization and conversion capabilities of the property.|
|locked|	if locked, entity cannot be modified, deleted.|
|dateCreated|	The date that this property was created in ISO 8601 format.|
|dateModified|	The date that this property was modified in ISO 8601 format.|


## Access Types Explained

It is very important to understand the role of Api Keys when interacting with properties. Api keys convey the identity of the requesters. When a requester interacts with a device property using the device key, the requester is given full privilege - requester is considered the device itself. Otherwise it is considered an external client and has to abide by the access rules. Same rule applies to app properties as well.

### Private Property

This type property can be only be only read and written by device key. This access level should be used to store device confidential data on the platform securely. It cannot be set to `publish = true`. All device methods can access private properties and use them.

### Protected Property (read-only)

All api client and user keys with `device:read-data` scope are allowed to read this property. It can only be written using device key. Can be set to `publish=true.`

### Public Property (read-write)

All api client and user keys with `device:read-data` scope can read this property and all client and user keys with `device:write-data` scope can write into this property. When written by external entities (i.e. other than the device itself) the value automatically sent to the physical device if connected to Connio MQTT broker. Can be set to `publish=true`.

> ### ❗️ Important
> MQTT broker does not cache the commands sent to devices if the device is not online at the time of transmission. If your data is mission critical, we suggest to establish a custom feedback mechanism to make sure that your data arrived to its destination. A custom feedback mechanism can be easily built using additional properties and some edge device logic.

## Supported Data Types

|Type	|Purpose|	Max Size|
| :-------------: |:-------------:|
|Number|	It stores numeric values including integers and doubles.|	N/A|
|Waypoint	|It is a special case of data point where the data value is a geo-coordinate. This type is used to store trips. Designed to be used for asset tracking applications.|	zone field is limited with String data type limit.|
|Boolean|	It stores boolean values, i.e. true, false.|	N/A|
|String	|It stores textual data.|	Maximum 1 KiB.|
|Enum	|It stores numeric or textual predefined values such as states (e.g. "Started", "Stopped").	|It can contain maximum 100 items, each textual item can be max 64 char long.|
|(Json) Object|	It stores composite data in JSON format. It can hold any user defined valid JSON structure. Mostly used for storing configuration values or complex data objects where simple data types are not enough.|	Maximum 300 KiB.|
|File	|It stores files in any format.	File size can be maximum 256 MiB.|
|Blob|	It stores binary data in base64 format.	Maximum 1 MiB.|

```
{
  "id": "_prp_875223872477401419",
  "accountId": "_acc_873046106083527769",
  "ownerId": "_dpf_873048732840926433",
  "name": "Temperature",
  "friendlyName": "Temperature",
  "tags": [
    "test"
  ],
  "type": "number",
  "access": "protected",
  "publish": "always",
  "measurement": {
    "type": "temperature",
    "unit": {
      "label": "Temperature",
      "symbol": "ºC"
    }
  },
  "retention": {    
    "type": "historical",
    "lifetime": "3months",
    "capacity": 100000,
    "condition": {
      "when": "always"
    }
  },
  "boundaries": {   
      "min": -25.5,
      "max": 65.5
  },
  "locked": false,
  "dateCreated": "2017-04-22T13:53:36.035Z",
  "dateModified": "2017-04-22T13:53:36.035Z"
}
```

## Measurement

This attribute is used if and only if the property type is `number`. Its `type` attribute can be one of the following values:

his attribute is used if and only if the property type is number. Its type attribute can be one of the following values:

|Type|	Unit|
| :-------------: |:-------------:|
|custom|	unit object attribute can be freely set by the user.|
|time	|tbd|
|acceleration|	tbd|
|currency|	tbd|
|electricity|	tbd|
|fitnessEnergy|	tbd|
|weight	|tbd|
|lengthDistance|	tbd|
|relativeHumidity|	tbd|
|light|	tbd|
|pressure|	tbd|
|speed|	tbd|
|soundsLevel|	tbd|
|temperature|	tbd|
|percentage|	tbd|

## Boundaries

As its name suggests, `boundaries` defines the limits of values each property should expect. It is mainly used for data validation and/or data visualization. Boundaries are optional. A property might have zero or one boundaries.

For example, you can use boundaries to set the limits of a temperature sensor reading. Readings that are not within the given boundary values will be discarded by the system automatically. This will prevent the property data set from being corrupted by unexpected values when device malfunctions.

|Attribute|	Description|
| :-------------: |:-------------:|
|Limit type|	Can be range, size, set, and geofence. Different limit types are used for different property types. See below for a full list.|

### Limit types per property types:

| Property Type| 	Limit Type| 	Possible values|	Example| 
| :-------------: |:-------------:|:-------------:| :-------------:|
| number| 	range	| any numeric value in min and max attributes	|"min": 12.0, "max": 18981.238|
|string|	size|	any positive integer value in bytes	|"size": 250000|
|object	|size|	any positive integer value in bytes	|"size": 250000|
|enum|	set|	list of accepted string or numeric values	|"enum": { "set": ["start", "stop", "pause"] } or "enum": { "set": [1, 2, 3] }|
|waypoint|	geofence|	lat, lon, radius (in Km), inside (true or false)|	{ "lat":34.7587, "lon": 49.9999, "radius": 50, "inside": true }|
|blob|	size|	any positive integer value, in bytes|	"size": 20000000|
|file|	size|	any positive integer value, in bytes|"size": 20000000|

If no boundaries is set, default property boundaries takes effect. See Supported Data Types above.

## Retention Policy

Retention policy governs the rules around the retention of property values. It defines when and how long incoming data should be persisted. Unlike boundaries, each property must have at least one retention i.e. default retention policy. Default retention policy cannot be deleted.

It consists of the following attributes

|Attribute|	Description|
| :-------------: |:-------------:|
|type|	historical- store data in the system time-series database, mostrecent - store only the most recent value. A retention policy can be set along with historical types.|
|lifetime|	Used when type is historical. Must match with the following pattern: unlimited or n+ days or n+months or n+years where n is a positive integer - e.g. 3months. All data points older than this value will be deleted automatically to save space.|
|capacity|	Used when type is historical. It specifies the maximum number of data points this property can store. Can be 0 for unlimited or any positive integer. Default value is 100000.|
|condition|	Used when type is historical to indicate when the value will be stored. It consists of when and value attributes. when can be always, changed or changedx for numeric values only. If when is set to changedx, value is set to a percentage value between 1 to 100.|

### Default retention policy at Property creation:

```
{
  "type": "historical",
  "lifetime": "3months",
  "capacity": 100000,
  "condition": {
    "when": "always"
  }
}
```

```
{
"retention": {
    "type": "historical",
    "lifetime": "12months",
    "capacity": 3000000,
    "condition": {
      "when": "changedx",
      "value": 41
    }
}
```

## Create property

#### cURL
```
curl --request POST \
  --url https://api.csip.io/v3/properties \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/properties';
const options = {
  method: 'POST',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
};

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

url = URI("https://api.csip.io/v3/properties")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Accept"] = 'application/json'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

#### PHP 

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.csip.io/v3/properties",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_HTTPHEADER => [
    "Accept: application/json",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

#### Python 

```
import requests

url = "https://api.csip.io/v3/properties"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, headers=headers)

print(response.text)
```

> ### Tip
> Alternatively you can create properties as follows:
> `POST .../deviceprofiles/{ref}/properties`
> `POST .../appprofiles/{ref}/properties`

## List properties

### GET https://api.csip.io/v3/properties

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/properties \
  --header 'Accept: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/properties';
const options = {method: 'GET', headers: {Accept: 'application/json'}};

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

url = URI("https://api.csip.io/v3/properties")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Accept"] = 'application/json'

response = http.request(request)
puts response.read_body
```

#### PHP

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.csip.io/v3/properties",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => [
    "Accept: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

#### Python

```
import requests

url = "https://api.csip.io/v3/properties"

headers = {"Accept": "application/json"}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

## View Property Details

### GET https://api.csip.io/v3/properties/id

#### cURL 

```
curl --request GET \
  --url https://api.csip.io/v3/properties/id \
  --header 'Accept: application/json'
```

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/properties/id';
const options = {method: 'GET', headers: {Accept: 'application/json'}};

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

url = URI("https://api.csip.io/v3/properties/id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Accept"] = 'application/json'

response = http.request(request)
puts response.read_body
```

#### PHP

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.csip.io/v3/properties/id",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => [
    "Accept: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

#### Python

```
import requests

url = "https://api.csip.io/v3/properties/id"

headers = {"Accept": "application/json"}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

## Modify property

### PUT https://api.csip.io/v3/properties/id

#### cURL
```
curl --request PUT \
  --url https://api.csip.io/v3/properties/id \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/properties/id';
const options = {
  method: 'PUT',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
};

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

url = URI("https://api.csip.io/v3/properties/id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Accept"] = 'application/json'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

#### PHP 

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.csip.io/v3/properties/id",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "PUT",
  CURLOPT_HTTPHEADER => [
    "Accept: application/json",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

#### Python 

```
import requests

url = "https://api.csip.io/v3/properties/id"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

response = requests.request("PUT", url, headers=headers)

print(response.text)
```

## Delete property

### DELETE https://api.csip.io/v3/properties/id

#### cURL

```
curl --request DELETE \
  --url https://api.csip.io/v3/properties/id \
  --header 'Accept: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/properties/id';
const options = {method: 'DELETE', headers: {Accept: 'application/json'}};

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

url = URI("https://api.csip.io/v3/properties/id")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Accept"] = 'application/json'

response = http.request(request)
puts response.read_body
```

#### PHP

```
<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.csip.io/v3/properties/id",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "DELETE",
  CURLOPT_HTTPHEADER => [
    "Accept: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

#### Python

```
import requests

url = "https://api.csip.io/v3/properties/id"

headers = {"Accept": "application/json"}

response = requests.request("DELETE", url, headers=headers)

print(response.text)
```

