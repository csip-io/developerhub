---
title: Overview
slug: /data-overview
---

Data Services API provides all the functionality to exchange data between your systems and the Csip.io platform, orchestrate them and integrate with external systems.

All Data Services API endpoints start with https://api.csip.io/v3/data base URL.

### Writing Data
Data Service API supports the following write scenarios:

1. Writing single data point into single property
2. Writing multiple data points into single property
3. Writing multiple data points into multiple properties

You can write device and app data both using REST and MQTT endpoints.

### Reading Data
Data Services API supports the following read scenarios:

1. Reading historical data of single property from the system's time-series database property
2. Reading device state - a snapshot view of all the properties owned by the device

You can read device's and app's historical and most recent data using REST and their live data using MQTT endpoint. 