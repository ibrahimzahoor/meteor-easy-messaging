import { Template } from 'meteor/templating';

import './show-page.html';
import './show-page.css'

// Components used inside the template
// import '../components/conversation/conversation-show.js';

Template.ShowPage.onCreated(function() {

  // this.getConversationId = () => FlowRouter.getParam('_id');

  this.conversationId = this.data.conversation._id;

  this.autorun(() => {
    this.subscribe('conversation.messages', this.conversationId;
  });

});

Template.ShowPage.onRendered(function() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      console.log('subscriptionsReady :: ShowPage');
    }
  });
});

Template.ShowPage.helpers({
  conversation(){
    const instance = Template.instance();
    const conversation = Meteor.conversations.findOne({
      _id: instance.conversationId
    });
    const messages = conversation && conversation.messages();

    return {
      conversationReady: instance.subscriptionsReady(),
      conversation,
      messages
    };
  }
});
