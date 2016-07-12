// import { Template } from 'meteor/templating';
//
// import './show.html';
// import './show.css';
//
// // Components used inside the template
// // import './message.js';
// // import './reply.js';
// // import './message-history.js';
//
// Template.ConversationShow.onCreated(function() {
//
//   this.autorun(() => {
//     new SimpleSchema({
//       'conversation._id': { type: String },
//     }).validate(Template.currentData());
//   });
//
//   this.getConversationId = () => Template.currentData().conversation._id;
//
//   this.autorun(() => {
//     this.subscribe('conversation.messages', this.getConversationId());
//   });
//
// });
//
//
// Template.ConversationShow.helpers({
//   conversation(){
//     const instance = Template.instance();
//     const conversation = Meteor.conversations.findOne({
//       _id: instance.getConversationId()
//     });
//
//     return {
//       conversationReady: instance.subscriptionsReady(),
//       conversation
//     };
//   },
//   recipient() {
//     const instance = Template.instance();
//     const conversation = instance.data.conversation
//     const participant = conversation && conversation.participants(1).fetch()[0];
//     return participant;
//   }
// });
//
// Template.ConversationShow.events({
//
// });
