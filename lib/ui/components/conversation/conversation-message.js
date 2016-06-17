import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './conversation-message.html';
import './conversation-message.css';


Template.ConversationMessage.onCreated(function() {
  this.autorun(() => {
    new SimpleSchema({
      message: { type: Message }
    }).validate(Template.currentData());
  });
});

Template.ConversationMessage.helpers({
  messageType() {
    const instance = Template.instance();
    if(instance.data.message.checkOwnership()) {
      return 'sent sent-styled';
    }
    else {
      return 'recieved recieved-styled';
    }
  }
});
