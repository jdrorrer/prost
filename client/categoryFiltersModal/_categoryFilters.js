Template._categoryFilters.onRendered(function() {
  // On modal render, if there are any filterCategories, 
  // make sure their box displays as checked in the modal
  if(filterCategories.length) {
    for(var i=0; i < filterCategories.length; i++) {
      var $categoryCheckBox = $(".category-cb[value='" + filterCategories[i] + "']");
      if(_.contains(filterCategories, filterCategories[i])) {
        $categoryCheckBox.prop('checked', true);
      } else {
        $categoryCheckBox.prop('checked', false);
      }
    }
  }
});

Template._categoryFilters.helpers({
  category: function() {
    return categories.sort();
  },
  currentCategories: function() {
    return Session.get('selectedCategories').join(', ');
  },
  isCategorySelected: function(name) {
    if(Session.get('selectedCategories').length) {
      return 'selected';
    }
  }
});

Template._categoryFilters.events({
  'change .filter-select': function(e) {
    var instance = EasySearch.getComponentInstance({
      index: 'drinks',
      id: 'drink-search'
    });

    var categoryText = e.target.value;
    var $categoryCheckBox = $(".category-cb[value='" + categoryText + "']");

    // If target is checked, include in filterCategories, otherwise exclude it
    if(e.target.checked) {
      filterCategories.push(categoryText);
      Session.set('selectedCategories', filterCategories);
    } else {
      filterCategories = _.without(filterCategories, categoryText);
      Session.set('selectedCategories', filterCategories);
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
  },
  'click .clear-all': function() {
    var instance = EasySearch.getComponentInstance({
      index: 'drinks',
      id: 'drink-search'
    });

    if(filterCategories.length) {
      for(var i=0; i < filterCategories.length; i++) {
        var $categoryCheckBox = $(".category-cb[value='" + filterCategories[i] + "']");
        $categoryCheckBox.prop('checked', false);
      }
      filterCategories = [];
      Session.set('selectedCategories', filterCategories);
      EasySearch.changeProperty('drinks', 'filteredCategory', []);

      $('.filters .icon').removeClass('ion-ios-settings-strong').addClass('ion-ios-settings');

      instance.triggerSearch();
    }
  }
});