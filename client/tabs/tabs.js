Template.tabs.onRendered(function() {
  $('a.filters').attr("data-ion-modal","_categoryFilters");
  if(Platform.isAndroid()) {
    $('.tabs-icon-left').removeClass('tabs-icon-left').addClass('tabs-icon-top');
  }
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

    if(typeof filterCategories !== 'undefined' && filterCategories.length > 0) {
      EasySearch.changeProperty('drinks', 'filteredCategory', filterCategories);
    } else {
      EasySearch.changeProperty('drinks', 'filteredCategory', []);  
    }

    var instance = EasySearch.getComponentInstance({
      index: 'drinks',
      id: 'drink-search'
    });

    var currentUserId = Meteor.userId();
    var favorites = _.pluck(Meteor.users.find({_id: currentUserId}, {fields: {favorites: 1} }).fetch(), 'favorites');

    // console.log(favorites[0]);

    if(typeof favorites !== 'undefined' && favorites.length > 0) {
      EasySearch.changeProperty('drinks', 'filteredFavorites', favorites[0]);
    } else {
      // Show no results, i.e. filter out every category
      EasySearch.changeProperty('drinks', 'filteredCategory', categories);
    }

    EasySearch.changeLimit('drinks', 10);

    instance.triggerSearch();
  },
  'click .specials': function(e) {
    e.preventDefault();

    EasySearch.changeProperty('drinks', 'filteredFavorites', []);
    
    if(typeof filterCategories !== 'undefined' && filterCategories.length > 0) {
      EasySearch.changeProperty('drinks', 'filteredCategory', filterCategories);
    } else {
      EasySearch.changeProperty('drinks', 'filteredCategory', []);  
    }

    var instance = EasySearch.getComponentInstance({
      index: 'drinks',
      id: 'drink-search'
    });

    var specials = _.pluck(Drinks.find({deal: true}).fetch(), '_id');

    // console.log(specials);

    if(typeof specials !== 'undefined' && specials.length > 0) {
      EasySearch.changeProperty('drinks', 'filteredSpecials', specials);
    } else {
      // Show no results, i.e. filter out every category
      EasySearch.changeProperty('drinks', 'filteredCategory', categories);
    }

    EasySearch.changeLimit('drinks', 10);

    instance.triggerSearch();
  },
  'click .all-drinks': function() {
    var instance = EasySearch.getComponentInstance({
      index: 'drinks',
      id: 'drink-search'
    });

    EasySearch.changeProperty('drinks', 'filteredFavorites', []);
    EasySearch.changeProperty('drinks', 'filteredSpecials', []);

    if(typeof filterCategories !== 'undefined' && filterCategories.length > 0) {
      EasySearch.changeProperty('drinks', 'filteredCategory', filterCategories);
    } else {
      EasySearch.changeProperty('drinks', 'filteredCategory', []);  
    }

    EasySearch.changeLimit('drinks', 10);

    instance.triggerSearch();
  }
});