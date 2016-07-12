import { Meteor } from 'meteor/meteor';
import { Message } from 'meteor/socialize:messaging';
import { Counts } from 'meteor/tmeasday:publish-counts';

//publish unread messages count
Meteor.publish('unreadMessagesCount', function() {
  Counts.publish(this, 'unread-messages-count', Participant.collection.find({userId:this.userId, read:false}));
});

Meteor.publish("conversationMessages", function(conversationId){
  if (!this.userId) {
    return this.ready();
  }

  return Message.collection.find({
    conversationId: conversationId
  });
});
