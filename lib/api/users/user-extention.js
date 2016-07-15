import { User } from 'meteor/socialize:user-model'

// User.appendSchema({
//   'status':                  { type: Object, optional: true },
//   'status.lastLogin.date':   { type: Date, optional: true },
//   'status.lastLogin.ipAddr': { type: String, optional: true },
//   'status.userAgent':        { type: String, optional: true },
//   'status.idle':             { type: Boolean, optional: true },
//   'status.lastActivity':     { type: Date, optional: true },
//   'status.online': {
//      type: Boolean,
//      index: true,
//      optional: true,
//    }
// });

User.methods({
  startConversation(users) {

    if(!_.isArray(users)){
        users = [ users ]
    }

    Meteor.call("findExistingConversationWithUsers", users, function(error, conversationId) {
      if(!error && conversationId) {
        return conversationId;
      }
      else {
        const conversation = new Conversation().save();
        Meteor.call("addUsersToConversation", conversation._id, users);
        return conversation._id;
      }
    });
  }
});
