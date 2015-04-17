Template.tabs.onRendered(function() {
  $('a.filters').attr("data-ion-modal","_categoryFilters");
});

Template.tabs.helpers({
  notiCount: function() {
    if(Session.get('selectedCategories').length) {
      return Session.get('selectedCategories').length;  
    }
  },
  notiBubble: function() {
    if(Session.get('selectedCategories').length) {
      return 'noti-bubble';
    }
  }
});

Template.tabs.events({
  'click .filters': function() {
    
  }
});