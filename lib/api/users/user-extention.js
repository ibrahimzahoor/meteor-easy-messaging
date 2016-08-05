import { User } from 'meteor/socialize:user-model'

//TODO: documentation status schema
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
  startConversation(users, callback) {

    if(!_.isArray(users)){
        users = [ users ]
    }

    return Meteor.call("startConversation", users, callback);

  },
  startConversationWithMessage(users, message, callback) {

    message = message || false;

    if(!_.isArray(users)){
        users = [ users ]
    }
    console.log("message", message);

    return Meteor.call("startConversationWithMessage", users, message, callback);
  }
});
