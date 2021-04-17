---
title: Using Mosquitto Bridge
slug: /migratingtocsipio
---


One of the easiest way to forward your existing devices' data to the Csip.io platform is to setup a Mosquitto bridge locally and forward it to the Csip.io broker. You can achieve that as shown below:

```
connection some-connection-name
notifications false
cleansession true
try_private true
bridge_protocol_version mqttv311
max_queued_messages 200000
log_type all
address mqtt.connio.cloud:1883
remote_clientid {DeviceID}
remote_username {DeviceKeyID} 
remote_password {DeviceKeySecret}
topic "" out 0 mydevice/events connio/data/out/devices/{DeviceID}/methods/processMessage
```

In the example above we show how a local Mosquitto broker can be used as a bridge to send data to the Connio platform.

Here, {DeviceID}, {DeviceKeyID}, and {DeviceKeySecret} are belong to the virtual device created on the Connio platform. The physical device writes into mydevice/events topic locally and the bridge forwards the payload to connio/data/out/devices/{DeviceID}/methods/processMessage topic on the Connio broker which is linked to a method called processMessage of this virtual device.

Please see section "Configuring Bridges" of the Mosquitto configuration.