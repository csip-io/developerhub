---
title: Apps
slug: /apps
---

An App instance resource represents a single app entity.

## Resource Attributes

| Attribute	| Description| 
| :-------------: |:-------------:|
| id| 	A 23 to 26 characters long string that uniquely identifies this app.| 
| accountId| 	The unique id of the account that created this app.| 
| name| 	Account wide unique, URL friendly name of the app.| 
| friendlyName| 	Human friendly name of the app.| 
| profileId| 	Id of the app profile that this app is generated from.| 
| description| 	Optional. A brief about this app.| 
| tags| 	Optional. Tags associated with this app.| 
| dataStore	| Optional. App specific, customer managed external data store information to stream app data.| 
| locked| 	if locked, entity cannot be modified, deleted.| 
| dateCreated	| The date that this api client was created in ISO 8601 format.| 
| dateModified	| The date that this api client was modified in ISO 8601 format.| 

```
{
  "id": "_app_530976712669455460",
  "accountId": "_acc_530308970920181397",
  "name": "atm-monitor",
  "friendlyName": "ATM Monitoring App",
  "profileId": "_apf_923380075976645455",
  "description": "Remotely monitor connected ATMs.",
  "tags": [
    "test"
  ],
  "locked": false,
  "dateCreated": "2017-04-29T12:54:40.010Z",
  "dateModified": "2017-04-29T12:54:40.010Z"
}
```

### Create app

#### POST https://api.csip.io/v3/apps

#### cURL

```
curl --request POST \
  --url https://api.csip.io/v3/apps \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
```         

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apps';
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

url = URI("https://api.csip.io/v3/apps")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Accept"] = 'application/json'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

#### Ruby

```
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.csip.io/v3/apps")

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
  CURLOPT_URL => "https://api.csip.io/v3/apps",
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

url = "https://api.csip.io/v3/apps"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, headers=headers)

print(response.text)
```

## List apps

### GET https://api.csip.io/v3/apps

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/apps \
  --header 'Accept: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apps';
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

url = URI("https://api.csip.io/v3/apps")

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
  CURLOPT_URL => "https://api.csip.io/v3/apps",
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

url = "https://api.csip.io/v3/apps"

headers = {"Accept": "application/json"}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

> ### 📘 Tip
> You can use logical operator for tag filtering. If you add "-" operator in front of a tag, it implies a NEGATE; if you add "^" operator to the end of a tag, it implies an OR.
> For example, if you like to see all the devices tagged as "house", and tagged as either "kitchen", "bathroom", or "bedroom" but not tagged as "mansion" you should set a tag filter as:
`?tags=house, kitchen^, bathroom^, bedroom^, -mansion`

## View app details

### GET https://api.csip.io/v3/apps/ref

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/apps/ref \
  --header 'Accept: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apps/ref';
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

url = URI("https://api.csip.io/v3/apps/ref")

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
  CURLOPT_URL => "https://api.csip.io/v3/apps/ref",
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

url = "https://api.csip.io/v3/apps/ref"

headers = {"Accept": "application/json"}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

## Modify app

### PUT https://api.csip.io/v3/apps/ref

#### cURL

```
curl --request PUT \
  --url https://api.csip.io/v3/apps/ref \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
```

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apps/ref';
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

url = URI("https://api.csip.io/v3/apps/ref")

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
  CURLOPT_URL => "https://api.csip.io/v3/apps/ref",
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

url = "https://api.csip.io/v3/apps/ref"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

response = requests.request("PUT", url, headers=headers)

print(response.text)
```

> ### 📘 Tip
> You can unset an optional field by setting to `null`.

> ## 🚧 Rule
> Normally locked apps (e.g. Default app) cannot be modified. As a convenience, Csipio v3 API allow users to modify only the `datastore` field of Default app.

## Delete app

### DELETE https://api.csip.io/v3/apps/ref

#### cURL 

```
curl --request DELETE \
  --url https://api.csip.io/v3/apps/ref \
  --header 'Accept: application/json'
```

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apps/ref';
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

url = URI("https://api.csip.io/v3/apps/ref")

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
  CURLOPT_URL => "https://api.csip.io/v3/apps/ref",
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

url = "https://api.csip.io/v3/apps/ref"

headers = {"Accept": "application/json"}

response = requests.request("DELETE", url, headers=headers)

print(response.text
```

> ### Rule 
> Default app cannot be deleted.