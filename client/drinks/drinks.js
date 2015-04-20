Template.drinks.onCreated(function() {
  // this.drinks = new ReactiveVar(this.data);
  this.filters = new ReactiveVar([]);
  this.heartIcon = new ReactiveVar('ion-ios-heart-outline');
  this.currentItem = new ReactiveVar([]);
});

Template.drinks.helpers({
  drink: function() {
    // return Template.instance().drinks.get();
    return Drinks.find();
  },
  myParams: function() {
    return {
      storeSlug: this.storeSlug,
      drinkSlug: this.slug
    }
  },
  category: function() {
    return categories.sort();
  },
  currentCategories: function(name) {
    if(_.contains(Session.get('selectedCategories'), name)) {
      return 'selected';
    }
  },
  dealPrice: function() {
    if(this.deal) {
      return this.dealPrice;
    }
  },
  isDeal: function() {
    return this.deal;
  },
  favoriteIcon: function() {
    var currentUser = Meteor.user();
    var currentFavorite = Template.instance().currentItem.get();
    if(currentFavorite === this._id) {
      return Template.instance().heartIcon.get();  
    } else {
      if(_.contains(currentUser.favorites, this._id)) {
        return 'ion-ios-heart';
      } else {
        return 'ion-ios-heart-outline';
      }
    }
  }
});

Template.drinks.events({
  'click .category': function(e) {
    e.preventDefault();
    var instance = EasySearch.getComponentInstance({
      index: 'drinks',
      id: 'drink-search'
    });
    var categoryText = $(e.target).text();
    var $categoryCheckBox = $(".category-cb[value='" + categoryText + "']");

    if(_.contains(filterCategories, categoryText)) {
      filterCategories = _.without(filterCategories, categoryText);
      Session.set('selectedCategories', filterCategories);
      $categoryCheckBox.prop('checked', false);
    } else {
      filterCategories.push(categoryText);
      Session.set('selectedCategories', filterCategories);  
      $categoryCheckBox.prop('checked', true);
    }

    console.log(filterCategories);

    // If there are any filters, apply them using EasySearch,
    // otherwise, include all categories, i.e. no filters
    // Also, if filters are set, change filters tab to let the user know
    if(filterCategories.length) {
      EasySearch.changeProperty('drinks', 'filteredCategory', filterCategories);
      $('.filters .icon').removeClass('ion-ios-settings').addClass('ion-ios-settings-strong');
    } else {
      EasySearch.changeProperty('drinks', 'filteredCategory', []);
      $('.filters .icon').removeClass('ion-ios-settings-strong').addClass('ion-ios-settings');
    }

    EasySearch.changeLimit('drinks', 10);

    instance.triggerSearch();
  },
  'mouseenter .favorite': function(e) {
    Template.instance().currentItem.set(this._id);
    Template.instance().heartIcon.set('ion-ios-heart');
  },
  'mouseleave .favorite': function(e) {
    Template.instance().currentItem.set([]);
    Template.instance().heartIcon.set('ion-ios-heart-outline');
  },
  'click .price': function(e) {
    e.preventDefault();
  },
  'click .favorite': function(e) {
    e.preventDefault();
    var currentUser = Meteor.user();
    var currentFavorite = Template.instance().currentItem.get();
    console.log(currentUser.favorites);
    if(_.contains(currentUser.favorites, currentFavorite)) {
      Meteor.call('removeFavorite', currentFavorite, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    } else {
      Meteor.call('addFavorite', currentFavorite, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    } 
  }
  // 'change input#drink-search': function() {
  //   var instance = EasySearch.getComponentInstance({
  //     index: 'drinks',
  //     id: 'drink-search'
  //   });

  //   filterCategories = [];
  //   EasySearch.changeProperty('drinks', 'filteredCategory', categories);
  //   console.log(filterCategories);

  //   instance.triggerSearch();
  // }
});

