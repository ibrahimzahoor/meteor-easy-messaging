import { Template } from 'meteor/templating';

import './show-page.html';
import './show-page.css'

// Components used inside the template
// import '../../components/conversations/show.js';

Template.ConversationShowPage.onCreated(function() {

  // console.log("ConversationShowPage :: onCreated");

  this.autorun(() => {
    new SimpleSchema({
      'conversation._id': { type: String },
    }).validate(Template.currentData());
  });

  this.getConversationId = () => Template.currentData().conversation._id;

  this.autorun(() => {
    this.subscribe('conversation.messages', this.getConversationId());
  });
});

Template.ConversationShowPage.onRendered(function() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      // console.log('subscriptionsReady :: ShowPage');
    }
  });
});

Template.ConversationShowPage.helpers({
  conversation(){
    const instance = Template.instance();
    const conversation = Meteor.conversations.findOne({
      _id: instance.getConversationId()
    });

    return {
      conversationReady: instance.subscriptionsReady(),
      conversation
    };
  }
});
