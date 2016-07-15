import { Conversation } from 'meteor/socialize:messaging';

Meteor.methods({
  toggleStarred: function(conversationId) {
    const starred = !Meteor.conversations.findOne(conversationId).starred;
    Meteor.conversations.update(conversationId, {
      $set: {
        starred: starred
      }
    });
  },
  toggleArchived: function(conversationId) {
    const archived = !Meteor.conversations.findOne(conversationId).archived;
    Meteor.conversations.update(conversationId, {
      $set: {
        archived: archived
      }
    });
  }
})
