import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './conversation-list-item.html';
import './conversation-list-item.css';

import '../../lib/helpers.js';

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
  }
});

// Template.ConversationListItem2.replaces("ConversationListItem");
