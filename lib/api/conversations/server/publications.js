import { Meteor } from 'meteor/meteor';
import { Conversation, Participant, Message } from 'meteor/socialize:messaging';
import { Counts } from 'meteor/tmeasday:publish-counts';

Meteor.publishComposite("conversations.list", function() {
  if (!this.userId) {
    return this.ready();
  }

  return {
    find() {
      return Conversation.collection.find({
        _participants: this.userId
      });
    },
    children: [
      {
        find(conversation) {
          return Message.collection.find({
            conversationId: conversation._id
          }, {
            sort: { date: -1 },
            limit: 1
          });
        }
      },
      {
        find(conversation) {
          return Meteor.users.find({
            _id: {$in: conversation._participants }
          }, {
            // fields: {
            //   username: 1,
            //   status: 1
            // }
          });
        },
        children: [
          {
            find(user, conversation) {
              return Participant.collection.find({
                userId: user._id
              });
            }
          }
        ]
      }
    ]
  };
});

Meteor.publish('unreadMessages', function() {
  Counts.publish(this, 'unread-messages-count', Participant.collection.find({userId:this.userId, read:false}));
});
