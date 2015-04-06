Template.store.onCreated(function() {
  this.subscribe('allStores');
});

Template.store.helpers({
  myParams: function() {
    return {
      storeSlug: this.slug
    }
  }
});