Meteor.methods({
  startConversation: (users) => {
    check(users, [String]);

    const existingConversationId = Meteor.call("findExistingConversationWithUsers", users);

    if(existingConversationId) {
      return existingConversationId;
    }
    else {
      const conversation = new Conversation().save();
      conversation.addParticipants(Meteor.users.find({ _id: {$in: users } }).fetch());
      return conversation._id;
    }
  },
  startConversationWithMessage: (users, message) => {
    check(users, [String]);
    check(message, String);

    const existingConversationId = Meteor.call("findExistingConversationWithUsers", users);

    if(existingConversationId) {
      Meteor.conversations.findOne(existingConversationId).sendMessage(message);
      return existingConversationId;
    }
    else {
      const conversation = new Conversation().save();
      conversation.addParticipants(Meteor.users.find({ _id: {$in: users } }).fetch());
      conversation.sendMessage(message);
      return conversation._id;
    }
  }
});
