import { Template } from 'meteor/templating';

import './message-history.css';
import './message-history.html';

Template.ConversationMessageHistory.onCreated(function() {

  this.autorun(() => {
    new SimpleSchema({
      conversation: { type: Conversation },
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
    const messages = conversation && conversation.messages();
    return messages
  }
});

Template.ConversationMessageHistory.events({

});
