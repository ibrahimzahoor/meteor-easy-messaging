import { Template } from 'meteor/templating';
import { Counts } from 'meteor/tmeasday:publish-counts'

import './notification-badge.css';
import './notification-badge.html';

Template.NotificationBadge.onCreated(function() {
  this.autorun(() => {
    this.subscribe('unreadMessagesCount');
  });
});

Template.NotificationBadge.helpers({
  unreadMessagesCount() {
    const count =  Counts.get('unread-messages-count');
    console.log("count", count);

    return count > 0 ? count : false;
  }
});
