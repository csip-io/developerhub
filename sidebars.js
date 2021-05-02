module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Csip.io Platform 101',
      items: [
        'welcome-to-csipio',
        'overview',
        'entities',        
        'context',
        {
          type: 'category',
          label: 'Data Objects',
          items: [
            'data-objects',
            'data-objects/data-feed',
            'data-objects/data-point',
            'data-objects/data-value'
          ],             
      }
      ]
    },
    {
      type: 'category',
      label: 'Data Connector',
      items: [
        'data-connector-overview',
        'appmethod',
        'websocket',
        'data-connector-http',
        'sql-connector',
        'data-connector-amqp',
        'mqtt',
        'kafka',
        'couchdb',
        'mongodb',
        'cloud-pubsub',
        'aws-kinesis',

        ],
    },
  {
      type: 'category',
      label: 'Tutorials',
      items: [
        'understanding-builtin-profile',
        'understanding-locations',
        'provisioning',
        'mirroring',
        'understanding-alert-systems',
        'device-code'
        ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'nodered',
        'redash',
        'superset-integration',
        'grafana'
      ],
    },
    {
      type: 'category',
      label: 'Migrating to Csip.io',
      items: [
        'migratingtocsipio',
      ],
    },
    {
      type: 'category',
      label: 'Errors',
      items: [
        'reservedpropertyname',
        'reservedmethodname',
        'cannotdeleteprofileinuse',
        'cannotdeleteprofileinherited',
      ],
    },
  ], 
  api: [
    {
    type: 'category',
    label: 'Csip.io API Overview',
    items: [
      'api-keys',
    ]
    
    },
    {
      type: 'category',
      label: 'Admin Services API',
      items: [
        'api/admin-overview',
        'api/apiaccess',
        'api/authentication',
        'api/basics',
      ],
    },
  ]
};