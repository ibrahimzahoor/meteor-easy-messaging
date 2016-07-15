import { Template } from 'meteor/templating';

import './conversation-show-page.html';
import './conversation-show-page.css';

// Components used inside the template
import '../components/conversations/messages.js'
import '../components/conversations/reply.js'
import '../components/conversations/message.js'
import '../components/conversations/new.js'

Template.ConversationShowPage.onCreated(function() {

  // console.log("ConversationShowPage.onCreated", this);

  this.getConversationId = () => Template.currentData().conversationId

  this.autorun(() => {
    new SimpleSchema({
      'conversationId': { type: String },
    }).validate(Template.currentData());

    this.subscribe("conversationParticipants", this.getConversationId());
  });
});


Template.ConversationShowPage.helpers({
  recipient() {
    const instance = Template.instance();
    const conversation = Meteor.conversations.findOne({_id: instance.getConversationId()});
    const participant = conversation && conversation.participants(1).fetch()[0];
    return participant;
  }
})
