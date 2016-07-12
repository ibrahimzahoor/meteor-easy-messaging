import { Conversation, Participant } from 'meteor/socialize:messaging';

//addition to Schema for a Converation can be done here --  use Simple Schema Manual
Conversation.appendSchema({
  "archived": {
    type: Boolean,
    defaultValue: false
  },
  "starred": {
    type: Boolean,
    defaultValue: false
  }
});


//Add Conversation Collection helper methods here
Conversation.methods({
  isStarred() {
    return this.starred;
  },
  isArchived() {
    return this.archived;
  }
});

// Participant.methods({
//   availibilityStatus() {
//     const user = Meteor.users.findOne({_id: this.userId});
//     return user.status === 'online'? true : false;
//   }
// });
