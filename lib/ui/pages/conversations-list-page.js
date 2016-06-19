import { Template } from 'meteor/templating';
import './sidebar.html';
import './sidebar.css';

// Components used inside the template
import '../components/application/user-menu.js';
// import '../components/conversation/conversation-list.js';
import '../components/users/user-list.js';

Template.ConversationsListPage.onCreated(function() {

  console.log('ConversationsListPage.onCreated called ');

  this.autorun(() => {
    this.subscribe('conversations.list');
  });

  this.getConversationListData = () => {
    const conversationsList = Meteor.conversations.find({
      _participants: Meteor.userId()
    });
    return {
      conversationsListReady: this.subscriptionsReady(),
      conversationsList
    };
  }
});

Template.ConversationsListPage.onRendered(function() {
  console.log('ConversationsListPage.onRendered called');

  this.autorun(() => {
    if (this.subscriptionsReady()) {
      console.log('subscriptionsReady :: ConversationsListPage');
    }
  });
});


Template.Sidebar.helpers({
  conversationsList() {
    const conversationsList = Meteor.conversations.find({
      _participants: Meteor.userId()
    });
    return {
      conversationsListReady: this.subscriptionsReady(),
      conversationsList
    };
  }
});

Template.Sidebar.events({

});
