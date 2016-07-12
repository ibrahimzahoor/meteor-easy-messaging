import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './message.html';
import './message.css';


Template.ConversationMessage.onCreated(function() {

  // console.log("ConversationMessage.onCreated", this);

  // this.autorun(() => {
  //   new SimpleSchema({
  //     'message': { type: Object }
  //   }).validate(Template.currentData());
  // });
});

Template.ConversationMessage.helpers({
  isOwner() {
    const instance = Template.instance();
    return instance.data.message.checkOwnership();
  }
});
