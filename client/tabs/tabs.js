Template.tabs.onRendered(function() {
  $('a.filters').attr("data-ion-modal","_categoryFilters");
});

Template.tabs.helpers({
  notiCount: function() {
    if(Session.get('selectedCategories')) {
      if(Session.get('selectedCategories').length) {
        return Session.get('selectedCategories').length;    
      }
    }
  },
  notiBubble: function() {
    if(Session.get('selectedCategories')) {
      if(Session.get('selectedCategories').length) {
        return 'noti-bubble';  
      }
    }
  }
});

Template.tabs.events({
  'click .favorites': function(e) {
    e.preventDefault();

    EasySearch.changeProperty('drinks', 'filteredSpecials', []);

    var instance = EasySearch.getComponentInstance({
      index: 'drinks',
      id: 'drink-search'
    });

    var currentUserId = Meteor.userId();
    var favorites = _.pluck(Meteor.users.find({_id: currentUserId}, {fields: {favorites: 1} }).fetch(), 'favorites');

    // console.log(favorites[0]);

    EasySearch.changeProperty('drinks', 'filteredFavorites', favorites[0]);

    EasySearch.changeLimit('drinks', 10);

    instance.triggerSearch();
  },
  'click .specials': function(e) {
    e.preventDefault();

    EasySearch.changeProperty('drinks', 'filteredFavorites', []);

    var instance = EasySearch.getComponentInstance({
      index: 'drinks',
      id: 'drink-search'
    });

    var specials = _.pluck(Drinks.find({deal: true}).fetch(), '_id');

    // console.log(specials);

    EasySearch.changeProperty('drinks', 'filteredSpecials', specials);

    EasySearch.changeLimit('drinks', 10);

    instance.triggerSearch();
  },
  'click .all-drinks': function() {
    var instance = EasySearch.getComponentInstance({
      index: 'drinks',
      id: 'drink-search'
    });

    EasySearch.changeProperty('drinks', 'filteredCategory', []);
    EasySearch.changeProperty('drinks', 'filteredFavorites', []);
    EasySearch.changeProperty('drinks', 'filteredSpecials', []);

    EasySearch.changeLimit('drinks', 10);

    instance.triggerSearch();
  }
});