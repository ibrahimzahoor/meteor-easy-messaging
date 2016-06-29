Meteor.methods({
   "addUsersToConversation": function(conversationId, users) {
     check(users, [String]);
     check(conversationId, String);

     _.each(users, function(user) {
       Meteor.conversations.findOne(conversationId).addParticipant(Meteor.users.findOne(user));
     });

     return conversationId;
   }
});


// UserPresence.onUserOnline(function(userId){
//   Meteor.users.update({_id: userId}, {$set:{status:"online"}})
// });
//
// //when the users status is set to idle
// UserPresence.onUserIdle(function(userId){
//   Meteor.users.update({_id: userId}, {$set:{status:"idle"}})
// });
//
// //when the users status is offline
// UserPresence.onUserOffline(function(userId){
//   Meteor.users.update({_id: userId}, {$set:{status: "offline"}})
// });
