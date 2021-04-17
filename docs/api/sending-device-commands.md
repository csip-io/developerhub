---
title: Sending Device Commands
slug: /sending-device-command
---

External clients can send commands to devices by either:

1. writing into device `public` properties with `publish` attribute `always` or changed directly;

2. invoking public methods that writes into properties with `publish` attribute `always` or `changed` indiretcly.

When a public property is written with an API key other than the device key, the written value is automatically sent to the device via MQTT given that property `publish` attribute is set other than `never.`

> ### ❗️ Attention

> If the device is not connected to the broker at the time of writing, the package gets lost. To prevent that happens different QoS levels must be used or a custom feedback mechanism is recommended.

> Make sure that property publish attribute is set to always or changed if you want to send the property value to the device.

> Note that in some cases you might want to store property values only on the server-side. In such cases set property publish type to never.

### Important MQTT Topics

| Topic	| Description| 
| :-------------: |:-------------:|
| connio/data/in/devices/{id}/properties/#	 |  subscribe to listen commands coming from the platform in the format defined by the property type.|  
| connio/data/in/devices/{id}/properties/{name} | 	subscribe to listen commands coming from the platform in the format defined by the property type |  

> ### ❗️ Property Names in Topics
> Property names must be always given in lowercase within the topic paths.

### Sending Commands over MQTT

MQTT provides a stateful and bi-directional connection to devices. The same connection can be used both for writing and receiving data to/from the platform.

In order to receive commands from the platform a device should do the following:

1. It should connect to one of the MQTT endpoints using its device id as the client id, device key id as the username and device key secret as the password.

2. Once connected, it should subscribe to `csipio/data/in/devices/{id}/properties/#` or `csipio/data/in/devices/{id}/properties/{name}` and listen for incoming data and commands.