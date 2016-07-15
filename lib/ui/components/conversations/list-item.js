import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './list-item.html';
import './list-item.css';

Template.ConversationListItem.onCreated(function() {

  this.autorun(() => {
    new SimpleSchema({
      conversation: { type: Conversation },
    }).validate(Template.currentData());
  });

});

Template.ConversationListItem.helpers({
  participant() {
    const instance = Template.instance();
    const participant = instance.data.conversation.participants(1).fetch()[0];
    return participant;
  },
  lastMessage() {
    const instance = Template.instance();
    return instance.data.conversation.lastMessage() && instance.data.conversation.lastMessage().body || "No Message";
  }
});

Template.ConversationListItem.events({
  'click .js-archive'(event, instance) {
    event.stopPropagation();
    instance.data.conversation.toggleArchived();
  },
  'click .js-star'(event, instance) {
    event.stopPropagation();
    instance.data.conversation.toggleStarred();
  }
});
