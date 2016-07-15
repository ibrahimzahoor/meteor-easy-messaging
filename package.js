Package.describe({
  name: 'ibrahimzahoor:easy-messaging',
  version: '0.3.0',
  summary: 'Built on socialize:messaging, provide full messaging kit',
  git: 'https://github.com/ibrahimzahoor/easy-messaging.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3');
  api.use(['ecmascript', 'check', 'underscore', 'templating', 'reactive-dict']);
  api.use([
    'socialize:messaging@0.5.1',
    'socialize:user-model@0.1.7',
    'mizzao:user-status@0.6.6',
    'reywood:publish-composite@1.4.2',
    'tmeasday:publish-counts@0.7.3',
  ]);

  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');

  api.export([
    'Conversation',
    'Participant',
    'Message',
    'User'
  ]);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ibrahimzahoor:easy-messaging');
  api.mainModule('tests/easy-messaging-tests.js');
});
