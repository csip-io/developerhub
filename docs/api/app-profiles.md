---
title: App Profiles
slug: /app-profiles
---

An App Profile instance resource represents a single app profile entity.

### Resource Attributes

|Attribute|	Description|
| :-------------: |:-------------:|
|id	|A 23 to 26 characters long string that uniquely identifies this app profile.|
|accountId|	The unique id of the account that created this app profile.|
|name|	Account wide unique, URL friendly name of the app profile.|
|friendlyName|	Human friendly name of the app profile.|
|baseProfileId|	The id of the base app profile, if any.|
|description|	Optional. A brief about this app profile.|
|tags|	Optional. Tags associated with this app profile.|
|version	|Optional. The version of this app profile.|
|productName|	Optional. The product name, if any.|
|vendorName|	Optional. The vendor of the app profile.|
|imageUrl|	Optional. URL for the device image.|
|system	|The device system this app profile will be working with. [] means all types.|
|locked	|Locked app profile cannot be deleted, modified, new sub resources (e.g. properties) cannot be added, or existing sub resources cannot be removed; but unless they are locked individually, sub resources can be modified.|
|dateCreated|	The date that this app profile was created in ISO 8601 format.|
|dateModified|	The date that this app profile entity was modified in ISO 8601 format.|

```
{
  "id": "_apf_873053802870285130",
  "accountId": "_acc_873046106083527769",
  "name": "Vending_Machine",
  "friendlyName": "Vending Machine Monitoring",
  "description": "My demo vending machine monitoring app",
  "tags": [
    "test"
  ],
  "version": "1.0",
  "vendorName": "Acme co.",
  "productName": "VendingMac Monitor",
  "system": [
    {
      "deviceProfileId": "_dpf_873048732840926433",
      "cardinality": 2
    }
  ],
  "locked": false,
  "dateCreated": "2017-04-19T14:02:03.579Z",
  "dateModified": "2017-04-19T14:02:03.579Z"
}
```

### System Object

```
It defines the device system that this app profile will be working with. It makes this definition in term of device profile types and their unit cardinalities. For example, you can create an app profile to remotely monitor vending machines and define a system with 1 temperature sensor, 1 humidity sensor and 1 voltage meter. All apps generated from this profile are bound to this system.
```

|Attribute|	Description|
| :-------------: |:-------------:|
|deviceProfileId|	Id of the device profile.|
|cardinality|	The maximum number of units of this device profile that can be incorporated into this system. It should be a positive integer number or -1 to denote multiple.|

## Create app profile

### POST https://api.csip.io/v3/appprofiles

#### cURL

```
curl --request POST \
  --url https://api.csip.io/v3/appprofiles \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
```

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/appprofiles';
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

url = URI("https://api.csip.io/v3/appprofiles")

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
  CURLOPT_URL => "https://api.csip.io/v3/appprofiles",
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

url = "https://api.csip.io/v3/appprofiles"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, headers=headers)

print(response.text)
```

## List app profiles

### GET https://api.csip.io/v3/appprofiles

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/appprofiles \
  --header 'Accept: application/json'
```

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/appprofiles';
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

url = URI("https://api.csip.io/v3/appprofiles")

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
  CURLOPT_URL => "https://api.csip.io/v3/appprofiles",
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

url = "https://api.csip.io/v3/appprofiles"

headers = {"Accept": "application/json"}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

## View app profile details

### GET https://api.csip.io/v3/appprofiles/ref

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/appprofiles/ref \
  --header 'Accept: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/appprofiles/ref';
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

url = URI("https://api.csip.io/v3/appprofiles/ref")

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
  CURLOPT_URL => "https://api.csip.io/v3/appprofiles/ref",
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

url = "https://api.csip.io/v3/appprofiles/ref"

headers = {"Accept": "application/json"}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

## Modify app profile

### PUT https://api.csip.io/v3/appprofiles/ref

#### cURL

```
curl --request PUT \
  --url https://api.csip.io/v3/appprofiles/ref \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/appprofiles/ref';
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

url = URI("https://api.csip.io/v3/appprofiles/ref")

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
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/appprofiles/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Accept"] = 'application/json'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

#### Python

```
import requests

url = "https://api.csip.io/v3/appprofiles/ref"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

response = requests.request("PUT", url, headers=headers)

print(response.text)
```

## Delete app profile

### DELETE https://api.csip.io/v3/appprofiles/ref

#### cURL

```
curl --request DELETE \
  --url https://api.csip.io/v3/appprofiles/ref \
  --header 'Accept: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/appprofiles/ref';
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

url = URI("https://api.csip.io/v3/appprofiles/ref")

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
  CURLOPT_URL => "https://api.csip.io/v3/appprofiles/ref",
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

url = "https://api.csip.io/v3/appprofiles/ref"

headers = {"Accept": "application/json"}

response = requests.request("DELETE", url, headers=headers)

print(response.text)
```

> ### 🚧 Rule
> * You cannot delete a base app profile with child. You must delete the child first.
  * You cannot delete a app profile with existing devices generated from it. You must delete the app first.
  