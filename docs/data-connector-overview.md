---
title: Data Connector Overview
slug: /data-connector-overview
---

Data Connectors allow developers to stream incoming device data to different backend and data stores without writing any additional code. You can create multiple data connectors within an App to stream incoming data of devices plugged into this App. Currently we limit data connector per App by 10 connectors, in the future we might increase this limit.

Data Connectors are managed under their parent entities (i.e. App) as shown below:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="list"
  values={[
    {label: 'List', value: 'list'},
    {label: 'ViewDetails', value: 'viewdetails'},
    {label: 'Test', value: 'test'},
    {label: 'TestSaved', value: 'testsaved'},
    {label: 'CreateNew', value: 'createnew'},
    {label: 'Update', value: 'update'},
    {label: 'Update', value: 'delete'},
  ]}>
  <TabItem value="list">GET .../v3/apps/:ref/dataconnectors</TabItem>
  <TabItem value="viewdetails">GET .../v3/apps/:ref/dataconnectors/:id</TabItem>
  <TabItem value="test">POST .../v3/apps/:ref/dataconnectors/test</TabItem>
  <TabItem value="testsaved">GET .../v3/apps/:ref/dataconnectors/:id/test</TabItem>
  <TabItem value="createnew">POST .../v3/apps/:ref/dataconnectors</TabItem>
  <TabItem value="update">POST .../v3/apps/:ref/dataconnectors</TabItem>
  <TabItem value="delete">DELETE .../v3/apps/:ref/dataconnectors/:id</TabItem>
</Tabs>;


> #### 🚧 SECURITY
Some data connectors' configuration contain sensitive information such as login credentials (i.e. username and password). For security reasons Csipio does not return saved credentials in API responses. This precaution requires you to provide passwords every time you run a test on
`POST .../v3/apps/:ref/dataconnectors/test` endpoint. As a safe alternative, the platform exposes another test endpoint where you can run tests on saved data connectors without needing to provide any configuration value including credentials as shown below.

`GET POST .../v3/apps/:ref/dataconnectors/:id/test`

> #### 📘 DISABLING DATA CONNECTORS
> If an app is disabled, all its data connectors are disabled automatically. Alternatively you can disable data connectors one by one.

Data is streamed into data connectors in Data Value format. Single App method can be used to pre-process (i.e. to transform or to filter) incoming data before it is sent to the connector.

For example, you can create a custom object within the data processor method before you write it to your data store.

**transforming**
```function preprocessor(value) {
 let myEvent = {
   device_context: value.destination.state,
   event: {
     feed_id: value.feedId,
     event_type: "onPropertyChanged",
     time: value.sourceTime,
     property_name: value.destination.property.name,
     property_new_value: value.value     
   }
 }
  
 return myEvent;  
}
```
---

**filtering**
````
function preprocessor(value) {
 if (value. destination.property.name == "temperature") {
   let myEvent = {
     device_context: value.destination.state,
     event: {
       feed_id: value.feedId,
       event_type: "onTemperatureChanged",
       time: value.sourceTime,
       property_name: value.destination.property.name,
       property_new_value: value.value     
     }
   }     
   return myEvent; 
 }
 else {
   // Filter out
   return null;
 } 
}function preprocessor(value) {
 if (value. destination.property.name == "temperature") {
   let myEvent = {
     device_context: value.destination.state,
     event: {
       feed_id: value.feedId,
       event_type: "onTemperatureChanged",
       time: value.sourceTime,
       property_name: value.destination.property.name,
       property_new_value: value.value     
     }
   }     
   return myEvent; 
 }
 else {
   // Filter out
   return null;
 } 
}
````

Data Connector config object consists of the following common attributes.

|Attribute|	Description|
| :-------------: |:-------------:| 
|type	| Connector type (e.g. HTTP, AMQP, etc..) |
|id	| App wide unique connector id. |
| *dataProcessingMethod |	Optional. Id or name of the App method that will be used for filtering and/or transforming incoming data.|
| disabled |	When true data connector stops streaming.|

*Note that when you requested the data connector object, the response contains always the dataProcessingMethodId.

Additionally each data connector specifies its own relevant fields. See data connector page for details.

> ### 📘 DATA CONNECTOR PERFORMANCE
> Apps act like execution context for data connectors. If you have too many devices plugged into a singe app, or your devices are chatty, one data connector per app always give you the best performance.
> You can always improve your scalability by limiting the number of devices plugged into an app, or number of data connectors created within an app.