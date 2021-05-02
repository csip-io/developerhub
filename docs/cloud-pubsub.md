---
title: Cloud Pub-Sub
slug: /cloud-pubsub-connector
---

### Google Cloud Platform Pub/Sub Service

Google Pub/Sub data connector configuration object consists of the following attributes:

|Attribute|	Description|
| :-------------: |:-------------:| 
|type|	Connector type; must be always set to google-pubsub.|
|id|	App wide unique connector id.|
|privateKey	|Content of the Private Key to be used for accessing to the service.|
|clientEmail|	Client email address as specified by the service.|
|projectId|	Project ID.|
|topic|	Topic name.|
|dataProcessingMethodId|	**Optional**. Id of the App method that will be used for filtering and/or transforming incoming data. See Overview page for details.|
|disabled|	**Optional**. When true data connector stops streaming.|

**Create:**
```
POST .../v3/apps/:ref/dataconnectors

{
    "type": "google-pubsub",
    "id": "dc.gcp.pubsub.1",
    "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6wRC+xdjdtkni\ngckfySlThdi86JFbpgljrAIJFARJyKUW8kr/xoPw62PxhoYY9yo5OfSoNzobsJqo\nMmTRnSVXWDZkGE5vLl9Jrn1MSSDA9oRA7MOTA3TUxJ/zrX8fwZBt28lHDwp7BXb0\n/MfkDuLaA0kz5U0JIAUbXfDv7UMDxr6yoJ/F6Tfs4+fwS4qmFfVgpnTdMH1Y9DAB\nHcOtnLISDmMLAQi2ObJm/0DsntTF2Eicdg3dR0CC8loC608QgllETC/JiloYIvBw\nomN2LQAfiPta/56hss0AAxxMCH4ZcEC5x+ainAxCLFzyejKo9De19b2kF+Nvj8kR\nn+X9wzcBAgMBAAECgg55555555555Abf0bcPb1RVWqu+fZwe+PsI8uBye2Y\nftgDF3nAi2TkSgN+7/dEm+/TKThrmp5yy0EMblL11WHO5mTs/QJHTPeOXD5tDg4L\nQyXaCVUqkciRTDC2eqPoXx8nwDDF21O2YDrDoSGSl2Hb3Au/2SUjkzaKxpusRKkH\nlhQW+ca6i8A0tdEU/CS6hY1Kb0NOUjn6gWOtM/WdUEYb48VlNJNnF3WdCfF6UndD\nXS5Mjfzx4bGMT1gfj7J+PKVJcWaOPp2SAUXPeRKEc/WjGwUGihW+f10wpUT5xQPJ\nKiO0nE40x0gPrkp3JNvcl8vmGAqWqyaSUj28u87TlQKBgQDgzYx86dWSA676TSmO\njjwfglUX8XM9PIpJf0IqsxO55555aht0BMzkJSg57u+YrTg82JLC8boe21E\n5Azf30Vjv7T7+RmpkOsR/glkzwKBgQDUq8dnSv7SKrJSn7ZpDC2Ev6TQWOcIoj4x\nh1PtLOAEZz5RWZw1QZ64ErAsKoF8UF4lHyLhjvZYocnb38jmFeVMLh79BL3J/Jh7\ngERZFZi2yXovj4ALxsGyPpZAHmDVusQhGKDio9+kflqTyIHlrwkzsXr7xFpF6cc9\nJ4bMItI7LwKBgBVpPnI/S0om86l/Y+/h+DQAE9697n3soDcz2bd7aueK/k1blfzM\ncMWsc305VyqdP+zx558XDjIl1HIIxtVVbXZizyAS96R8XZI7tTBoCJVUF9iKKoBx\nSut6n/mPUbipmaYefJ/YTopbSsylxNiE5/0CpPdFMRW2ugz+coU6LubdAoGBAMBr\nK9+pWyWMvAtFtiUVf5m8S8K2rVKCeQMXDjhpgcZ6I0g3a75DwPeK8RsE2mM/0+6C\nXWz3jKxktd7ae0qyROTIVgFXaOB4Sv5y72QqxiGb6ZFepNwC2P4M4qTg13yJnyrS\nvb5Rxudt60YLBHxsAkdjLYLeBU98VWhfevb4Cn7BAoGAbb8uplhSxt0eUR6d7/7c\nNU+kPcr2Qv6U5WcICENNvSHsvqUKXDINA//9zOq44maOH/2RkbRIpPD3rEqFgc9M\nf9dQUHWt6Sdol2tI5IEJ8miaWnwEhz7s5tD/knPPzcSa4IadTns42+YaYxZlimGz\nkrHazb+tC6vQ9V2mwkkucko=\n-----END PRIVATE KEY-----\n",
    "clientEmail": "pub-sub-test-account@nth-micron-251906.iam.gserviceaccount.com",
    "projectId": "nth-micron-251906",
    "topic": "dc_test",
    "disabled": false
}
```

**Update**:
```
PUT .../v3/apps/:ref/dataconnectors/dc.gcp.pubsub.1

{
  "topic": "test_topic"
}
```

### GCP Pub/Sub settings
![Example pubsub1](./assets/pubsub1.png)

![Example pubsub2](./assets/pubsub2.png)