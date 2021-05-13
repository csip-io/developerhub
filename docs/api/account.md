---
title: Accounts
slug: /account
---

An Account instance resource represents a single account entity.

A system account can be master or sub account depending on its location in the account hierarchy.

Sub accounts are created under a master or another sub account. Unlike master accounts, sub accounts have ownerId attribute in their resource definition. Owner account's administrator can access to all resources (e.g. devices, users, etc..) of their sub accounts for administrative purposes.

> ### 🚧 Rule
> Master accounts cannot be created using Admin Services API. You must use csipio portal in order to create your master account and get a user api key. Sub accounts on the other hand can be created using Admin Services API.

## Resource Attributes

| Attribute| 	Description| 
| :-------------: |:-------------:|
| id| 	A 23 to 26 characters long string that uniquely identifies this account.| 
| name| 	A user selected name (as specified at the signup) that uniquely identifies this account.| 
| friendlyName| 	Display name of the account.| 
| ownerId| 	Optional. Id of the owner account, if any.| 
| plan| 	The plan type of the account. Either trial or one of the paid plans.| 
| status| 	The status of this account. Usually open, but can be closed and suspended.| 
| organization| 	Optional. Details of the organization that this account is related to.| 
| description| 	Optional. Account description.| 
| tags| 	Optional. The list of the tags associated with the account.| 
| balance	| The current balance of the account in US dollars, if paid plan.| 
| locked| 	Locked account cannot be deleted, modified, new sub elements (e.g. sub accounts, devices, etc..) cannot be added, or existing sub elements cannot be removed; but its sub elements can be modified.| 
| dateCreated	| The date that this account was created in ISO 8601 format.| 
| dateModified| 	The date that this account was last modified in ISO 8601 format.| 

Below is a fully populated Account instance resource.

```
{
  "id": "_acc_833847694816627075",
  "name": "Inbiza",
  "friendlyName": "Inbiza Technology Solutions",
  "plan": {
    "type": "trial",
    "expiresAt": "2017-12-31T23:59:59Z"
  },
  "status": "open",
  "organization": {
    "name": "Inbiza Technology Solutions Ltd.",
    "websiteUrl": "http://www.inbiza.com",
    "imageUrl": "http://www.inbiza.com/images/logo.jpg"
  },
  "description": "Inbiza is a technology consulting company specialized in Cloud computing, embedded systems, and IoT solutions.",
  "tags": ["canada", "system integrator"],
  "balance": {
    "amount": 0
  },
  "locked": false,
  "dateCreated": "2017-02-24T11:46:31.293Z",
  "dateModified": "2017-04-24T01:13:21.346Z"
}
```

Api key credentials allow Csipio to infer requester's identity. For example if you are using your account's admin user's api key credentials, you can simply use `_this_` placeholder to refer to your account. On the other hand, if you want to operate on a sub account, you need to specify a reference (i.e `id` or `name`) explicitly.

## Sub Account Brief View

When an owner account query for its sub accounts, the following response object returned from the system. Response object provides a brief view of the sub accounts instead of providing all account attributes. You should query the sub account using its id in order to access its full view.

Response object consists of the following attributes:

|Attribute|	Description|
| :-------------: |:-------------:|
|id	|A 23 character string that uniquely identifies this account.|
|name|	A user selected name (as specified at the signup) that uniquely identifies this account.|
|ownerId|	Id of the owner account.|
|plan	|The plan type of the account. Either trial or one of the paid plans.|
|status|	The status of this account. Usually open, but can be closed and suspended.|
|balance|	The balance of the account if paid plan.|
|locked|	Restricted or fully accessible.|
|dateCreated|	The date that this account was created in ISO 8601 format.|

## View my account details

### GET https://api.csip.io/v3/accounts/_this_

#### cURL

```curl --request GET \
  --url https://api.csip.io/v3/accounts/_this_
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/accounts/_this_';
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

url = URI("https://api.csip.io/v3/accounts/_this_")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/accounts/_this_', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/accounts/_this_"

response = requests.request("GET", url)

print(response.text)
```

## Modify my account

### PUT https://api.csip.io/v3/accounts/_this_

#### cURL
```
curl --request PUT \
  --url https://api.csip.io/v3/accounts/_this_ \
  --header 'Content-Type: application/json'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/accounts/_this_';
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

url = URI("https://api.csip.io/v3/accounts/_this_")

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

fetch('https://api.csip.io/v3/accounts/_this_', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

```

#### Python

```
import requests

url = "https://api.csip.io/v3/accounts/_this_"

headers = {"Content-Type": "application/json"}

response = requests.request("PUT", url, headers=headers)

print(response.text)

```

### POST https://api.csip.io/v3/accounts

```
{
  "name": "my_sub_account",
  "plan": { "type": "trial", "expiresAt": "2017-12-01T00:00:00.000Z" },
  "user": { 
    "name": "sub_1 Admin User",
    "email": "power@acme.com",
    "role": "admin"
  },
  "import": {
    "deviceProfiles": { "type": "all" },
    "appProfiles": { "type": "all" },
    "apps": { 
        "type": "some", 
        "locked": false,
        "refs": [ "_app_125236525845896521" ]
    }
}
```

## List sub accounts

#### cURL

```
curl --request GET \
  --url 'https://api.csip.io/v3/accounts?status=open | closed | suspended'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/accounts?status=open | closed | suspended';
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

url = URI("https://api.csip.io/v3/accounts?status=open | closed | suspended")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/accounts?status=open | closed | suspended', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/accounts"

querystring = {"status":"open | closed | suspended"}

response = requests.request("GET", url, params=querystring)

print(response.text)
```

## View sub account details

### GET https://api.csip.io/v3/accounts/ref

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/accounts/ref
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/accounts/ref';
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

url = URI("https://api.csip.io/v3/accounts/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/accounts/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/accounts/ref"

response = requests.request("GET", url)

print(response.text)
```

## Modify sub account

### PUT https://api.csip.io/v3/accounts/ref

#### cURL

```
curl --request PUT \
  --url https://api.csip.io/v3/accounts/ref \
  --header 'Content-Type: application/json' \
  --data '{"status":"open","locked":false}'
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/accounts/ref';
const options = {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({status: 'open', locked: false})
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

url = URI("https://api.csip.io/v3/accounts/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Content-Type"] = 'application/json'
request.body = "{\"status\":\"open\",\"locked\":false}"

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({status: 'open', locked: false})
};

fetch('https://api.csip.io/v3/accounts/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
const options = {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({status: 'open', locked: false})
};

fetch('https://api.csip.io/v3/accounts/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

## Closing sub account

### DELETE https://api.csip.io/v3/accounts/ref

#### cURL 

```
curl --request DELETE \
  --url https://api.csip.io/v3/accounts/ref
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/accounts/ref';
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

url = URI("https://api.csip.io/v3/accounts/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'DELETE'};

fetch('https://api.csip.io/v3/accounts/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python 

```
import requests

url = "https://api.csip.io/v3/accounts/ref"

response = requests.request("DELETE", url)

print(response.text)
```