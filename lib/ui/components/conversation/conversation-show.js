import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

import './conversation-show.html';
import './conversation-show.css';

// Components used inside the template
import './conversation-message.js';
import './conversation-reply.js';

Template.ConversationShow.onCreated(function() {

  this.autorun(() => {
    new SimpleSchema({
      conversationReady: { type: Boolean },
      conversation: { type: Conversation },
      messages: { type: Mongo.Cursor },
    }).validate(Template.currentData());
  });

  this.autorun(() => {
    this.subscribe('viewingConversation', this.data.conversation._id);
  });

});


Template.ConversationShow.helpers({
  participant() {
    const instance = Template.instance();
    const conversation = instance.data.conversation
    const participant = conversation && conversation.participants(1).fetch()[0];
    return participant;
  }
});

Template.ConversationShow.events({

});
