Template.drinks.onCreated(function() {
  // this.drinks = new ReactiveVar(this.data);
  this.filters = new ReactiveVar([]);
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

    instance.triggerSearch();
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

