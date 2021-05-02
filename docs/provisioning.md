---
title: Device Provisioning
slug: /provisioning
---


Device provisioning is the easiest way to make devices acquire their credentials from the platform on-demand, securely. It eliminates the need to store static keys in deployed devices, while enable admins to replace compromised keys remotely.

Csip.io's MQTT based provisioning flow is a proprietary method requiring a communication flow implemented on the device software. This page explains the steps involving in implementing such flow.

> ### 🚧 IMPORTANT
> Only MQTT version 3.1.1 is supported.

## Preparation for Provisioning

Provisioning requires an App and API Client key generated on the platform. App helps admins to groups devices, while API Client helps to create a provisioning key that will be distributed with the devices. This key cannot be used anything other than collecting basic device info and provisioning.

### 1. Create an App

Any kind of application would do, but the devices that will be provisioned need to be plugged into this app.

### 2. Create API Client

Admin user should create an `API Client` with `app` context and `device:read` scope. The query that will create an API Client would look like the following:

> ### 📘 You can also use `account` context keys for cross account provisioning
> it is possible to provide `account` context keys to devices to allow cross account provisioning. For example, a parent account provisioning key (with `account` context) can provision sub account devices. Note that you also need `subaccount:read` privilege in the key beside `device:read.`

`POST https://api.connio.com/v3/apiclients`

````
{
  "description": "Device provisioning key",
  "tags": ["test"],
  "context": {
    "type": "app",
    "ids": ["_app_582461412423605865"]
  },
  "scope": ["device:read"]
}
````

`ids` field should hold the id of the App created for provisioning.

Once created, the API Key id and secret of this client can be stored in the devices that will be deployed to the field. Single API Key id and secret can be used by multiple devices of the same App created to enable provisioning.


### 3. Plugin your device to the App

You can plugin a device into an app by adding this app's reference into the device's app list.

`PUT https://api.connio.com/v3/devices/{id}`

````
{
  "apps": ["<my app name or id>", ..., ... other apps go here]
}
````

## Provisioning over MQTT

### 1. Connect to the broker
During the provisioning phase device must login to the Csip.io's secure MQTT broker with the following credentials:

MQTT Credentials to connect Csip.io's secure MQTT broker
````
client id: `_???_{user defined part}`
username: API Client's API Key id  
password: API Client's API Key secret
````

Note that a client id starting with _???_ prefix signifies that the device wants to do provisioning. Once established, this connection cannot be used anything but provisioning.

User defined part can be any numeric or alpha numeric char sequence defined by the device programmer. For example client id field can be something like _???_SAA345678987654321. White space is not allowed in this id. It can be different or exact same every time the device gets provisioned.

> ### ❗️ IMPORTANT
> The part after the `_???_` prefix can be anything the device programmer might select, but the total length of the client id should not exceed ***23*** characters.

### 2. Subscribe

Device should subscribe to `csipio/provisions/{clientId}` topic in order to receive provisioning response from the system. For example to `csipio/provisions/_???_SAA345678987654321`.

### 3. Publish provisioning request

Device make a provisioning request by publishing its identity and optionally a configuration property name to `csipio/provisions` topic as shown below. To identify itself to the platform, the device must use a piece of information only known to the device and platform. This piece of information can be a MAC address, IMEI or other kind of information that device can collect from a secure element or from an electronic component it contains (eg. network card, etc..)

Device publishes its identification type, identification and a property name (for the configuration data) using JSON format as shown below:

````
{
  "{cidType}": "{cid}",
  "configProperty": "{property name that keeps the device configuration}"  
}
````

`configProperty` is optional. If not provided, nothing will be returned to the device. If property not found, an empty object will be returned.

Possible cid types can be `id`, `cid`, `mac`, `sn`, `esn`, and `imei`.

### 4. Collect provisioning response

The platform publishes the device id, device key and configuration property value (if requested) to `csipio/provisions/{clientId}` using JSON format as follows:

````
{
  "deviceId": "{deviceId}",
  "apiKeyId": "{apiKeyId}",
  "apiSecret": "{secret}",
  "{config property name}": {config property value} 
}
````

Note that `apiKeyId` and `apiSecret` are belong to this specific device. Upon sending the response, connection will be automatically closed by the broker.

### 5. Reconnect using device credentials

Once the device gets disconnected from the broker, it should connect again using the provided credentials as shown below:

Connection credentials
````
client id: {deviceId}
username: {apiKeyId}
password: {secret}
````

## Examples

1. with configuration property

Request:
````
 {
    "mac": "01:23:45:67:89:ab",
    "configProperty": "myConfig"
}
````

Response:

````
{
    "deviceId": "_dev_523658745214589652",
    "apiKeyId": "_key_12563254785236587",
    "apiSecret": "asdfasdfkjadkla56ds4fas6d46",
    "myConfig": {...} (json object or any other type specified when the property was created)
}
````

2. without specifying configuration property:

Request:

````
{
    "mac": "01:23:45:67:89:ab",       
}
````

Response:

````
{
    "deviceId": "_dev_523658745214589652",
    "apiKeyId": "_key_12563254785236587",
    "apiSecret": "asdfasdfkjadkla56ds4fas6d46"
}
````

## Best Practices

1. Provision the device only during the power up, and keep the returned device credentials in the memory. Ideally do not store them unless you have a good reason (e.g. Internet connection is not always available).

2. Use the provisioning key stored in your device to get connected to the broker and complete the provisioning request according to the following flow:

    2.1. If the system doesn’t allow device get connected to the broker using provisioning key, wait for approximately 1 minute, and try again until the connection is established. This might happen when the provisioning key is blocked due to rate limiting, or temporarily suspended. It is up to you how many times you like to retry, but make sure that you put enough time between retries so the system doesn’t think that this an attack*.

    2.2. If the device gets connected to the broker using the provisioning key, make the provisioning request, wait up to 30 seconds for provisioning response**. Once you get the device key, disconnect from the broker immediately and reconnect using the returned key. If there is no response after 30 seconds, disconnect from the broker, wait for 2 minutes, and repeat step #2.

3. If the broker kills the connection of the device during operation (e.g. device is disabled, or its API Key is regenerated by the admin user), try to reconnect to the broker using already acquired device key. If the broker rejects the connection requests, wait for 2 minutes and try again, up to 3 times. If no success after 3 tries, make a provisioning requests again and, repeat step #2.

*The system might block the remote IP for certain amount of time.

**If the system is busy, responding to provisioning requests might take longer than expected.
