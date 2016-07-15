import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';

import './list.html';

// Components used inside the template
import './list-item.js';

Template.ConversationList.onCreated(function() {

  // console.log("ConversationList.onCreated", this);

  this.autorun(() => {
    new SimpleSchema({
      listType: { type: String } //listType: ['all', 'unread', 'archived', 'starred']
    }).validate(Template.currentData());
  });

  this.getListType = () => Template.currentData().listType;

  this.subscribe('conversationsList');

  this.getConversationsList = () => {
    switch(this.getListType()) {
      case 'all':
        return _.sortBy( Meteor.conversations.find({
          _participants: Meteor.userId()
        }).fetch(), (conversation) => !conversation.isUnread());
        break;

      case 'unread':
        return _.filter( Meteor.conversations.find({
          _participants: Meteor.userId(),
          archived: false
        }).fetch(), (conversation) => conversation.isUnread());
        break;

      case 'archived':
        return Meteor.conversations.find({
          _participants: Meteor.userId(),
          archived: true
        });
        break;

      case 'starred':
        return Meteor.conversations.find({
          _participants: Meteor.userId(),
          archived: false,
          starred: true
        });
        break;
    }
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
