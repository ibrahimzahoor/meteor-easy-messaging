Package.describe({
  name: 'ibrahimzahoor:easy-messaging',
  version: '0.0.2',
  summary: 'Built on socialize packages, provide full messaging kit',
  git: 'https://github.com/ibrahimzahoor/easy-messaging.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3');
  api.use(['ecmascript']);
  api.use(['templating'], 'client');
  api.use(['socialize:messaging@0.5.1', 'socialize:user-model@0.1.7', 'socialize:user-presence@0.4.0']);
  api.use(['aldeed:simple-schema@1.5.3']);
  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ibrahimzahoor:easy-messaging');
  api.mainModule('tests/easy-messaging-tests.js');
});
