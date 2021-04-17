---
title: Error Handling
slug: /error-handling
---

You should expect to handle the following status codes to manage your application logic.

### Possible Response Status Codes
| Status Code	 | Description |
| :-------------: |:------------- | 
|200 |	OK. | Request has succeeded. |
|202 |	Data write request has been accepted for processing, but the processing will be completed asynchronously. You receive this response code only when writing data to the Connio platform. |
|400 |	Bad request (e.g. missing a required object attribute). |
|401 |	Unauthorized. Authentication is possible but has failed or key credentials do not allow this operation. |
|403 |	Forbidden. The request was a legal request, but the server is refusing to respond to it (e.g. device is disabled). |
|404 |	Not Found. The requested resource could not be found or provided credentials do not match to any account. |
|406 |	Data Connector test failed. |
|409 |	Conflict. The request could not be processed due to domain constraints. |
|429 |	Too Many Requests. The client has sent too many requests in a given period of time. |
|500 |	Server Error. Something went wrong in the Connio server while processing the request. |
|503|	Not implemented. This feature has not been implemented yet. |

### Error Response Object

Connio APIs might return multiple errors for a single request. More information about each specific error is included in the body of each response in the following format:

| Attribute	 | Description |
| :-------------: |:-------------| 
| code |	Error code. |
| cause	| Plain text explanation of the problem for the developer. |
| message |	User friendly version of the same error message to be used in web and mobile apps. |
| moreInfoUrl | A link that will take you to the error documentation and community site. |

```
[
  {
   "code": "ResourceNotFound", 
   "cause": "Resource not found",
   "message": "Requested endpoint is not valid. Make sure that there is no typo in the URL provided. See API documentation for details.",
   "moreInfoUrl": "https://docs.connio.com/v3/error/resourcenotfound"
  }
]
```
