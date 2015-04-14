var handle = Meteor.subscribeWithPagination('allDrinks', 10);

Template.drinks.onCreated(function() {
  this.drinks = new ReactiveVar(this.data);
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
  }
});

Template.drinks.events({
  'click .load-more': function() {
    handle.loadNextPage();
  }
});

