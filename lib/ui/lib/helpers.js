import { Template } from 'meteor/templating';

Template.registerHelper("trimLastMessage", function(lastMessage){
  const length = 70;
  if(lastMessage && lastMessage.length > length){
    return lastMessage.slice(0, length) + "..."
  }
  return lastMessage ? lastMessage : 'New conversation';
});
