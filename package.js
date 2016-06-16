Package.describe({
  name: 'ibrahimzahoor:easy-messaging',
  version: '0.0.1',
  summary: 'Built on socialize packages, provide full messaging kit',
  git: 'https://github.com/ibrahimzahoor/easy-messaging.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3');
  api.use(['ecmascript', 'socialize:messaging', 'socialize:user-model', 'socialize:user-presence', 'reywood:publish-composite']);
  api.mainModule("server.js", "server");
  api.mainModule("client.js", "client");
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ibrahimzahoor:easy-messaging');
  api.mainModule('easy-messaging-tests.js');
});
