---
title: Basics
slug: /basics
---

The csip.io platform includes two sets of APIs: Admin Services API and Data Services API. While Admin Services API is used to manage your csip.io account, and wire your IoT solutions, Data Services API is used to exchange data among devices, api clients and the csip.io platform.

All API access is through the api.csip.io domain using HTTPS. Hence all URLs referenced in the documentation have the following base: `https://api.csip.io/v3.`

We use entity nouns as labels for the resources:

* /devices
* /devices/:ref
The first URL is for a resource collection; the second is for an instance resource in the collection.

All csipio entities have both an `id`, a globally unique identifier, and a given `name`, a contextually unique identifier. All instance resources can be accessed either by their id or by their contextual name within the proper context as shown below:

Entity or Sub Entity by id
```
https://api.csip.io/v3/apps/_app_223341111738008347
print s
```

Entity by name
```https://api.csip.io/v3/apps/default```

**Note that sub entity names are unique only under their owner's context.** This requires you to provide full path when querying them. For example, if you like to access to a property called `temperature` defined under a device profile called `temperature_sensor`, you should provide the following path:

Sub entity by name
`https://api.csip.io/v3/deviceprofiles/temperature_sensor/properties/temperature`

This referencing scheme is required since property name `temperature` is only unique within the `temperature_sensor` device profile context. Alternatively you would access it by its `id` as shown below:

Sub entity by id
`https://api.csip.io/v3/properties/_prp_123541189738008332`

> ## 🚧 Usage of {ref} Placeholder

> As stated earlier, except for sub entities (i.e. properties, methods, alerts etc..), `id` and `name` identifiers can be used interchangeably within almost all API paths to reference resource instances. Note that we will use `{ref}` throughout this document as a placeholder to remind the reader that both `id` or `name` identifiers can be used interchangeably.

We operate on the resources with HTTP verbs. Our HTTP verbs are POST, GET, PUT, and DELETE. You can think of them as mapping to the acronym CRUD (Create-Retrieve-Update-Delete).

Creating a resource instance involves performing an HTTP POST to a resource collection URL. Updating a resource instance involves performing an HTTP PUT to its URL. We stay true to the spirit of POST & PUT semantics. Use PUT if you know the URL of the resource, or if you are the authority to assign its URL.

Note that all delete operations except batch operations return the following object with a success code (200). The number of items deleted can be 0 if nothing found to delete.

Delete response
```
{ 
  "nrOfItems": <number of items deleted> 
}
```

All requests to the API require you to authenticate using basic authentication.

All data is sent and received as JSON. Every string passed to and from the Csip.io API must be UTF-8 encoded. You can unset an optional field by setting to null (e.g. `{ "description": null }` )

All timestamps values are stored in UTC with milliseconds precision. Transferred timestamps are expected to be formatted according to ISO 8601 (e.g. `2015-08-24T10:53:32.674-0800`)

Since some lightweight HTTP clients do not support methods PUT and DELETE, you can simulate them via POST by appending the query string parameter ***_method*** (underscore method) to a resource URL. Valid values for this parameter are PUT and DELETE.

Errors are returned using standard HTTP error code syntax. Any additional info is included in the response body in JSON format.

API calls are subject to rate limiting. Exceeding any rate limits will result in all endpoints returning a status code of 429 (Too Many Requests).

If you think you can help us improve our API or documentation, drop us a line at admin@csip.io