---
title: SQL
slug: /sql-connector
---

SQL data connector configuration object consists of the following attributes:

|Attribute|	Description|
| :-------------: |:-------------:| 
|type|	Connector type; must be always set to sql.|
|id|	App wide unique connector id.|
|server|	Provide only the domain part of the URL without scheme.|
|port	|Service port number.|
|connectionParameters|	**Optional** Map of connection parameters - up to 10.|
|credentials|	**Optional** Username and password to connect to the broker.|
|databaseFlavour|	One of postgresql, mysql, and sqlserver.|
|databaseName|	Name of the database.|
|table|	Name of the table.|
|columns|	Names of the columns that will be modified.|
|dataProcessingMethod|	**Optional.** Id or name of the App method that will be used for filtering and/or transforming incoming data. See Overview page for details.|
|disabled|	**Optional.** When true data connector stops streaming.|

**Create MySQL:**
```
POST .../v3/apps/:ref/dataconnectors

{
  "type": "sql",
  "id": "dc.sql.1",
  "server": "mysql-265fae22-connio-c43e.aivencloud.com",
  "port": 29540,
  "credentials": {
    "user": "avnadmin",
    "password": "ys2q2esmvd3vay94"
   },
   "connectionParameters": {
    "ssl-mode": "REQUIRED"
   },
   "databaseFlavour": "mysql",
   "databaseName": "defaultdb",
   "table": "test",
   "columns": ["feedId", "temperature"],
   "dataProcessingMethod": "processData",  
   "disabled": false
}
```

**Update MySQL**:
```
PUT .../v3/apps/:ref/dataconnectors/dc.sql.1

{
  "databaseName": "testDB",
  "table": "test",
  "columns": ["feedId", "temperature", "time"],
  "dataProcessingMethod": "processData"
}
```

**Create PostgreSQL**:
```
{
    "type": "sql",
    "id": "dc.postgresql.1",
    "server": "pg-f18d550-connio-c43e.aivencloud.com",
    "port": 29540,
    "credentials": {
        "user": "avnadmin",
        "password": "degs21gc1yeweto2"
    },
    "connectionParameters": {
      "sslmode": "require"
    },
    "databaseFlavour": "postgresql",
    "databaseName": "defaultdb",
    "table": "test",
    "columns": ["feedId", "temeprature", "time"],
    "disabled": false
}
```

The data connector's data processing method should return a map where Key is the column name, and Value is the value that will be inserted into that column.

By default if no data processing method is provided, a data value will be mapped like the following:

`feed` -> data value feed
`account` -> account id
`app` -> app id
`device` -> device id. If it is an app data value this is not assigned
`datavalue` -> complete data value in JSON stringified

Example default expected table:

```
CREATE TABLE public.datavalues (
    feed varchar(100) not null,
    account varchar(100) not null,
    app varchar(100) not null,
    device varchar(100) null,
    datavalue varchar(10000) not null
)
```

For a data connector that will populate `feedId` and `temperature` columns, you can return your own map as shown below:

Data Connector Config:
```
{
  "type": "sql",
  "id": "dc.sql.1",
  "server": "mysql-265fae22-connio-c43e.aivencloud.com",
  "port": 29540,
  "credentials": {
    "user": "avnadmin",
    "password": "ys2q2esmvd3vay94"
   },
   "connectionParameters": {
    "ssl-mode": "REQUIRED"
   },
   "databaseFlavour": "mysql",
   "databaseName": "defaultdb",
   "table": "test",
   "columns": ["feedId", "temperature"],
   "disabled": false
}
```

**Data Processing Method Example:**
```
function mymethod(value) {
  // ignore all properties other than `temperature`
  if (value.destination.property.name === "temperature") {
    return { 
        feedId: value.feedId,
        temperature: value.value,
      //time: value.value.sourceTime
    };
  }
  else {
    return null;
  }  
}
```

