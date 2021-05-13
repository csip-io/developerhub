---
title: Methods
slug: /methods
---


A Method instance sub resource represents a method entity. Since methods always belong to some owner entity (i.e. app profile or device profile), they are usually accessed through their parent's path (you can access a property resource directly by id for some operations; see methods section).

> ### 📘 Admin vs Data API
> Methods resource represents different meanings when used from Admin and Data services APIs.
> When used from Admin Services API, it represents the definition or metadata of a method. The user can create new methods, modify and delete existing ones through this service.
> When used from Data Services API, it provides information about the execution performance of the device or app method - see Device State object.
> Please note that when we say method we refer to the method definition created within a profile entity which is uniquely identified by an id. On the other had, when we say device or app method, we refer to the instance of this method created under an object which is uniquely identified by both its parent object's id and its definition's id.


## Resource Attributes

| Attribute	| Description| 
| :-------------: |:-------------:|
| id| 	A 23 to 26 characters long string that uniquely identifies this property.| 
| accountId| 	The unique id of the account that created this method.| 
| name| 	A name that uniquely identifies the method among its siblings. Unlike other resources, method name cannot be used as slug since the name is only context sensitive.| 
| friendlyName| 	Human friendly name of the method.| 
| ownerId| 	The entity owning the method definition. Owner entity can be device profile, or app profile.| 
| access| 	Can be either private, protected, or public. See the access types section below for details.| 
| methodImpl| 	Method implementation object. See below.|
| inherited	| true or false. Device and app profiles can be based on other profiles (of their type) when created. The methods of the base entity show up as inherited under the new entity.| 
| qualifiedName	| A name that uniquely identifies this method within its owner account context. Qualified name is used in object method queries to eliminate name ambiguity.| 
| locked| 	if locked, entity cannot be modified, deleted.| 
| dateCreated	| The date that this method was created in ISO 8601 format.| 
| dateModified| 	The date that this method was modified in ISO 8601 format.| 

```
{
    "id": "_mtd_933649803812708268",
    "accountId": "_acc_924329848168362343",
    "ownerId": "_dev_924329922537879076",
    "name": "getOperationStatus",
    "friendlyName": "getOperationStatus",
    "inherited": false,
    "qualifiedName": "temp.sensor.1$getoperationstatus",
    "access": "public",
    "methodImpl": {       
      "funcBody": "done(null, value == 1 ? \"running\" : \"stopped\");",
      "script": "javascript"
    },
    "locked": false,
    "dateCreated": "2017-07-12T04:35:29.801Z",
    "dateModified": "2017-07-12T04:35:29.801Z"
}
```

### methodImpl object

Defines the implementation of the method. Currently only JavaScript implementations are accepted. Each method has at least one implementation.

|Attribute|	Description|
| :-------------: |:-------------:|
|funcBody	|Methods are standard JavaScript functions with the following signature: This attribute holds the function body segment. Function body is the place where the developer implements its device logic. Function signature on the other hand cannot be modified.|
|script|	Script language type. csipio only supports JavaScript language (ECMAScript ECMA-262) at the moment; this attribute must be set to javascript.|

## Access Types Explained

Methods can be called from other methods, public methods can be called from external clients.

### Private Method

A `private` method can be accessed from the methods of the same object. Child object cannot call its parent's private methods. It cannot be overriden by child object, nor be called by external clients.

### Protected Method

A `protected` method can be accessed from the methods of the same object. Child object can call its parent's protected methods. It can be overriden by child object, but it cannot be called by external clients

### Public Method

A `public` method can be accessed from the methods of the same object and its child. It can be overriden by child object. It can be executed by any external client with `device:execute` scope.

Public methods can be called remotely to send commands to devices, or get aggregate data about the devices (e.g. dashboard).

> ### 📘 Max Method Execution Time
> Default method execution time is set to 5 seconds for standard accounts. If a method takes longer than the allowed time, or throws an exception, the method instance is automatically quarantined / disabled for its owning device or app. In such case you need to explicitly enable it to continue working. All method errors are listed under device/app log. Note that you can get more visibility about your method's sanity in the device/app log by turning your device/app status to debug while testing.

## Create method

### POST https://api.csip.io/v3/methods

#### cURL

```
curl --request POST \
  --url https://api.csip.io/v3/methods \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
``` 

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/methods';
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

url = URI("https://api.csip.io/v3/methods")

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
  CURLOPT_URL => "https://api.csip.io/v3/methods",
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

url = "https://api.csip.io/v3/methods"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, headers=headers)

print(response.text)
```

## List methods

### GET https://api.csip.io/v3/methods

#### cURL
``` 
curl --request GET \
  --url https://api.csip.io/v3/methods \
  --header 'Accept: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/methods';
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

url = URI("https://api.csip.io/v3/methods")

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
  CURLOPT_URL => "https://api.csip.io/v3/methods",
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

url = "https://api.csip.io/v3/methods"

headers = {"Accept": "application/json"}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

## View method details

### GET https://api.csip.io/v3/methods/id

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/methods/id \
  --header 'Accept: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/methods/id';
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

url = URI("https://api.csip.io/v3/methods/id")

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
  CURLOPT_URL => "https://api.csip.io/v3/methods/id",
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

url = "https://api.csip.io/v3/methods/id"

headers = {"Accept": "application/json"}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

## Modify method

### PUT https://api.csip.io/v3/methods/id

#### cURL

```
curl --request PUT \
  --url https://api.csip.io/v3/methods/id \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
```

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/methods/id';
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

url = URI("https://api.csip.io/v3/methods/id")

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
  CURLOPT_URL => "https://api.csip.io/v3/methods/id",
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

url = "https://api.csip.io/v3/methods/id"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

response = requests.request("PUT", url, headers=headers)

print(response.text)
```

## Delete method

### DELETE https://api.csip.io/v3/methods/id

#### cURL

```
curl --request DELETE \
  --url https://api.csip.io/v3/methods/id \
  --header 'Accept: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/methods/id';
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

url = URI("https://api.csip.io/v3/methods/id")

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
  CURLOPT_URL => "https://api.csip.io/v3/methods/id",
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

url = "https://api.csip.io/v3/methods/id"

headers = {"Accept": "application/json"}

response = requests.request("DELETE", url, headers=headers)

print(response.text)
```

## Enable/Disable device method

### PUT https://api.csip.io/v3/devices/device_ref/methods/method_ref

Example Payload:

```
{
    "disabled": false
}
```