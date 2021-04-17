---
title: Authentication
slug: /authentication
---

When you first signup with Csip.io, the system automatically creates a ***Master*** account and an admin user with the ***sign-in credentials*** consisting of your email address and your password as specified at the signup. As an admin user, you get the privileges to fully manage this newly created account.

Every user on the system gets an automatically generated API access key. API keys represent an API Key Id and Secret pair. You can use access keys to make secure REST requests to any Csip.io API.

API access keys uniquely identifies an entity (i.e. user, device, or api client) that is allowed to make REST requests within an account context. All requests to Csip.io API require the caller to authenticate using HTTP Basic Auth to convey his identity. You must provide the API key id as basic auth username, and Secret as password. For example if you are accessing the Csip.io API via cURL, the following command would authenticate you if you replace **apikey_id** with your user's API key id, and replace **apikey_secret** with your API key secret values.

```
curl -u {apikey_id}:{apikey_secret} https://api.connio.com/v3/accounts/_this_
```

All RESTful API requests done with API key credentials must be made over HTTPS. Calls made over plain HTTP will fail. You must authenticate for all requests.

> ## ❗️ Security Warning
> Note that your admin user API access key credentials carries many privileges (admin privileges to be exact), so make sure to keep it secret! It is not recommended to share your credentials with other parties, or distribute it in your devices.

Csip.io introduces a different set of credentials specifically designed to send and retrieve data from clients, connected devices, or other data sources securely called device and apiclient API access keys. For more information see Devices , Api Clients and Api Keys resource sections.