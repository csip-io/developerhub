---
title: CouchDB
slug: /couchdb-connector
---

CouchDB data connector configuration object consists of the following attributes:

| Attribute| Description| 
| :-------------: |:-------------:| 
| type| 	Connector type; must be always set to couchDB.| 
| id| 	App wide unique connector id.| 
| server| 	Provide only the domain part of the URL without scheme.| 
| port	| Service port number.| 
| ssl	| Either true or false. If true uses TLS connection.| 
| credentials	| **Optional** Username and password to connect to the broker.| 
| databaseName| 	Database name in lowercase.| 
| dataProcessingMethod| 	**Optional.** Id or name of the App method that will be used for filtering and/or transforming incoming data. See Overview page for details.| 
| disabled| 	**Optional.** When true data connector stops streaming.| 

**Create**:
```
POST .../v3/apps/:ref/dataconnectors/test

{
  "id": "dc.couchdb.1", 
  "type": "couchDB",
  "server": "dfcf6a18-f6f8-4a0c-8913-28cba936289e-bluemix.cloudant.com",
  "databaseName": "test",
  "port": 443,
  "ssl": true,
  "credentials": {
    "user": "tedoestaildstandangerfar",
    "password": "df22b1299ab24b68d328c1b39a359f31d209e8e0"
   }   
}
```

**Update**:
```
PUT .../v3/apps/:ref/dataconnectors/dc.couchdb.1

{
  "databaseName": "test2"
}
```

> ### 🚧 Database
> Only lowercase database names are accepted by CouchDB. If given database does not exist, data connector creates it automatically.