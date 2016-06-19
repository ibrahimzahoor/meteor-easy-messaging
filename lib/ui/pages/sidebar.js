import { Template } from 'meteor/templating';
import './sidebar.html';
import './sidebar.css';

// Components used inside the template
import '../components/application/user-menu.js';
// import '../components/conversation/conversation-list.js';
import '../components/users/user-list.js';

Template.Sidebar.onCreated(function sidebarOnCreated() {

  console.log('Sidebar.onCreated called ');

  this.state = new ReactiveDict();
  this.state.setDefault({
    selectedTab: 'conversations'
  });

  this.autorun(() => {
    this.subscribe('conversations.list');
    this.subscribe('user.list');
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

  this.getUsersListData = () => {
    const self = this;
    const usersList = Meteor.users.find({
      _id: {
        $ne: Meteor.userId()
      }
    });
    return {
      usersListReady: self.subscriptionsReady(),
      onChangeTab(tabName) {
        self.state.set('selectedTab', tabName);
      },
      usersList
    };
  }
});

Template.Sidebar.onRendered(function sidebarOnRendered() {
  console.log('Sidebar.onRendered called');

  this.autorun(() => {
    if (this.subscriptionsReady()) {
      console.log('subscriptionsReady :: Sidebar');
    }
  });
});


Template.Sidebar.helpers({
  sidebarContentArgs() {
    const instance = Template.instance();
    if(instance.state.get('selectedTab') === 'conversations') {
      return {
        template: 'ConversationList',
        data: instance.getConversationListData()
      }
    }
    else if(instance.state.get('selectedTab') === 'users') {
      return {
        template: 'UserList',
        data: instance.getUsersListData()
      }
    }
  },
  isActive(tab) {
    const instance = Template.instance();
    return instance.state.get('selectedTab') === tab && 'active';
  }
});

Template.Sidebar.events({
  'click #contacts_controller'(event, instance) {
    instance.state.set('selectedTab', 'users')
  },
  'click #active_chats_controller'(event, instance) {
    instance.state.set('selectedTab', 'conversations')
  }
});
