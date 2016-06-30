import { User } from 'meteor/socialize:user-model'

User.methods({
  isOnline() {
    return this.status == true ? true : false;
  },
  setStatusIdle() {
    Meteor.call('updateSessionStatus', 1);
  },
  setStatusOnline() {
    Meteor.call('updateSessionStatus', 2);
  },
  email() {
    return this.emails[0].address;
  },
  startNewConversationWithUsers(users, callback) {

    const conversation = new Conversation().save();

    Meteor.call("addUsersToConversation", conversation._id, users , callback);
  }
})
