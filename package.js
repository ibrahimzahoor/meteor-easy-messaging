Package.describe({
  name: 'ibrahimzahoor:easy-messaging',
  version: '0.2.0',
  summary: 'Built on socialize packages, provide full messaging kit',
  git: 'https://github.com/ibrahimzahoor/easy-messaging.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3');
  api.use(['ecmascript']);
  api.use(['templating'], 'client');
  api.use([
    'socialize:messaging@0.5.1',
    'socialize:user-model@0.1.7',
    'mizzao:user-status@0.6.6',
    'aldeed:collection2@2.9.1',
    'aldeed:simple-schema@1.5.3',
    'tmeasday:publish-counts@0.7.3',
    // 'socialize:user-presence@0.4.0'
  ]);
  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
  // api.export('Conversation');
  // api.export('User');

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ibrahimzahoor:easy-messaging');
  api.mainModule('tests/easy-messaging-tests.js');
});
