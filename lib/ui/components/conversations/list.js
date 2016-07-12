import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';

import './list.html';

// Components used inside the template
import './list-item.js';

Template.ConversationList.onCreated(function() {

  console.log("ConversationList.onCreated", this);

  // this.autorun(() => {
  //   new SimpleSchema({
  //     unread: { type: Boolean, optional: true },
  //     archived: { type: Boolean, optional: true },
  //   }).validate(Template.currentData());
  // });

  // this.state = new ReactiveDict();
  // this.state.setDefault({
  //   listType: 'all'
  // });

  this.autorun(() => {
    this.subscribe('conversationsList');
  });

  this.getConversationsList = () => {
    const conversationsList = _.sortBy( Meteor.conversations.find({
      _participants: Meteor.userId()
    }).fetch(), (conversation) => !conversation.isUnread());

    return conversationsList
  }
});

Template.ConversationList.helpers({
  conversations() {
    const instance = Template.instance();
    return instance.getConversationsList();
  }
});

Template.ConversationList.events({

});
