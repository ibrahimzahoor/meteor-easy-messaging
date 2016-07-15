import { ReactiveDict } from 'meteor/reactive-dict';
import './conversation-list-page.html';

//components
import '../components/conversations/list.js'

Template.ConversationListPage.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    listType: "all"
  });
})


Template.ConversationListPage.helpers({
  listType: function(){
    const instance = Template.instance();
    return instance.state.get("listType");
  }
});

Template.ConversationListPage.events({
  'change #js-list-select'(event, instance) {
    if (!$(event.target).val()) {
      return;
    }
    instance.state.set("listType", $(event.target).val());
  }
});
