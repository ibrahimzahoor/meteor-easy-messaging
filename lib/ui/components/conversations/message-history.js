import { Template } from 'meteor/templating';

import './message-history.css';
import './message-history.html';

Template.ConversationMessageHistory.onCreated(function() {

  this.autorun(() => {
    new SimpleSchema({
      conversation: { type: Conversation },
      accending: { type: Boolean, optional: true },
      decending: { type: Boolean, optional: true },
    }).validate(Template.currentData());
  });

  this.autorun(() => {
    this.subscribe('viewingConversation', this.data.conversation._id);
  });

});


Template.ConversationMessageHistory.helpers({
  messages() {
    const instance = Template.instance();
    const conversation = instance.data.conversation
    const messages = conversation && conversation.messages(null, null, 'date', '-1');

    return messages
  }
});

Template.ConversationMessageHistory.events({

});
