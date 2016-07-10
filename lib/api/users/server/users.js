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
