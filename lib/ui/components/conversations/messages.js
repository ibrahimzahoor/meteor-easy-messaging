import { Template } from 'meteor/templating';

import './messages.css';
import './messages.html';

Template.ConversationMessages.onCreated(function() {

  this.getConversationId = () => Template.currentData().conversationId;
  // TODO:
  // this.getConversationId = () => this.data.conversationId;

  this.autorun(() => {
    new SimpleSchema({
      conversationId: { type: String },
      accending: { type: Boolean, optional: true },
      decending: { type: Boolean, optional: true },
    }).validate(Template.currentData());

    this.subscribe('conversationMessages', this.getConversationId());
    this.subscribe('viewingConversation', this.getConversationId());
  });

  this.getConversationMessages = () => {
    if(this.data.accending) {
      return Meteor.messages.find({
        conversationId: this.getConversationId()
      }, {
        sort: {
          date: 1
        }
      });
    }
    else {
      return Meteor.messages.find({
        conversationId: this.getConversationId()
      }, {
        sort: {
          date: -1
        }
      });
    }
  }
});


Template.ConversationMessages.helpers({
  messages() {
    const instance = Template.instance();
    return instance.getConversationMessages();
  }
});

Template.ConversationMessages.events({

});
