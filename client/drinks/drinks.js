Template.drinks.onCreated(function() {
  this.drinks = new ReactiveVar(this.data);
});

Template.drinks.helpers({
  drink: function() {
    return Template.instance().drinks.get();
  },
  myParams: function() {
    return {
      storeSlug: this.storeSlug,
      drinkSlug: this.slug
    }
  }
});

