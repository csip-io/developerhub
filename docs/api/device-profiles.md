---
title: Device Profiles
slug: /device-profiles
---

A Device Profile instance resource represents a single device profile entity.

## Resource Attributes

|Attribute|	Description|
| :-------------: |:-------------:|
|id	|A 23 to 26 characters long string that uniquely identifies this device profile.|
|accountId	|The unique id of the account that created this device profile.|
|name|	Account wide unique, URL friendly name of the device profile.|
|friendlyName|	Human friendly name of the device profile.|
|baseProfileId|	The id of the base device profile, if any.|
|description	|Optional. Device profile description.|
|tags|	Optional. Tags associated with this device profile.|
|deviceClass	|Optional. The class of the devices that are generated from this profile.|
|productName|	Optional. The product name, if any.|
|vendorName	|Optional. The vendor of the device.|
|imageUrl|	Optional. URL for the device image.|
|locked	|Locked device profile cannot be deleted, modified, new sub resources (e.g. properties) cannot be added, or existing sub resources cannot be removed; but unless they are locked individually, sub resources can be modified.|
|dateCreated	|The date that this device profile was created in ISO 8601 format.|
|dateModified	|The date that this device profile entity was modified in ISO 8601 format.|

```
{
  "id": "_dpf_587631821175935749",
  "accountId": "_acc_587617399162687551",
  "name": "TestDevice",
  "friendlyName": "Test Device",
  "description": "A new sensor device for testing",
  "deviceClass": "sensor",
  "vendorName": "Acme Co.",
  "productName": "Prod-101",
  "imageUrl": "http://s3.content.na.csip.io/images/minime.jpg",
  "tags": [
    "acustic",
    "test"
  ],
  "locked": false,
  "dateCreated": "2017-03-21T18:39:31.924Z",
  "dateModified": "2017-03-23T20:05:36.095Z"
}
```

## Create device profile

### POST https://api.csip.io/v3/deviceprofiles

#### cURL 

```
curl --request POST \
  --url https://api.csip.io/v3/deviceprofiles \
  --header 'Content-Type: application/json'
```

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/deviceprofiles';
const options = {method: 'POST', headers: {'Content-Type': 'application/json'}};

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

url = URI("https://api.csip.io/v3/deviceprofiles")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'POST', headers: {'Content-Type': 'application/json'}};

fetch('https://api.csip.io/v3/deviceprofiles', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python 

```
import requests

url = "https://api.csip.io/v3/deviceprofiles"

headers = {"Content-Type": "application/json"}

response = requests.request("POST", url, headers=headers)

print(response.text)
```

## List device profiles

### GET https://api.csip.io/v3/deviceprofiles

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/deviceprofiles
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/deviceprofiles';
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

url = URI("https://api.csip.io/v3/deviceprofiles")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/deviceprofiles', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python 

```
import requests

url = "https://api.csip.io/v3/deviceprofiles"

response = requests.request("GET", url)

print(response.text)
```

## View device profile details

### GET https://api.csip.io/v3/deviceprofiles/ref

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/deviceprofiles/ref
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/deviceprofiles/ref';
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

url = URI("https://api.csip.io/v3/deviceprofiles/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/deviceprofiles/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python 

```
import requests

url = "https://api.csip.io/v3/deviceprofiles/ref"

response = requests.request("GET", url)

print(response.text)
```

## Modify device profile

### PUT https://api.csip.io/v3/deviceprofiles/ref

#### cURL

```
curl --request PUT \
  --url https://api.csip.io/v3/deviceprofiles/ref \
  --header 'Content-Type: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/deviceprofiles/ref';
const options = {method: 'PUT', headers: {'Content-Type': 'application/json'}};

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

url = URI("https://api.csip.io/v3/deviceprofiles/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'PUT', headers: {'Content-Type': 'application/json'}};

fetch('https://api.csip.io/v3/deviceprofiles/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/deviceprofiles/ref"

headers = {"Content-Type": "application/json"}

response = requests.request("PUT", url, headers=headers)

print(response.text)
```

## Delete device profile

### DELETE https://api.csip.io/v3/deviceprofiles/ref

#### cURL

```
curl --request DELETE \
  --url https://api.csip.io/v3/deviceprofiles/ref
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/deviceprofiles/ref';
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

url = URI("https://api.csip.io/v3/deviceprofiles/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/deviceprofiles/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript 

```
const options = {method: 'DELETE'};

fetch('https://api.csip.io/v3/deviceprofiles/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python 

```
import requests

url = "https://api.csip.io/v3/deviceprofiles/ref"

response = requests.request("DELETE", url)

print(response.text)
```

> ### 🚧 Rule
> You cannot delete a base device profile with child. You must delete the child first.
You cannot delete a device profile with existing devices generated from it. You must delete the device first.