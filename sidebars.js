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
            'data-objects/data-feed',
            'data-objects/data-point',
            'data-objects/data-value'
          ],             
      }
      ]
    },
  {
      type: 'category',
      label: 'Tutorials',
      items: [
        'understanding-builtin-profile',
        'understanding-locations',
        ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
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
    'api-keys',
    {
      type: 'category',
      label: 'Plugins',
      items: [
        'api/admin-overview',
        'api/apiaccess',
        'api/authentication',
        'api/basics',
      ],
    },
  ]
};