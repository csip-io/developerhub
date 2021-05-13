---
title: Api Clients
slug: /api-clients
---

An Api Client instance resource represents a single api client entity.

## Resource Attributes

|Attribute|	Description|
| :-------------: |:-------------:|
|id	|A 23 to 26 characters long string that uniquely identifies this api client.|
|accountId|	The unique id of the account that created this api client.|
|name|	Account wide unique, URL friendly name of the api client.|
|friendlyName|	Human friendly name of the api client.|
|description|	Optional. Api client description.|
|tags|	Optional. Tags associated with this api client.|
|locked|	if locked, entity cannot be modified, deleted.|
|dateCreated	|The date that this api client was created in ISO 8601 format.|
|dateModified	|The date that this api client was modified in ISO 8601 format.|

```
{
  "id": "_api_530976712669455460",
  "accountId": "_acc_530308970920181397",
  "name": "atm_data_reader",
  "friendlyName": "ATM Monitor Reader",
  "description": "This api client reads data from devices plugged into the atm-monitoring app.",
  "tags": [
    "test"
  ],
  "locked": false,
  "dateCreated": "2017-04-29T12:54:40.010Z",
  "dateModified": "2017-04-29T12:54:40.010Z"
}
```

## Create api client

### POST https://api.csip.io/v3/apiclients

#### cURL

```
curl --request POST \
  --url https://api.csip.io/v3/apiclients \
  --header 'Content-Type: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apiclients';
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

url = URI("https://api.csip.io/v3/apiclients")

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

fetch('https://api.csip.io/v3/apiclients', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/apiclients"

headers = {"Content-Type": "application/json"}

response = requests.request("POST", url, headers=headers)

print(response.text)
```

## List api clients

### GET https://api.csip.io/v3/apiclients

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/apiclients
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apiclients';
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

url = URI("https://api.csip.io/v3/apiclients")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/apiclients', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/apiclients"

response = requests.request("GET", url)

print(response.text)
```

## View api client details

### GET https://api.csip.io/v3/apiclients/ref

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/apiclients/ref
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apiclients/ref';
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

url = URI("https://api.csip.io/v3/apiclients/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/apiclients/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/apiclients/ref"

response = requests.request("GET", url)

print(response.text)
```

## Modify api client

### PUT https://api.csip.io/v3/apiclients/ref

#### cURL

```
curl --request PUT \
  --url https://api.csip.io/v3/apiclients/ref \
  --header 'Content-Type: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apiclients/ref';
const options = {method: 'PUT', headers: {'Content-Type': 'application/json'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```

#### JavaScript

```
const options = {method: 'PUT', headers: {'Content-Type': 'application/json'}};

fetch('https://api.csip.io/v3/apiclients/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/apiclients/ref"

headers = {"Content-Type": "application/json"}

response = requests.request("PUT", url, headers=headers)

print(response.text)
```


## Delete api client

### DELETE https://api.csip.io/v3/apiclients/ref

#### cURL

```
curl --request DELETE \
  --url https://api.csip.io/v3/apiclients/ref
```

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apiclients/ref';
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

url = URI("https://api.csip.io/v3/apiclients/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript 

```
const options = {method: 'DELETE'};

fetch('https://api.csip.io/v3/apiclients/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/apiclients/ref"

response = requests.request("DELETE", url)

print(response.text)
```

## Regenerate api client key

### POST https://api.csip.io/v3/apiclients/id/apikey

#### cURL

```
curl --request POST \
  --url https://api.csip.io/v3/apiclients/id/apikey
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apiclients/id/apikey';
const options = {method: 'POST'};

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

url = URI("https://api.csip.io/v3/apiclients/id/apikey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)

response = http.request(request)
puts response.read_body
```

#### Javascript

```
const options = {method: 'POST'};

fetch('https://api.csip.io/v3/apiclients/id/apikey', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/apiclients/id/apikey"

response = requests.request("POST", url)

print(response.text)
```

## View api client key

### GET https://api.csip.io/v3/apiclients/id/apikey

#### cURL
```
curl --request GET \
  --url https://api.csip.io/v3/apiclients/id/apikey
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/apiclients/id/apikey';
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

url = URI("https://api.csip.io/v3/apiclients/id/apikey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/apiclients/id/apikey', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python 

```
import requests

url = "https://api.csip.io/v3/apiclients/id/apikey"

response = requests.request("GET", url)

print(response.text)
```
