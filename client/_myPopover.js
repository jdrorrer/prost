Template._myPopover.events({
  'click .logout': function() {
    Meteor.logout();
    Router.go('/');
  }
});