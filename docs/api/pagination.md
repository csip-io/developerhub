---
title: Pagination
slug: /pagination
---

Almost all queries returning a collection in Admin API services are resulted in paginated form as shown below:

| Attribute	| Description| 
| :-------------: |:-------------:|
|total	|Total number of items found.|
|itemCount	|Number of items in this response entity.|
|numOfPages|	Total number of pages.|
|pageNo	|Current page no.|
|skip	|Number of items skipped from the beginning of the page.|
|results|	List of the items.|

### Example:

`GET ../v3/devices`

```
{
  "total": 5000,
  "itemCount": 80,
  "numOfPages": 63,
  "pageNo": 1,
  "skip": 0,
  "results": [
    { ... }
  ]
}
```

### Pagination Related Params

| Param |	Example |
| :-------------: |:-------------:|
| The number of items per page |	?pageSize={number} |
| The requested page no	 | ?pageNo={number} |
| The number of page items to be skipped |	?skip={number} |