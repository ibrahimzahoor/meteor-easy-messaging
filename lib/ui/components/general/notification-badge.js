import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts'

import './notification-badge.css';
import './notification-badge.html';

Template.NotificationBadge.onCreated(function() {
  console.log("NotificationBadge.onCreated");

  this.autorun(() => {
    this.subscribe('unreadMessages');
  });
});

Template.NotificationBadge.helpers({
  unreadMessagesCount() {
    const count =  Counts.get('unread-messages-count');
    return count > 0 ? count : false;
  }
});

Template.NotificationBadge.onDestroyed(function() {
  console.log("NotificationBadge.onDestroyed");
});
