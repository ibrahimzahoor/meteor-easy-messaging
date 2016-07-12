import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';

import './reply.html';
import './reply.css';

Template.ConversationReply.onCreated(function() {
  this.autorun(() => {
    new SimpleSchema({
      conversationId: { type: String },
    }).validate(Template.currentData());

    // TODO: send message using server method - improve
    this.subscribe('conversation', this.data.conversationId);
  });

  this.typingSubscription = null;
  this.typingTimeout = null;

  this.setTypingStatus = (status) => {
    const self = this;

    if(status) {

      if(!self.typingSubscription){
        self.typingSubscription = self.subscribe("typing", self.data.conversationId);
      }

      if(self.typingTimeout){
        Meteor.clearTimeout(self.typingTimeout);
      }

      self.typingTimeout = Meteor.setTimeout(function() {
        self.typingSubscription.stop();
        self.typingSubscription = null;
        self.typingTimeout = null;
      }, 2000);
    }
    else {

      if(self.typingSubscription){
        self.typingSubscription.stop();
        self.typingSubscription = null;
      }

      if(self.typingTimeout){
        Meteor.clearTimeout(self.typingTimeout);
        self.typingTimeout = null;
      }
    }
  }
});

Template.ConversationReply.helpers({

});

Template.ConversationReply.events({
  'click #send_button'(event, instance) {
    event.preventDefault();

    const $input = $('#reply_textarea');

    if (!$input.val()) {
      return;
    }

    Meteor.conversations.findOne({
      _id: instance.data.conversationId
    }).sendMessage($input.val());

    $input.val('');

    instance.setTypingStatus(false);

  },

  'keydown #reply_textarea': _.throttle(function (event, instance) {
    instance.setTypingStatus(true);
  }, 300)
});
