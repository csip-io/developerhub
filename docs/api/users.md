---
title: Users
slug: /users
---

An User instance resource represents a single user entity.

> ### 📘 Tip
> System users are personas who interact with the platform in order to develop an IIoT solution or monitor the system. System users should not be confused with users typically defined by your solution's domain.

### Resource Attributes

|Attribute|	Description|
| :-------------: |:-------------:|
|id	|A 23 to 26 characters long string that uniquely identifies this user.|
|accountId	|The unique id of the account that created this user.|
|email|	The email address of the user. Since emails must be unique across the system, email can be used as entity name in URL paths like .../users/luke.skye@acme-systems.com.|
|name|	Full name of the user.|
|status	|The status of this user. Can be either invited, confirmed and disabled. Users with invited and disabled status cannot access to the platform.|
|role|	The role assigned to the user. Can be either admin, user (regular user), power (power user), guest, and custom.|
|description|	Optional. Some description about this user.|
|tags|	Optional. The list of the tags associated with the user.|
|avatarUrl|	Optional. URL for the avatar image.|
|timezone	|Optional. The time zone for this user in [City] UTC±[hh][mm] format.|
|locale	|Optional. Preferred language and locale for this user in [language code]-[country] format.|
|locked|	if locked, entity cannot be modified, deleted.|
|dateCreated|	The date that this user was created in ISO 8601 format.|
|dateModified|	The date that this user was last modified in ISO 8601 format.|

```
{
  "id": "_usr_587617400839897384",
  "accountId": "_acc_587617399162687551",
  "email": "mike.stevenson@acme-systems.com",
  "name": "Michael Stevenson",
  "status": "confirmed",
  "role": "admin",  
  "description": "Account owner",
  "tags": ["r&d", "developer"],
  "avatarUrl": "http://s3.content.avatars.com/images/minime.jpg",
  "timezone": "Vancouver UTC-08:00",
  "locale": "en-ca",
  "dateCreated": "2016-03-21T18:10:52.882Z",
  "dateModified": "2016-03-23T19:32:38.681Z"
}
```

## Invite new user 

### POST https://api.csip.io/v3/users

#### cURL

```
curl --request POST \
  --url https://api.csip.io/v3/users \
  --header 'Content-Type: application/json'
```

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/users';
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

url = URI("https://api.csip.io/v3/users")

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

fetch('https://api.csip.io/v3/users', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/users"

headers = {"Content-Type": "application/json"}

response = requests.request("POST", url, headers=headers)

print(response.text)
```


## List users 

### GET https://api.csip.io/v3/users

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/users
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/users';
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

url = URI("https://api.csip.io/v3/users")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/users', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/users"

response = requests.request("GET", url)

print(response.text)
```

## View user details

### GET https://api.csip.io/v3/users/ref

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/users/ref
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/users/ref';
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

url = URI("https://api.csip.io/v3/users/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/users/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/users/ref"

response = requests.request("GET", url)

print(response.text)
```

## Modify user

### PUT https://api.csip.io/v3/users/ref

```
curl --request PUT \
  --url https://api.csip.io/v3/users/ref \
  --header 'Content-Type: application/json'
```

#### Node 

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/users/ref';
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

url = URI("https://api.csip.io/v3/users/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

#### Javascript 

```
const options = {method: 'PUT', headers: {'Content-Type': 'application/json'}};

fetch('https://api.csip.io/v3/users/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/users/ref"

headers = {"Content-Type": "application/json"}

response = requests.request("PUT", url, headers=headers)

print(response.text)
```

## Delete user

### Delete https://api.csip.io/v3/users/ref

#### cURL

```
curl --request DELETE \
  --url https://api.csip.io/v3/users/ref
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/users/ref';
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

url = URI("https://api.csip.io/v3/users/ref")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'DELETE'};

fetch('https://api.csip.io/v3/users/ref', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```
#### Python 

```
import requests

url = "https://api.csip.io/v3/users/ref"

response = requests.request("DELETE", url)

print(response.text)
```

## Regenerate user key

### POST https://api.csip.io/v3/users/id/apikey

#### cURL

```
curl --request POST \
  --url https://api.csip.io/v3/users/id/apikey
```
#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/users/id/apikey';
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

url = URI("https://api.csip.io/v3/users/id/apikey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'POST'};

fetch('https://api.csip.io/v3/users/id/apikey', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/users/id/apikey"

response = requests.request("POST", url)

print(response.text)
```

## View user key

### GET https://api.csip.io/v3/users/id/apikey

#### cURL

```
curl --request GET \
  --url https://api.csip.io/v3/users/id/apikey
```

#### Node

```
const fetch = require('node-fetch');

const url = 'https://api.csip.io/v3/users/id/apikey';
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

url = URI("https://api.csip.io/v3/users/id/apikey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

#### JavaScript

```
const options = {method: 'GET'};

fetch('https://api.csip.io/v3/users/id/apikey', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

#### Python

```
import requests

url = "https://api.csip.io/v3/users/id/apikey"

response = requests.request("GET", url)

print(response.text)
```