import { Template } from 'meteor/templating';
import './list-page.html';
import './list-page.css';

// Components used inside the template
// import '../../components/conversations/list.js';

Template.ConversationListPage.onCreated(function () {

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

Template.ConversationListPage.onRendered(function sidebarOnRendered() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      // console.log('subscriptionsReady :: ConversationListPage');
    }
  });
});


Template.ConversationListPage.helpers({
  conversationsList() {
    const instance = Template.instance();
    return instance.getConversationListData()
  }
});

Template.ConversationListPage.events({

});
