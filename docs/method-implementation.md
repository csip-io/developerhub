---
title: Method Implementation
slug: /method-implementation 
---


Csip.io methods are analog to methods in Object Oriented Programming. They provide behaviour to Device and App objects. All methods gets single argument called value that can be any primitive or object value. Object's private, protected and public methods can be called from other methods of the same object using object type specific prefix (ie. `this.myMethod()`, or `this.myMethod()`).

Each method is executed within its own context. While a method is executing, it can interact with the rest of the system through its context which is constructed during run-time. The information within the context depends on whether the method is part of a Device or an App. For both cases, the context will contain all properties and methods of the parent object and allow local access to them. The context also contains a set of built-in methods (see below).

In order to maintain a highly performant script execution environment, all script calls are asynchronous in nature. As a result, all internal API calls are promise-based (i.e. they return `Promise` object).

## Device Methods

Device methods can call other user defined and built-in device methods. The following private built-in methods can be called from user defined methods:

|Method	|Description|	Signature|	Returns|
| :-------------: |:-------------:| :-----:| :-----:|
|setProperty|	Write given value into device property |	`setProperty(<property name>, <data-point>`) |	Promise of property value as data point object|
|getProperty |	Gets given property object	`getProperty(<property name>)`|	Promise of Property* object |
|log	| Write into device log	|`log(<log type>, <message>)`|	Promise of undefined|
|readData	|Read historical data	|`readData(<property name>, <query object**>`)	|Promise of Query Result object***|
|findDevices	Get devices by given filter****	findDevices(`<query object>`).| Works only for devices inherited from Gateway profile to locate devices that are linked to this gateway.	|Promise of device id list|
|executeDeviceMethod	|Executes a device method from gateway device method.	|`executeDeviceMethod(<device id>, <method name>, <argument>)`	|Promise of `{"result": <value> }` |
|setDeviceProperty	Set device property from gateway device method|	`setDeviceProperty(<device id>, <property name>, <data-point> )`	|Promise of property value as data point object|
|getDeviceProperty|	Get device property from gateway device method|	`getDeviceProperty(<device id>, <property name>`)|	Promise of property value|


Sample Property object 
````
{
  "meta": {
    "name": "identifier",
    "dateModified": "2019-10-21T19:35:06.779Z",
    "friendlyName": "identifier",
    "locked": false,
    "accountId": "_acc_741403117096528031",
    "publish": "never",
    "retention": {
      "condition": {
        "when": "always"
      },
      "lifetime": "3months",
      "type": "historical",
      "capacity": 100000
    },
    "id": "_prp_742037026752907103",
    "inherited": false,
    "qualifiedName": "test_device$identifier",
    "dateCreated": "2019-10-21T19:35:06.779Z",
    "ownerId": "_dpf_741453409226596860",
    "type": "string",
    "access": "public"
  },
  "time": "2019-10-21T19:36:04.696Z",
  "value": "FJ-093490-DNNDL"
}
````

Data Point objects
````
{
  value: <property value>,
  time: <value capture time>
}
````

** See Query Object format.

*** Historical Query result object

````
resultSet:
    {
        "sampleSize": <number>,
        "results": [
            {
                "ref": {
                    "id": <property-id>,
                    "qname": <property-qualified-name>,
                    "objectId": <object-id>
                },
                "values": [
                    {
                        "t": <iso-time>,
                        "v": <value>
                    }
                  ....
                ],
                "groupBy": [
                    {
                        "GroupByType": {
                            "type": "number",
                            "group": []
                        }
                    }
                ],
                "attributes": {
                    "protocol": [
                        ....
                    ],
                    "source": [
                        ....
                    ]
                }
            }
        ]
    }
````

**** See Device Filters format.



setProperty():
````
// This method converts the given temperature 
// to Kelvin and stores in `temperature` property.
function setTemperature(value) {
  // convert the value from Fahrenheit to Kelvin
  let kelvin = ((value-32)/1.8)+273.15;
  
  return this.setProperty("temperature", {
    value: kelvin,
    time: new Date().toISOString() // now
  }).then(prop => prop.value);
}
````

getProperty():
````
// This method returns `temperature` property value 
// in Fahrenheit. 
function getTemperature(value) {
  return this.getProperty("temperature").then(prop => {
    // convert the value from Kelvin to Fahrenheit
    return ((prop.value-273.15)*1.8)+32
  });
}
````

log():
````
// You can create a Puclic method for your devices to log incoming 
// value in device log.
function logMsg(value) {
  // Possible log types are:
  //  error, debug, info, warning
  return this.log('info', value);
}
````

readData():
````
// Get 10 days average of device temperature
function get10DayAvg(value) {
  let query = {
    "startRelative": {
      "value": 10,
      "unit": "days"
    },
    "aggregators": [
      {
        "name": "avg",
        "sampling": {
        "value": 10,
        "unit": "days"
      }
     }
    ]
  };
  
  return this.readData("temperature", query).then(resultSet => {
    // See above for resultSet format
    return resultSet.results[0].values[0].v;
  });
}
````