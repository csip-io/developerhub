---
title: API Access
slug: /apiaccess
---

An API Key instance sub resource represents an api key entity. API keys allows external or internal entities to interact with the Csip.io platform securely. Every transaction of API keys are recorded to be used for audit and billing purposes.

Note that API keys do not exist by their own; instead they are always created automatically under a parent entity such as user, device or apiclient. We call these keys User Key, Device Key, and Client Key respectively.

## Resource Attributes 

| Attribute	| Description |
| :-------------: |:-------------:|
| Context | 	It consists of type and ids fields. type can be one of the following account, app, and device. The ids field contains a set of entity ids matching the given context type. |
| Scope |  Scopes let you specify exactly what type of access you need. Scopes limit access for api keys. See the scope table below for more information. | 
| RateLimit |	As its name suggests, it limits the transaction rate of this api key. Default value for this attribute is defined by the account type, and cannot be changed by the user. Can be unlimited (-1) or x number of calls per minute.| 

JSON Sample
```
{
  "id": "_key_924201752433266229",
  "secret": "85f0b8497fab4244b63439b23fe148d0",
  "ownerId": "_usr_924201603387295292",
  "accountId": "_acc_923380065327020781",
  "context": {
    "type": "account",
    "ids": [
        "_acc_923380065327020781"
    ]
  },
  "scope": [
    "app:read-data",
    "device:read-data",
    "deviceprofile:read",
    "device:read",
    "device:modify",
    "device:write-data",
    "subaccount:read",
    "appprofile:modify",
    "deviceprofile:modify",
    "app:modify",
    "account:read",
    "app:read",
    "appprofile:read",
    "apiclient:read"
  ],
  "rateLimit": 60,
  "dateCreated": "2017-06-29T03:43:54.309Z",
  "dateModified": "2017-06-29T03:43:54.309Z"
}

```

### Context

Context defines the context that this api key will be applicable. For example if the context is set to app with ids field ['_app_156238482748283274'], and the scope attribute is set to app:read, external system using this key can read the metadata of the app with the given id.

In some scenarios, devices do not get connected to the Csipio platform directly. Instead, an external backend system exchange data with the Csipio platform on behalf of these devices. In such cases, it is useful to provide a single api key to the external backend system instead of multiple keys. Below we show an example api client's key meeting the requirements of this scenario:

```
{
  "id": "_key_465924116351130803",
  "secret": "66b61659cd7a4885bec0756d9ef97ea4",
  "accountId": "_acc_466239243174908338",
  "context": { 
    "type": "device", 
    "ids": ['_dev_467084708689467300', '_dev_467084708689467301', '_dev_467084708689467302'] 
  },
  "scope": ['device:read', 'device:read-data', 'device:write-data', 'device:execute-method', 'device:modify'],
  "rateLimit": 120
}
```

Acceptable context types are:

| Type |	Description |
| :-------------: |:-------------:|
| account	| Gives access to specific accounts for management. The owner account id or a set of sub accounts can be provided as id list. All user api keys runs in account context.
| device |	Gives access to specific devices. This key can be used to read/write data from/to the specified devices. Each device gets an api key automatically when created, device being its context type containing all device related scopes.
| app  |	Gives access to specific apps. With proper scope, this key can be used to manage (i.e. add, remove properties etc.), and/or to read/write data from/to the specified apps.

> ### 🚧 Rule
> Only devices generated from `Gateway` device profile can carry multiple device ids in their api keys. Other devices can have only single device id in their api key.

> ### 📘 Tip
> Api Client is generic entity that might represent any kind of external or internal agent that interacts with the Csipio platform. It is the only entity that might have all three context types in it api keys (not at the same time off course). Like devices, each api client gets an api key automatically when created.

### Scope

Scope defines the privileges given to a api key. Each context works with different sets of scopes. Valid scopes are:

|Scope | Description |	Context|
| :-------------: |:-------------:|:-------------: |
|(no scope)|	Grants read-only access to public information.|	all|
|subaccount:create|	Allows sub account creation.|	account|
|subaccount:read|	Grants read-only access to all sub account data.|	account|
|subaccount:modify|	Allows sub account data modification.|	account|
|subaccount:delete|	Allows sub account deletion.|	account|
|user:create|	Allows user creation.|	account|
|user:read|	Grants read-only access to all user data.|	account|
|user:modify|	Allows user data modification.|	account|
|user:delete|	Allows user deletion.|	account|
|apiclient:create|	Allows api client creation.|	account|
|apiclient:read|	Grants read-only access to all api client data.|	account|
|apiclient:modify|	Allows api client data modification.|	account|
|apiclient:delete|	Allows api client deletion.|	account|
|deviceprofile:create|	Allows device profile creation.|	account|
|deviceprofile:read|	Grants read-only access to all device profile data.|	account|
|deviceprofile:modify|	Allows device profile data modification.|	account|
|deviceprofile:delete|	Allows device profile deletion.|	account|
|device:create|	Allows device creation.	|account|
|device:read|	Grants read-only access to all device data.|	account, device, app|
|device:read-data*|	Allows reading device captured data from the time-series database and device state.	| account, device, app|
|device:write-data*|	Allows writing data to the platform on behalf of a device.|	device, app|
|device:execute|	Allows public method execution on the device.|	account, device, app|
|device:modify|	Allows device data modification.|	account, device|
|device:delete|	Allows device deletion.	| account|
|appprofile:create|	Allows app template creation. |	account |
|appprofile:read|	Grants read-only access to all app template data.	| account|
|appprofile:modify|	Allows app profile data modification.|	account|
|appprofile:delete|	Allows app profile deletion.|	account|
|app:create|	Allows app creation. |	account|
|app:read|	Grants read-only access to all app data.	| account, app|
|app:read-data|	Allows reading app captured data from the time-series database and app state. |	account, app| 
|app:write-data|	Allows writing data into app properties.|	app|
|app:execute|	Allows public methods execution on the app.	 | account, app |
|app:modify|	Allows app data modification.	|account, app |
|app:delete|	Allows app deletion.	|account|
(*) If the key's is a API Client or User key, it can access only to `public` properties of the device for reading and writing. If the key's owner entity is a device, it can access to all its properties including `private` and `public` ones.

### Device, and User keys
API Keys that are automatically generated for device, and user entities are called Device Keys, and User Keys respectively.

#### Device Key allows any physical device or data source to:
* Read device state including the most recent property values
* Read device metadata and historical data
* Write device data to the platform
* Execute device methods
* Connect to the platform through one of the supported connection methods such as MQTT or WebSocket (read & write)

#### User Key allows account users to:
* Managed the given account entities including sub accounts, apps, devices, device profiles, etc..

#### A fully privileged Api Client with App context allows any app client to:

* Read app state including the most recent property values
* Read app metadata and historical data
* Execute app methods
* Write app data to the platform
* Connect to device mirrors
* Read device state including the most recent property values
* Read device historical data
* Execute device methods

### User roles
For convenience, when creating new users, roles can be specified. Csipio API supports 3 predefined roles as such:

| Role |	Description |	Scopes|
| :-------------: | :-------------: | :-------------: |
|admin|	Full system administration privileges|	- |
|power|	Power user. Full system administration privileges minus account closing, user creation, modification , deletion and api key regeneration|	- |
|user | Regular user. Mostly read-only access to account entities | - |
|guest|	Very limited access	| - |

### Api Key Usage
The following Data Services endpoints can be used with the following api keys.

#### Device Key

|***Operation***|	***HTTP Verb***	|***Endpoint***|	***Shortcut***|
| :-------------: |:-------------:|:-------------: |:-------------: |
|Write|	POST|	data/devices/_this_/properties |	/data/properties |
|Write|	POST|	data/devices/_this_/properties/{ref}|	/data/properties/{ref}|
|Read|	GET	| data/devices/_this_ |	/data|
|Read|	GET|	data/devices/_this_/properties/{ref}|	/data/properties/{ref}|
|Exec|	PUT	| data/devices/_this_/methods/{ref}	| /data/methods/{ref} |

ref can be `id` or `name`
`_this_` is a special keyword to refer to the device associated with the given device key, without using device id or name.

#### API Client Key (Generic Key) with App context and full app access privilege

| Operation | 	| HTTP Verb|	Endpoint |	Shortcut/Notes |
| :-------------: |:-------------:|:-------------: |:-------------: |
|Write|	POST|	data/apps/{ref}/properties |	None|
|Write|	POST|	data/apps/{ref}/properties/{ref}|	None|
|Read|	GET	|data/apps/{ref}|	None|
|Exec|	PUT	|data/apps/{ref}/methods/{ref}|	None|
|Write|	POST|	data/devices/{ref}/properties|	Send command to a plugged device|
|Write|	POST|	data/devices/{ref}/properties/{ref} |	None|
|Read|	GET|	data/devices/{ref} |	Read plugged device state|
|Read|	GET|	data/devices/{ref}/properties/{ref}	|Read plugged device property|
|Exec|	PUT	| data/devices/{ref}/methods/{ref} |	Execute plugged device method|

App keys can only access to the devices plugged into this app. ref can be `id` or `name``

#### API Client Key (Generic Key) with Device context and full device access privilege

|Operation|	HTTP Verb	|Endpoint|	Shortcut/Notes|
| :-------------: |:-------------:|:-------------: |:-------------: |
|Write|	POST	|data/devices/{ref}/properties|	Send command to a plugged device |
|Write|	POST	|data/devices/{ref}/properties/{ref}|	None |
|Read|	GET	|data/devices/{ref}|	Read plugged device state |
|Read|	GET	|data/devices/{ref}/properties/{ref}|	Read plugged device property |
|Exec|	PUT	|data/devices/{ref}/methods/{ref}|	Execute plugged device method |

> ### 📘 Tip
> Generic api keys created with Device context can act on behalf on the devices listed in the `ids` array.
