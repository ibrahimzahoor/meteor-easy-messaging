import { Template } from 'meteor/templating';

import './show.html';
import './show.css';

// Components used inside the template
// import './message.js';
// import './reply.js';
// import './message-history.js';

Template.ConversationShow.onCreated(function() {

  this.autorun(() => {
    new SimpleSchema({
      conversationReady: { type: Boolean },
      conversation: { type: Conversation },
    }).validate(Template.currentData());
  });

});


Template.ConversationShow.helpers({
  recipient() {
    const instance = Template.instance();
    const conversation = instance.data.conversation
    const participant = conversation && conversation.participants(1).fetch()[0];
    return participant;
  }
});

Template.ConversationShow.events({

});
